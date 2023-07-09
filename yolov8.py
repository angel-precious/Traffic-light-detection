from ultralytics import YOLO

# Load a model
model = YOLO("yolov8n.yaml")  # build a new model from scratch
model = YOLO("yolov8n.pt")  # load a pretrained model (recommended for training)

model.to("mps")

# Use the model
model.train(data="/Users/precious/Downloads/label-image/YOLODataset/dataset.yaml", epochs=3)  # train the model
metrics = model.val()  # evaluate model performance on the validation set
results = model("/Users/precious/Downloads/images/1 (37).jpg")  # predict on an image
path = model.export(format="onnx")  # export the model to ONNX format