## README - Traffic Light Detection Project

[Chinese Version](README.md) | [English Version](README.en.md)

### Project Background:

With the continuous development of automobile technology, assisted driving technology has become a significant direction in the automotive industry. This technology assists drivers in better controlling the car through automation, enhancing driving safety, and reducing risks related to fatigued driving. However, even with assisted driving technology, drivers still need to always pay attention to various signals on the road, such as traffic lights.

Traffic lights are key devices for controlling traffic flow. The correct recognition and understanding of traffic light states are crucial for drivers. Unfortunately, due to human factors (such as fatigue, distraction, etc.) or environmental factors (such as lighting, weather, etc.), drivers may miss or misinterpret traffic light signals, leading to traffic accidents.

We aim to develop an assisted driving system that can automatically recognize traffic light states by utilizing the latest YOLOv8 real-time target detection technology to enhance road traffic safety.

### Project Significance:

1. Enhancing road safety
2. Reducing driver workload
3. Improving driving experience
4. Promoting technical innovation

### Project Process:

1. Obtain and annotate datasets
   ![Data label](pic/first_label.png)
   We then updated this label to:

    - Left turn —— red/green/yellow
    - Straight —— red/green/yellow
    - Right turn —— red/green/yellow
    - Red/Green/Yellow
    - Pedestrian —— red/green/blank
    - Blank

    Totaling 16 types of labels

    ![New standard label](pic/direct_label.png)

3. Train the model using YOLOv8

   Final result:
   ![Effect test](pic/final.png)

5. Deploy the model locally in the form of a web application and process video streams

### Experimental Design:

The experiment's goal is based on the existing dataset, deploy the trained model on devices such as driving recorders. It can real-time detect the color changes of traffic lights in the driving field of view and provide timely responses to drivers.

Hence the key point of this project lies in the web deployment.

### Project Files:

The project contains two main folders:

1. `web`: Contains all web display codes for project demonstration and performance demonstration
2. `based_on_yolov5`: Contains codes for full-process traffic light detection based on YOLOv5

### Reference Links:

- labelimg: https://github.com/heartexlabs/labelImg
- labelme: https://github.com/wkentaro/labelme
- Labelme2YOLO: https://github.com/rooneysh/Labelme2YOLO
- Ultralytics: https://github.com/ultralytics/ultralytics
- How to detect objects in videos in a web browser using YOLOv8 and JavaScript: https://dev.to/andreygermanov/how-to-detect-objects-in-videos-in-a-web-browser-using-yolov8-neural-network-and-javascript-lfb

### Note:

Due to time and environmental constraints, we have not implemented all functionalities, such as web remote processing, voice broadcasting, driving prediction, etc. We will implement these features in future versions.

### Dataset

Stored in the `weights` folder.
