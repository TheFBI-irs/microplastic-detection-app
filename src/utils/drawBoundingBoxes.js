/**
 * Draws bounding boxes on a canvas element over the displayed image.
 * Predictions use normalized center coordinates (0–1).
 *
 * @param {HTMLCanvasElement} canvas - The canvas element to draw on
 * @param {Array} predictions - Array of {x, y, width, height, confidence} (all normalized 0–1)
 * @param {number} displayWidth - The CSS display width of the image
 * @param {number} displayHeight - The CSS display height of the image
 */
export function drawBoundingBoxes(canvas, predictions, displayWidth, displayHeight) {
  const ctx = canvas.getContext('2d');

  // Set canvas resolution to match display size (for crisp drawing)
  canvas.width = displayWidth;
  canvas.height = displayHeight;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const boxColor = '#10b981'; // emerald-500
  const labelBg = '#10b981';
  const labelText = '#ffffff';

  predictions.forEach((pred) => {
    // Convert normalized center coords to top-left pixel coords
    const x = (pred.x - pred.width / 2) * displayWidth;
    const y = (pred.y - pred.height / 2) * displayHeight;
    const w = pred.width * displayWidth;
    const h = pred.height * displayHeight;

    // Draw bounding box
    ctx.strokeStyle = boxColor;
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, w, h);

    // Draw confidence label
    const label = `${Math.round(pred.confidence * 100)}%`;
    ctx.font = '600 11px Inter, system-ui, sans-serif';
    const textMetrics = ctx.measureText(label);
    const labelW = textMetrics.width + 8;
    const labelH = 18;

    // Position label above the box (or inside top if near edge)
    const labelY = y > labelH + 2 ? y - labelH - 2 : y + 2;

    ctx.fillStyle = labelBg;
    ctx.beginPath();
    ctx.roundRect(x, labelY, labelW, labelH, 4);
    ctx.fill();

    ctx.fillStyle = labelText;
    ctx.textBaseline = 'middle';
    ctx.fillText(label, x + 4, labelY + labelH / 2);
  });
}
