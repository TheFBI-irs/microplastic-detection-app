# Quick Guide: Adding Your YOLOv11 Model

## Quick Steps

### 1. Convert Your Model

**If you have a PyTorch YOLOv11 model (.pt):**
```python
from ultralytics import YOLO
model = YOLO('your_model.pt')
model.export(format='onnx')  # Creates your_model.onnx
```

Then convert ONNX to TensorFlow.js:
```bash
pip install tensorflowjs onnx-tf

# Convert ONNX → SavedModel → TensorFlow.js
onnx-tf convert -i your_model.onnx -o saved_model
tensorflowjs_converter --input_format=tf_saved_model \
  --output_format=tfjs_graph_model \
  --quantize_float16 \
  saved_model \
  public/models/yolov11
```

### 2. Place Files

Put the converted model files in:
```
public/models/yolov11/
  ├── model.json
  └── group1-shard*.bin (weight files)
```

### 3. Update Code

Open `src/utils/modelInference.js` and:

1. **Find the `loadModel()` function** (around line 30)
2. **Replace the placeholder code** with:
   ```javascript
   const basePath = import.meta.env.BASE_URL || '/microplastic-detection-app/'
   const modelPath = `${basePath}models/yolov11/model.json`
   model = await tf.loadGraphModel(modelPath)
   ```

3. **Update `postprocessOutput()` function** to match your model's output format
   - Check your model's output shape in browser console
   - Adjust the parsing logic accordingly

4. **Remove the placeholder/simulation code** in `detectMicroplastics()`

### 4. Test

```bash
npm run dev
```

Upload an image and check the browser console for:
- Model loading messages
- Output shape information
- Any errors

### 5. Deploy

```bash
git add public/models/yolov11/
git commit -m "Add YOLOv11 model"
git push
```

## Need Help?

- See `MODEL_SETUP.md` for detailed instructions
- Check browser console for error messages
- Verify model file paths are correct
- Ensure all shard files are included

## Common Issues

**Model not found (404):**
- Check file path matches exactly
- Verify files are in `public/models/yolov11/`
- Check base path for GitHub Pages deployment

**Wrong output format:**
- Log the output shape: `console.log(output.shape)`
- Adjust postprocessing to match your model's format

**Model too large:**
- Use quantization: `--quantize_float16`
- Consider using a smaller model variant
- Host model on CDN if needed

