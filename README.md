# AI-Powered Microplastic Detection Kit

A professional web application for detecting microplastic particles in water samples using RF-DETR object detection via the Roboflow Hosted API. Designed for science fair projects and environmental research.

## Project Overview

This application allows users to:
- Upload or capture microscope images of Nile Red–stained water samples
- Run AI detection to identify and count microplastic particles
- View bounding box annotations with confidence scores
- Export results as CSV and download annotated images

## Science Fair Background

Microplastics (plastic particles &lt;5mm) contaminate waterways and are difficult to detect. This kit combines:
- **Nile Red staining** for fluorescence
- **470 nm blue LED illumination**
- **Phone microscope** for imaging
- **RF-DETR AI** for automated detection

## How the Kit Works

1. Prepare a water sample with Nile Red staining
2. Illuminate with blue LED and capture with a phone microscope
3. Upload the image to this app
4. The RF-DETR model detects and counts microplastics
5. Export data for analysis

## Model Architecture

- **Model:** RF-DETR (Resolution-adaptive Feature DETR)
- **Inference:** Roboflow Hosted API (serverless)
- **Input:** Microscope images (JPG, PNG, HEIC, WebP)
- **Output:** Bounding boxes with confidence scores

## Dataset

- Training/validation: 1,023 images
- Test set: 112 images
- Task: Object detection of Nile Red–stained microplastics
- Metrics: Precision 0.856, Recall 0.849, mAP@50 0.894

## Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file (see `.env.example`):

```
VITE_ROBOFLOW_API_KEY=your_api_key
VITE_ROBOFLOW_MODEL_ID=project/version
```

## Usage

```bash
npm run dev    # Start dev server
npm run build  # Production build
npm run preview # Preview production build
```

### Demo Mode

Click **Demo Mode** on the Scan page to load a sample image (add `public/images/demo-sample.jpg` for a custom demo).

## Deployment

The app is configured for GitHub Pages with base path `/microplastic-detection-app/`. Set `VITE_ROBOFLOW_API_KEY` and `VITE_ROBOFLOW_MODEL_ID` as repository secrets for the build workflow.

## License

Provided as-is for educational and research purposes.
