/**
 * Calls the Roboflow Hosted Inference API with a base64-encoded image.
 * Returns an array of normalized prediction objects.
 */
export async function runInference(imageBase64, confidenceThreshold = 0.35) {
  const apiKey = import.meta.env.VITE_ROBOFLOW_API_KEY;
  const modelUrl = import.meta.env.VITE_ROBOFLOW_MODEL_URL;

  if (!apiKey || !modelUrl) {
    const error = new Error(
      'Roboflow API credentials are not configured. Add VITE_ROBOFLOW_API_KEY and VITE_ROBOFLOW_MODEL_URL to your .env file.'
    );
    error.name = 'ConfigurationError';
    throw error;
  }

  // Roboflow API expects confidence as 0–100 integer
  const confidenceParam = Math.round(confidenceThreshold * 100);

  const url = `${modelUrl}?api_key=${apiKey}&confidence=${confidenceParam}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: imageBase64, // raw base64 string WITHOUT the data:image/...;base64, prefix
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Roboflow API error ${response.status}: ${errorText}`);
  }

  let data;
  try {
    data = await response.json();
  } catch (err) {
    throw new Error(
      `Failed to parse Roboflow API response as JSON. The API may have returned an image or an error page instead of predictions. Response Status: ${response.status}`
    );
  }

  // Roboflow returns predictions with CENTER x,y and width/height in pixel coordinates.
  // Normalize all coordinates to 0–1 range relative to the image dimensions.
  const imgW = data.image?.width || 1;
  const imgH = data.image?.height || 1;

  return (data.predictions || []).map((pred) => ({
    x: pred.x / imgW,           // center_x normalized
    y: pred.y / imgH,           // center_y normalized
    width: pred.width / imgW,   // width normalized
    height: pred.height / imgH, // height normalized
    confidence: pred.confidence,
    class: pred.class,
  }));
}
