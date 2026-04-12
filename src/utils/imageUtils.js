/**
 * Converts a File object to a raw base64 string (no data URI prefix).
 * Roboflow API expects the raw base64 body.
 */
export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      // Strip the data:image/...;base64, prefix
      const base64 = reader.result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Compresses an image if its longest dimension exceeds maxPx,
 * then returns a raw base64 string (no data URI prefix) for the Roboflow API.
 *
 * @param {File} file
 * @param {number} maxPx - max dimension on either axis (default 1280)
 * @param {number} quality - JPEG quality 0–1 (default 0.88)
 * @returns {Promise<string>} raw base64 string
 */
export function compressAndEncodeBase64(file, maxPx = 1280, quality = 0.88) {
  return new Promise((resolve) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      const scale = Math.min(1, maxPx / Math.max(img.naturalWidth, img.naturalHeight));
      if (scale >= 1) {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.readAsDataURL(file);
        return;
      }
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(img.naturalWidth * scale);
      canvas.height = Math.round(img.naturalHeight * scale);
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', quality);
      resolve(dataUrl.split(',')[1]);
    };
    img.src = objectUrl;
  });
}

/**
 * Returns the natural dimensions of an image file.
 */
export function getImageDimensions(file) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
      URL.revokeObjectURL(img.src);
    };
    img.src = URL.createObjectURL(file);
  });
}
