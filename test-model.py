from ultralytics import YOLO

# load model
model = YOLO("/opt/homebrew/runs/detect/train5/weights/best.pt")

# Export model
success = model.export(format="onnx", opset=10)
