## README - 交通灯检测项目

<center>[中文版](README.md)｜[English Version](README.en.md)</center>

### 项目背景：

随着汽车技术的不断发展，辅助驾驶技术已经成为汽车行业的一个重要发展方向。这种技术通过自动化的方式，协助驾驶员更好地控制汽车，提高驾驶安全性，降低疲劳驾驶等相关风险。然而，即使有了辅助驾驶技术，驾驶人员仍然需要时刻注意道路上的各种信号，例如交通灯。

交通灯是控制交通流量的关键设备，正确识别和理解交通灯的状态对于驾驶员来说是至关重要的。遗憾的是，由于人为因素（如疲劳，分心等）或环境因素（如光线，天气等），驾驶员可能会遗漏或误解交通灯的信号，从而导致交通事故。

我们希望通过利用最新的YOLOv8实时目标检测技术，开发一个能自动识别交通灯状态的辅助驾驶系统，以提高道路交通的安全性。

### 项目意义：

1. 提高道路安全性
2. 减轻驾驶员负担
3. 提高驾驶体验
4. 推动技术创新

### 项目流程：

1. 获取并标注数据集
![数据集标签](pic/first_label.png)
随后我们将这种标签更新成为：

- 左转——红灯/绿灯/黄灯
- 直行——红灯/绿灯/黄灯
- 右转——红灯/绿灯/黄灯
- 红灯/绿灯/黄灯
- 人行道——红灯/绿灯/blank
- blank

共计16种标签

![新国标标签](pic/direct_label.png)

3. 使用YOLOv8进行模型训练

最终成果：
![效果测试](pic/final.png)

5. 在本地以Web形式部署模型并处理视频流

### 实验设计：

实验的目标是基于已有数据集，将训练好的模型部署设法在诸如行车记录仪等设备上，能够实时检测行车视野中的信号灯颜色变化，给予驾驶员及时的响应。

因此本项目关键在于web端的部署

### 项目文件：

项目包含两个主要文件夹：

1. `web`：包含所有网页展示代码，项目展示及效果演示
2. `based_on_yolov5`：包含基于YOLOv5实现全流程红绿灯检测的代码

### 参考链接：

- labelimg: https://github.com/heartexlabs/labelImg
- labelme: https://github.com/wkentaro/labelme
- Labelme2YOLO: https://github.com/rooneysh/Labelme2YOLO
- Ultralytics: https://github.com/ultralytics/ultralytics
- 如何在浏览器中使用YOLOv8和JavaScript检测视频中的对象: https://dev.to/andreygermanov/how-to-detect-objects-in-videos-in-a-web-browser-using-yolov8-neural-network-and-javascript-lfb

### 注意：

由于时间和环境的限制，我们并未实现所有的功能，例如：web远端处理、语音播报、行车预测等。我们将在未来的版本中陆续实现这些功能。

### 数据集
保存在weights文件夹中
