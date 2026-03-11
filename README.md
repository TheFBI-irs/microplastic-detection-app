# Microplastics Detection Web Application

A single-page web application for detecting and counting microplastic particles in Nile Red-stained water samples using an RF-DETR model hosted on Roboflow.

## Features

- **AI-Powered Detection**: RF-DETR model via Roboflow Hosted Inference API
- **Real-Time Detection**: Fast cloud inference
- **Mobile-First Design**: Optimized for smartphone use with camera capture
- **Interactive Results**: Bounding boxes, particle counts, and particles/mL calculations
- **Export Options**: Download results as CSV or JSON
- **History Tracking**: Local storage of analysis history
- **Comparison View**: Side-by-side comparison of multiple samples
- **Adjustable Confidence**: Slider to filter detections by confidence threshold (recommended: 0.35)

## Technology Stack

- **React 18** - UI framework
- **Roboflow Inference API** - Cloud-hosted RF-DETR model
- **Vite** - Build tool and dev server
- **Modern CSS** - Mobile-first responsive design

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn
- Roboflow account and API key
- Roboflow model ID (format: `workspace/model-name/version`)

### Installation

1. Clone or download this repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env` and add your credentials:
   ```
   VITE_ROBOFLOW_API_KEY=your_actual_api_key_here
   VITE_ROBOFLOW_MODEL_ID=your-workspace/model-name/version_number
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to:
- GitHub Pages
- Netlify
- Vercel
- Any static hosting service

## Model

This app uses an **RF-DETR model hosted on Roboflow**. No local model files are needed.

### Setup

1. Create a Roboflow account at [roboflow.com](https://roboflow.com)
2. Get your API key from your Roboflow dashboard
3. Note your model ID (format: `workspace-name/model-name/version`)
4. Add both to your `.env` file (see `.env.example`)

### Why RF-DETR over YOLO?

RF-DETR uses transformer-based global attention, which outperforms YOLO for small-object detection in fluorescence microscopy images. In testing across 21 trained models, RF-DETR (Models 18–21) achieved 87–89% mAP@50 vs. ~82% peak for YOLOv11.

## Usage

### Basic Workflow

1. **Upload Image**: Click the upload area or use your device camera
2. **Add Metadata** (Optional): Enter location, date, water source, and sample volume
3. **Analyze**: The app automatically runs detection when an image is uploaded
4. **Review Results**: View detected particles with bounding boxes
5. **Adjust Threshold**: Use the slider to filter detections by confidence (recommended: 0.35)
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
├── src/
│   ├── components/      # React components
│   │   ├── ImageUpload.jsx
│   │   ├── ResultsDisplay.jsx
│   │   ├── HistoryPanel.jsx
│   │   ├── InstructionsPanel.jsx
│   │   ├── MetadataInput.jsx
│   │   └── ComparisonView.jsx
│   ├── utils/           # Utility functions
│   │   ├── modelInference.js  # Roboflow API inference
│   │   ├── imageUtils.js      # Image processing
│   │   ├── storage.js         # Local storage management
│   │   └── export.js          # CSV/JSON export
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # React entry point
│   └── styles.css       # Application styles
├── .env.example         # Template for environment variables
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

The default confidence threshold is 0.35 (validated for Model 21). Adjust in the UI slider or in `src/App.jsx` if changing the default.

### Features

All components are modular and can be easily modified or extended:
- Add new metadata fields in `MetadataInput.jsx`
- Extend export formats in `export.js`
- Add new visualization options in `ResultsDisplay.jsx`

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

Requires an internet connection for Roboflow API inference.

## Troubleshooting

### No Roboflow API Key
- Ensure `.env` exists with `VITE_ROBOFLOW_API_KEY` and `VITE_ROBOFLOW_MODEL_ID`
- Restart the dev server after changing `.env`
- For production builds, set these as build environment variables

### Roboflow API Errors
- Verify your API key is valid at [roboflow.com](https://roboflow.com)
- Check model ID format: `workspace/project/version`
- Ensure your Roboflow plan includes hosted inference

### Storage Quota Exceeded
- History is limited to 50 entries
- Clear old history entries
- Consider using IndexedDB for larger storage needs

## License

This project is provided as-is for educational and research purposes.

## Contributing

Feel free to submit issues, fork the repository, and create pull requests for any improvements.

## Acknowledgments

- Built with Roboflow Inference API
- Uses RF-DETR object detection architecture
- Designed for environmental research and education
