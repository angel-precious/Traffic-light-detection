//const video = document.querySelector("video");
const video = document.createElement("video");
video.autoplay = true;
navigator.mediaDevices.getUserMedia({video: true})
.then(stream => {
    video.srcObject = stream;
    // 添加一个事件监听器，等待视频元数据加载完成
    video.addEventListener("loadedmetadata", () => {
        // 在这里调用play事件的监听器
        video.addEventListener("play", () => {
            const canvas = document.querySelector("canvas");
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const context = canvas.getContext("2d");
            interval = setInterval(() => {
                context.drawImage(video,0,0);
                draw_boxes(canvas, boxes);
                const input = prepare_input(canvas);
                if (!busy) {
                    worker.postMessage(input);
                    busy = true;
                }
            },30)
        });
    });
})
.catch(error => {
    console.error(error);
});


const worker = new Worker("js/worker.js");
let boxes = [];
let interval
let busy = false;
video.addEventListener("startButton", () => {
  const canvas = document.querySelector("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const context = canvas.getContext("2d");
  interval = setInterval(() => {
      context.drawImage(video,0,0);
      draw_boxes(canvas, boxes);
      // Move the prepare_input function here
      function prepare_input(img) {
        const canvas = document.createElement("canvas");
        canvas.width = 640;
        canvas.height = 640;
        const context = canvas.getContext("2d");
        context.drawImage(img, 0, 0, 640, 640);
        const data = context.getImageData(0,0,640,640).data;
        const red = [], green = [], blue = [];
        for (let index=0;index<data.length;index+=4) {
            red.push(data[index]/255);
            green.push(data[index+1]/255);
            blue.push(data[index+2]/255);
        }
        return [...red, ...green, ...blue];
      }
      const input = prepare_input(canvas); // Pass the initialized canvas instead of video
      if (!busy) {
          worker.postMessage(input);
          busy = true;
      }
  },30)
});


worker.onmessage = (event) => {
    const output = event.data;
    const canvas = document.querySelector("canvas");
    boxes =  process_output(output, canvas.width, canvas.height);
    busy = false;
};

video.addEventListener("stopButton", () => {
    clearInterval(interval);
});

const playBtn = document.getElementById("stsrtButton");
const pauseBtn = document.getElementById("stopButton");
playBtn.addEventListener("click", () => {
    video.play();
});
pauseBtn.addEventListener("click", () => {
    video.pause();
});

function prepare_input(img) {
    const canvas = document.createElement("canvas");
    canvas.width = 640;
    canvas.height = 640;
    const context = canvas.getContext("2d");
    context.drawImage(img, 0, 0, 640, 640);
    const data = context.getImageData(0,0,640,640).data;
    const red = [], green = [], blue = [];
    for (let index=0;index<data.length;index+=4) {
        red.push(data[index]/255);
        green.push(data[index+1]/255);
        blue.push(data[index+2]/255);
    }
    return [...red, ...green, ...blue];
}

function process_output(output, img_width, img_height) {
    let boxes = [];
    for (let index=0;index<8400;index++) {
        const [class_id,prob] = [...Array(yolo_classes.length).keys()]
            .map(col => [col, output[8400*(col+4)+index]])
            .reduce((accum, item) => item[1]>accum[1] ? item : accum,[0,0]);
        if (prob < 0.5) {
            continue;
        }
        const label = yolo_classes[class_id];
        const xc = output[index];
        const yc = output[8400+index];
        const w = output[2*8400+index];
        const h = output[3*8400+index];
        const x1 = (xc-w/2)/640*img_width;
        const y1 = (yc-h/2)/640*img_height;
        const x2 = (xc+w/2)/640*img_width;
        const y2 = (yc+h/2)/640*img_height;
        boxes.push([x1,y1,x2,y2,label,prob]);
    }
    boxes = boxes.sort((box1,box2) => box2[5]-box1[5])
    const result = [];
    while (boxes.length>0) {
        result.push(boxes[0]);
        boxes = boxes.filter(box => iou(boxes[0],box)<0.7 || boxes[0][4] !== box[4]);
    }
    return result;
}

function iou(box1,box2) {
    return intersection(box1,box2)/union(box1,box2);
}

function union(box1,box2) {
    const [box1_x1,box1_y1,box1_x2,box1_y2] = box1;
    const [box2_x1,box2_y1,box2_x2,box2_y2] = box2;
    const box1_area = (box1_x2-box1_x1)*(box1_y2-box1_y1)
    const box2_area = (box2_x2-box2_x1)*(box2_y2-box2_y1)
    return box1_area + box2_area - intersection(box1,box2)
}

function intersection(box1,box2) {
    const [box1_x1,box1_y1,box1_x2,box1_y2] = box1;
    const [box2_x1,box2_y1,box2_x2,box2_y2] = box2;
    const x1 = Math.max(box1_x1,box2_x1);
    const y1 = Math.max(box1_y1,box2_y1);
    const x2 = Math.min(box1_x2,box2_x2);
    const y2 = Math.min(box1_y2,box2_y2);
    return (x2-x1)*(y2-y1)
}

function draw_boxes(canvas,boxes) {
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = "#00FF00";
    ctx.lineWidth = 3;
    ctx.font = "18px serif";
    boxes.forEach(([x1,y1,x2,y2,label]) => {
        ctx.strokeRect(x1,y1,x2-x1,y2-y1);
        ctx.fillStyle = "#00ff00";
        const width = ctx.measureText(label).width;
        ctx.fillRect(x1,y1,width+10,25);
        ctx.fillStyle = "#000000";
        ctx.fillText(label, x1, y1+18);
    });
}

const yolo_classes = [
  '37', 'red', '88', '左转——绿灯', '64', '4', '3', '81', '直行——红灯', '98', '28', 
  '直行——绿灯', '56', '左转——黄灯', '26', '13', '23', '44', '61', '97', '62', '绿色', 
  '24', '12', '92', '82', '52', '59', '人行道——blank', '直行——黄灯', '66', '57', '22', 
  '38', '67', '5', '1', '右转——红灯', '45', '18', '红灯', '96', '55', '72', '47', '80', 
  'number', '77', '30', '15', '93', '90', '19', '6', '74', '8', '54', '35', '32', '20', 
  '99', '51', '31', '11', '53', '27', '39', '左转——红灯', '78', '14', '42', '89', '83', 
  '50', '63', '16', '10', '43', '48', '29', '25', '60', '21', '绿灯', '49', '左转——直行', 
  '人行道——红灯', '9', '人行道——红色', '黄灯', '58', '右转——绿灯', '人行道——绿灯', '33', '75', '7', '2', '34', 'blank'
];