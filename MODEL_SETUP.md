# YOLOv11 Model Setup Guide

This guide will help you convert and integrate your YOLOv11 model into the web application.

## Step 1: Convert Your Model to TensorFlow.js Format

YOLOv11 models need to be converted from their original format (usually PyTorch `.pt` or TensorFlow SavedModel) to TensorFlow.js format.

### Option A: If you have a PyTorch YOLOv11 model (.pt file)

1. **Export to ONNX first** (if not already done):
   ```python
   from ultralytics import YOLO
   
   model = YOLO('yolov11.pt')  # Your trained model
   model.export(format='onnx')  # Export to ONNX
   ```

2. **Convert ONNX to TensorFlow.js**:
   ```bash
   # Install converter
   pip install tensorflowjs onnx-tf
   
   # Convert ONNX to TensorFlow SavedModel
   onnx-tf convert -i yolov11.onnx -o yolov11_savedmodel
   
   # Convert SavedModel to TensorFlow.js
   tensorflowjs_converter \
     --input_format=tf_saved_model \
     --output_format=tfjs_graph_model \
     --quantize_float16 \
     yolov11_savedmodel \
     public/models/yolov11
   ```

### Option B: If you have a TensorFlow SavedModel

```bash
# Install TensorFlow.js converter
pip install tensorflowjs

# Convert to TensorFlow.js format
tensorflowjs_converter \
  --input_format=tf_saved_model \
  --output_format=tfjs_graph_model \
  --quantize_float16 \
  /path/to/your/saved_model \
  public/models/yolov11
```

### Option C: If you have a TFLite model

```bash
tensorflowjs_converter \
  --input_format=tf_lite \
  --output_format=tfjs_graph_model \
  --quantize_float16 \
  yolov11.tflite \
  public/models/yolov11
```

## Step 2: Place Model Files

After conversion, you should have files like:
```
public/models/yolov11/
  ├── model.json
  ├── group1-shard1of1.bin
  ├── group1-shard2of1.bin
  └── ... (more shard files)
```

**Important:** Make sure all files are in `public/models/yolov11/` directory.

## Step 3: Update Model Loading Code

The model inference code needs to be updated to load your actual model. The code is in `src/utils/modelInference.js`.

### What You Need to Know About Your Model:

1. **Input size**: Usually 640x640 for YOLOv11
2. **Output format**: YOLOv11 typically outputs:
   - Shape: `[1, num_detections, 6]` or `[1, 8400, 6]` (for 640x640 input)
   - Format: `[x_center, y_center, width, height, confidence, class_id]` (normalized 0-1)
   - OR: `[x1, y1, x2, y2, confidence, class_id]` (absolute coordinates)

3. **Output tensor names**: Check your model's output layer names

## Step 4: Test Locally

1. Place your converted model in `public/models/yolov11/`
2. Update `src/utils/modelInference.js` (see next section)
3. Test locally:
   ```bash
   npm run dev
   ```
4. Upload a test image and verify detections work

## Step 5: Deploy

After testing locally:
```bash
git add public/models/yolov11/
git commit -m "Add YOLOv11 model"
git push
```

The model will be included in the deployment automatically.

## Troubleshooting

### Model not loading
- Check browser console for 404 errors
- Verify model.json path is correct
- Ensure all shard files are present

### Wrong output format
- Check your model's actual output shape using:
  ```javascript
  const output = model.predict(input)
  console.log(output.shape, output)
  ```
- Adjust postprocessing accordingly

### Performance issues
- Use quantized model (float16) for smaller size
- Consider using WebGL backend: `await tf.setBackend('webgl')`
- Reduce input size if model supports it

## Model Size Considerations

- Large models (>50MB) may take time to load
- Consider using model quantization
- For very large models, consider hosting on a CDN

