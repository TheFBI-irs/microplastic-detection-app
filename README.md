# Microplastics Detection Web Application

A single-page web application for detecting and counting microplastic particles in Nile Red-stained water samples using YOLOv12 object detection model running entirely in the browser via TensorFlow.js.

## Features

- **Client-Side Processing**: All inference runs in the browser - no backend required
- **Real-Time Detection**: Fast inference (<2 seconds per image)
- **Mobile-First Design**: Optimized for smartphone use with camera capture
- **Offline Capable**: Works offline after initial page load
- **Privacy-Focused**: Images never leave your device
- **Interactive Results**: Bounding boxes, particle counts, and particles/mL calculations
- **Export Options**: Download results as CSV or JSON
- **History Tracking**: Local storage of analysis history
- **Comparison View**: Side-by-side comparison of multiple samples
- **Adjustable Confidence**: Slider to filter detections by confidence threshold

## Technology Stack

- **React 18** - UI framework
- **TensorFlow.js** - Model inference in the browser
- **Vite** - Build tool and dev server
- **Modern CSS** - Mobile-first responsive design

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn
- A YOLOv12 model converted to TensorFlow.js format

### Installation

1. Clone or download this repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Place your YOLOv12 model in the `public/models/` directory:
   - Model format: TensorFlow.js Layers Model (`.json` + `.bin` files)
   - Or TensorFlow.js Graph Model (SavedModel format)
   - Recommended name: `yolov12.json` or `yolov12/model.json`

4. Update the model loading path in `src/utils/modelInference.js`:
   ```javascript
   // Replace the placeholder with actual model loading:
   model = await tf.loadLayersModel('/models/yolov12.json')
   // or
   model = await tf.loadGraphModel('/models/yolov12/model.json')
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open your browser to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to:
- GitHub Pages
- Netlify
- Vercel
- Any static hosting service

## Model Conversion

### Converting YOLOv12 TFLite to TensorFlow.js

If you have a TFLite model, you'll need to convert it to TensorFlow.js format:

1. **Using TensorFlow.js Converter**:
   ```bash
   pip install tensorflowjs
   tensorflowjs_converter --input_format=tf_lite --output_format=tfjs_graph_model \
     --quantize_float16 yolov12.tflite public/models/yolov12
   ```

2. **Or convert from SavedModel/Python**:
   ```bash
   tensorflowjs_converter --input_format=tf_saved_model \
     --output_format=tfjs_graph_model \
     --quantize_float16 saved_model_path public/models/yolov12
   ```

### Model Requirements

- **Input Size**: 640x640 pixels (standard YOLOv12 input)
- **Output Format**: Bounding boxes with format `[x, y, width, height, confidence, class]`
- **Output Shape**: `[batch, num_detections, 6]`

### Updating Model Loading Code

Once you have your model converted, update `src/utils/modelInference.js`:

1. Replace the placeholder model loading code
2. Update the `postprocessOutput` function to match your model's actual output format
3. Adjust preprocessing if your model expects different normalization

Example:
```javascript
async function loadModel() {
  if (model) return model
  
  // Load your actual model
  model = await tf.loadGraphModel('/models/yolov12/model.json')
  return model
}

async function detectMicroplastics(imageDataUrl, confidenceThreshold) {
  // ... preprocessing ...
  
  // Run actual inference
  const predictions = await model.predict(preprocessed)
  const output = predictions[0] // Adjust based on your model output
  
  // Parse actual output format
  const detections = parseYOLOOutput(output, originalWidth, originalHeight, confidenceThreshold)
  
  // ... return results ...
}
```

## Usage

### Basic Workflow

1. **Upload Image**: Click the upload area or use your device camera
2. **Add Metadata** (Optional): Enter location, date, water source, and sample volume
3. **Analyze**: The app automatically runs detection when an image is uploaded
4. **Review Results**: View detected particles with bounding boxes
5. **Adjust Threshold**: Use the slider to filter detections by confidence
6. **Export**: Download annotated images or export data as CSV/JSON

### Sample Preparation

- Stain water samples with Nile Red dye
- Capture images using a microscope or smartphone camera
- Ensure good lighting and focus for best results
- Supported formats: JPEG, PNG, WebP (max 10MB)

### Calibration Mode

Enter the known sample volume (in mL) to automatically calculate particles per milliliter. This is useful for comparing samples of different volumes.

### Comparison View

Add multiple samples to the comparison view to analyze them side-by-side. Useful for:
- Comparing different locations
- Tracking changes over time
- Analyzing different water sources

## Project Structure

```
microplastic_web_app/
├── public/
│   └── models/          # Place your TensorFlow.js model here
├── src/
│   ├── components/      # React components
│   │   ├── ImageUpload.jsx
│   │   ├── ResultsDisplay.jsx
│   │   ├── HistoryPanel.jsx
│   │   ├── InstructionsPanel.jsx
│   │   ├── MetadataInput.jsx
│   │   └── ComparisonView.jsx
│   ├── utils/           # Utility functions
│   │   ├── modelInference.js  # Model loading and inference
│   │   ├── imageUtils.js      # Image processing
│   │   ├── storage.js         # Local storage management
│   │   └── export.js          # CSV/JSON export
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # React entry point
│   └── styles.css       # Application styles
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Customization

### Styling

Edit `src/styles.css` to customize:
- Color scheme (CSS variables in `:root`)
- Typography
- Spacing and layout
- Component styles

### Model Configuration

Edit `src/utils/modelInference.js` to:
- Change input image size
- Adjust preprocessing steps
- Modify postprocessing logic
- Update confidence thresholds

### Features

All components are modular and can be easily modified or extended:
- Add new metadata fields in `MetadataInput.jsx`
- Extend export formats in `export.js`
- Add new visualization options in `ResultsDisplay.jsx`

## Performance Optimization

- **Model Quantization**: Use float16 quantization when converting models
- **Image Preprocessing**: Images are automatically resized to 640x640
- **Lazy Loading**: Model loads on first use (or initialize on app load)
- **Tensor Cleanup**: Tensors are disposed after use to free memory

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

Requires WebGL support for TensorFlow.js GPU acceleration.

## Troubleshooting

### Model Not Loading
- Check that model files are in `public/models/`
- Verify model format is TensorFlow.js compatible
- Check browser console for errors
- Ensure CORS is configured if loading from different domain

### Slow Inference
- Enable WebGL backend: `await tf.setBackend('webgl')`
- Use quantized model (float16)
- Reduce input image size if model supports it

### Storage Quota Exceeded
- History is limited to 50 entries
- Clear old history entries
- Consider using IndexedDB for larger storage needs

## License

This project is provided as-is for educational and research purposes.

## Contributing

Feel free to submit issues, fork the repository, and create pull requests for any improvements.

## Acknowledgments

- Built with TensorFlow.js
- Uses YOLOv12 object detection architecture
- Designed for environmental research and education

