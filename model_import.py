from ultralytics import YOLO
   
model = YOLO('yolov11.pt')  # Your trained model
model.export(format='onnx')  # Export to ONNX

