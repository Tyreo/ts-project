[TOC]

# Canvas 是什么？

一个 HTML 元素，可以通过脚本（JS）来绘制图形。一般用来合成图片，处理动画。

# 使用前应该明白的概念

## 画布大小

canvas 绘制是以画布大小为准，默认为 300X150。指定画布的大小只能通过属性的方式进行。

</canvas> 不可省略

方式 1：

```html
<canvas id="myCanvas" width="450" height="450"></canvas>
```

方式 2：

```js
const ele = document.getElementId('myCanvas');
ele.width = '450'; // 无px
ele.height = '450'; // 无px
```

## 显示大小

CSS 样式，控制画布的显示区域，画布在样式的控制下会进行缩放处理，如果样式的宽高和画布的宽高不是等比设置，将出现画布显示变形的问题。

## 尺寸单位换算

canvas 内部单位都是逻辑像素（px），所以 JS 设置 canvas 画布大小，指定坐标，指定画笔粗细等都不需要且不能带单位。不管什么类型的尺寸在使用 canvas 的时候都必须转化成 px。

```js
// H5
export function rpxtopx(rpx) {
  return rpx * (screen.width / 750);
}

// 小程序
export function rpxtopx(rpx) {
  return rpx * (sysInfo.windowWidth / 750);
}
```

## 为什么会模糊

### 什么是像素

像素，是图像显示的基本单位，译自英文“pixel” （picture ｜ element），像素就是计算机能够显示一种特定颜色的最小区域，当设备尺寸相同但像素变得更密集时，屏幕能显示的画面的过渡更细致，网站看起来更明快。

### 设备像素和 CSS 像素？

1. 设备像素(device independent pixels): 设备屏幕的物理像素，任何设备的物理像素的数量都是固定的。
2. CSS 像素(CSS pixels): 又称为逻辑像素，是为 web 开发者创造的，在 CSS 和 javascript 中使用的一个抽象的层。

### 设备像素比

设备像素比 DPR(devicePixelRatio)是默认缩放为 100%的情况下，设备像素和 CSS 像素的比值

1px 逻辑像素所占用的 物理像素值

```js
// H5
const dpi = window.devicePixelRatio;

// 小程序
const dpi = wx.getSystemInfoSync().pixelRatio;
```

### 布局视口/理想视口

css 布局是根据布局视口来计算的，理想视口即为理想的布局视口。

我们在移动端开发的时候进场会看到下面标签，将布局视口设置为理想视口

```html
<meta name="viewport" content="width:device-width" />
```

在 iphone5 下 device-width=320，iphone6 下是 375，iphone6+下是 414

### 设备视口分辨率

```js
// H5
screen.width * dpi * (screen.height * dpi);

// 小程序
const sysInfo = wx.getSystemInfoSync()(sysInfo.screenHeight * dpi) * (sysInfo.screenWidth * dpi);
```

### 原因分析

正常情况下我们换算出来的 是 理想视口下的 逻辑像素，一般都会小于物理像素。

计算出来的逻辑像素如果小于物理像素那么就相当于把小图放大查看就会失真。（可以对比 UI 设计上的 1 倍图，2 倍图的概念）。

还有一种图片发虚，设备本身的物理像素密度不够，看什么都有点模糊，图片再大也不行。（对比我们的显示器就可以发现问题）

| 设备   | 设计稿尺寸 | 逻辑尺寸 | 实际尺寸(物理像素) | Dpi |
| ------ | ---------- | -------- | ------------------ | --- |
| iPhone | 750rpx     | 375px    | 750px              | 2   |

# 使用 Canvas

## 获取上下文

```js
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
```

## 设计稿尺寸 TO 画布尺寸

通过上面分析我们知道，设计稿的尺寸是不能直接拿来使用的，需要先换算成 px 。

为了解决图像模糊问题，我们需要将画布放大 dpi 倍，这样一来我们的画图尺寸也需要方法 dpi 倍数

下面是我们具体实现：

```js
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const dpr = window.devicePixelRatio;
canvas.width = width * (screen.width / 750) * dpr; // 设置画布的宽度 (width设计稿宽度)
canvas.height = height * (screen.width / 750) * dpr; // 设置画布的高度 (height 设计稿高度)
const scale = 1 * (screen.width / 750) * dpr;
ctx.scale(scale, scale); // 进行缩放处理
```

## 画布坐标介绍

canvas 元素默认被网格所覆盖。通常来说网格中的一个单元相当于 canvas 元素中的一像素。栅格的起点为左上角（坐标为（0,0））。所有元素的位置都相对于原点定位。

![img](https://mdn.mozillademos.org/files/224/Canvas_default_grid.png)

## 画图的一些基本概念

设置画笔

绘制路径

填充区域

路径描边

设置字体样式

字体描边

绘制字体

绘制图片

裁剪图片

移动画笔

移动画布相对坐标

保存状态

恢复状态

## 绘制直线

![img](./images/canvas/=Canvas-grid.png)

宽度是 1.0 的线条，实际填充区域（深蓝色部分）仅仅延伸至路径两旁各一半像素。而这半个像素又会以近似的方式进行渲染（像素最小绘制单位），这意味着那些像素只是部分着色，结果就是以实际笔触颜色一半色调的颜色来填充整个区域（浅蓝和深蓝的部分）。这就是上例中为何宽度为 1.0 的线并不准确的原因。

## 绘制弧度

```js
// 圆心坐标、半径、弧度起点、弧度终点，anticlockwise （false）顺｜（true）逆时针绘制
ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);

// 通过辅助切线画圆弧
ctx.arcTo(cpl.x, cpl.y, end.x, end.y, radius);

// 二次贝塞尔曲线
ctx.quadraticCurveTo(cpl.x, cpl.y, end.x, end.y);

// 三次贝塞尔曲线
ctx.bezierCurveTo(cpl1.x, cpl1.y, cpl2.x, cpl2.y, end.x, end.y);
```

## 绘制圆角矩形

```js
// 设置辅助线样式
public rectangle({ pathType = 'stroke', method = 'arcTo', ...props }: RectangleProps) {
  this.beginPath();
  if (method === 'arc') {
    this.rectangleArc(props);
  } else if (method === 'arcTo') {
    this.rectangleArcTo(props);
  } else if (method === 'quadraticCurveTo') {
    this.rectangleQuadraticCurveTo(props);
  }
  this.endPath(pathType);
}
```

## 绘制文字

```js
draw.setFont({
  font: 'italic small-caps 600 50px 楷体',
  textAlign: 'left',
  textBaseline: 'top',
  direction: 'rtl'
});

draw.text({
  x: 100,
  y: 100,
  text: '测试文本测试文本',
  fill: true,
  maxWidth: 400
});
```

## 绘制图片

canvas 可以将 **[`HTMLImageElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLImageElement)**、**[`HTMLVideoElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLVideoElement)**、**[`HTMLCanvasElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement)**、**[`ImageBitmap`](https://developer.mozilla.org/zh-CN/docs/Web/API/ImageBitmap)**、一般我们使用最多的就是 HTMLImageElement 和 HTMLCanvasElement。下面我们以 HTMLImageElement 为例进行画图。

```js
import testImg from './images/image001.png';

// 在指定的位置将图片画上 drawImage(image, x, y)
draw.ctx?.drawImage(img, 100, 100);
// 在指定的位置指定的区域把图片画上，图片会缩放 drawImage(image, x, y, width, height)
draw.ctx?.drawImage(img, 100, 100, 200, (200 * img.height) / img.width);
// 截取图片指定的区域，画到画布的指定位置的指定区域。drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
draw.ctx?.drawImage(img, 60, 30, 300, 300, 100, 100, 200, 200);
```

一般情况下，我们需要将图片画到指定的区域，图片需要等比缩放。如果图片的图片的宽高比和目标区域宽高比，不一致，需要做一些截取。

## 像素操作

### ImageData 对象

[`ImageData`](https://developer.mozilla.org/zh-CN/docs/Web/API/ImageData)对象中存储着 canvas 对象真实的像素数据，它包含以下几个只读属性：

**`width`**、**height**、**data**

data 属性返回一个 [`Uint8ClampedArray`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Uint8ClampedArray)，它可以被使用作为查看初始像素数据。每个像素用 4 个 1bytes 值(按照红，绿，蓝和透明值的顺序; 这就是"RGBA"格式) 来代表。每个颜色值部份用 0 至 255 来代表。每个部份被分配到一个在数组内连续的索引，左上角像素的红色部份在数组的索引 0 位置。像素从左到右被处理，然后往下，遍历整个数组。

[`Uint8ClampedArray`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Uint8ClampedArray) 包含高度 × 宽度 × 4 bytes 数据，索引值从 0 到(`高度`× 宽度 ×4)-1

根据行、列读取某像素点的 R/G/B/A 值的公式：

```js
imageData.data[50 * (imageData.width * 4) + 200 * 4 + 0 / 1 / 2 / 3];
```

### 创建一个 ImageData 对象

```js
var myImageData = ctx.createImageData(width, height);

var myImageData = ctx.createImageData(anotherImageData);

// 任何在画布以外的元素都会被返回成一个透明黑的ImageData对像。
var myImageData = ctx.getImageData(left, top, width, height);
```

### 操作像素

```js
ctx.drawImage(img, 0, 0);
const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
const data = imageData.data;
for (var i = 0; i < data.length; i += 4) {
  data[i] = 255 - data[i]; // red
  data[i + 1] = 255 - data[i + 1]; // green
  data[i + 2] = 255 - data[i + 2]; // blue
}
ctx.putImageData(imageData, 0, 0);
```

### 图片区域放大

```js
// 将需要放大的区域画到更大的画布上
ctx.drawImage(canvas, Math.abs(x - 5), Math.abs(y - 5), 10, 10, 0, 0, 200, 200);
```

## 变形与叠加

```js
// 移动原点
translate(x, y)
// 相对原点旋转画布
rotate(angle)
// 画布初始情况下， 是以左上角坐标为原点的第一象限。如果参数为负实数， 相当于以x 或 y轴作为对称轴镜像反转
scale(x, y)
// a 水平方向的缩放
// d 竖直方向的缩放
// b 竖直方向的倾斜偏移
// c 水平方向的倾斜偏移
// e 水平方向的移动
// f 竖直方向的移动
transform(a, b, c, d, e, f)
setTransform(a, b, c, d, e, f)
resetTransform() // ctx.setTransform(1, 0, 0, 1, 0, 0)

globalCompositeOperation // 叠加方式
CanvasGradient // 过度
// 当我们用到 fill（或者 clip和isPointinPath ）你可以选择一个填充规则，该填充规则根据某处在路径的外面或者里面来决定该处是否被填充
ctx.fill("evenodd" | "nonzero");
```

## 绘制动画

### 月地环绕

```js
import Canvas_earth from './images/Canvas_earth.png';
import Canvas_moon from './images/Canvas_moon.png';
import Canvas_sun from './images/Canvas_sun.png';

const sun = await draw.generateImage(Canvas_sun);
const moon = await draw.generateImage(Canvas_moon);
const earth = await draw.generateImage(Canvas_earth);

if (sun && moon && earth) {
  const animation = () => {
    // 清空画布
    draw.clearRect({
      x: 0,
      y: 0,
      width: 686,
      height: 686
    });

    // 设置画笔
    draw.setBrush({
      globalCompositeOperation: 'destination-over',
      fillStyle: 'rgba(0,0,0,0.4)',
      strokeStyle: 'rgba(0,153,255,0.4)'
    });

    // 保存画布状态
    draw.save();

    // 移动画布原点到画布中心
    draw.ctx?.translate(343, 343);

    draw.save();
    // 画地球
    let time = new Date();
    // 以画布中心为圆心进行旋转
    draw.ctx?.rotate(
      ((2 * Math.PI) / 60) * time.getSeconds() + ((2 * Math.PI) / 60000) * time.getMilliseconds()
    );
    // 移动原点到地球
    draw.ctx?.translate(200, 0);
    draw.ctx?.fillRect(0, -20, 100, 40); // Shadow
    draw.image({
      x: -20,
      y: -20,
      width: 40,
      height: 40,
      image: earth
    });

    // 画月球
    draw.save();
    // 以地球中心为中心旋转
    draw.ctx?.rotate(
      ((2 * Math.PI) / 6) * time.getSeconds() + ((2 * Math.PI) / 6000) * time.getMilliseconds()
    );
    // 移动原点到月球中心
    draw.ctx?.translate(0, 60);
    draw.image({
      x: -10,
      y: -10,
      width: 20,
      height: 20,
      image: moon
    });

    // 恢复旋转状态、和原点到地球
    draw.restore();

    // 恢复旋转状态、和原点到画布中心
    draw.restore();

    // 在画布中心画圆
    draw.beginPath();
    draw.roundArc({
      x: 0,
      y: 0,
      radius: 200
    });
    draw.endPath('stroke');

    // 画布中心画太阳
    draw.image({
      x: -200,
      y: -200,
      width: 400,
      height: 400,
      image: sun
    });

    // 恢复画布到最初状态
    draw.restore();

    window.requestAnimationFrame(animation);
  };
  window.requestAnimationFrame(animation);
}
```

## 绘制游戏

### 俄罗斯方块

```typescript
import Draw from '@/utils/draw';

const FILL_TYPE = {
  none: 0, // 空白
  brick: 1, // 转头可消除
  stone: 2 // 石头不可消除
};

const FILL_COLOR = {
  [FILL_TYPE.brick]: 'blue',
  [FILL_TYPE.stone]: 'gray'
};

/**
 * 生成随机数 [n，m)
 */
function getRandomNum(n: number, m: number) {
  return Math.floor(Math.random() * (m - n) + n);
}

function generateBg({ row = 0, column = 0, stoneNum = 0, brickNum = 0 }) {
  // 增加游戏难度底部铺石头
  const stone = Math.ceil(Math.random() * stoneNum);
  let data: Array<Array<number>> = [];
  for (let i = 0; i < row; i++) {
    data.push([]);
    data[i].length = column;
    // 增加游戏难度底部铺石头
    if (i >= row - stone) {
      data[i].fill(FILL_TYPE.stone);
    } else {
      data[i].fill(FILL_TYPE.none);
    }
  }
  for (let index = 0; index < brickNum; index++) {
    const i = getRandomNum(10, row - stone);
    const j = getRandomNum(0, column);
    console.log(i, j);
    data[i][j] = FILL_TYPE.brick;
  }
  return data;
}

function forEachList(
  list: Array<Array<number>>,
  callback: (arg0: number, arg1: number, arg2: number) => void
) {
  list.forEach((item, i) => {
    item.forEach((v, j) => {
      callback(i, j, v);
    });
  });
}

function someList(
  list: Array<Array<number>>,
  callback: (arg0: number, arg1: number, arg2: number) => boolean
) {
  return list.some((item, i) => {
    return item.some((v, j) => {
      return callback(i, j, v);
    });
  });
}

interface TetrisProps {
  row: number;
  column: number;
  speed: number;
  draw: Draw;
  stoneNum: number;
  brickNum: number;
  onScore: Function;
}

type Shape = Array<Array<number>>;

interface Position {
  row: number;
  column: number;
}
const shape1 = [[[1, 1, 1, 1]], [[1], [1], [1], [1]]];

const shape2 = [
  [
    [0, 1, 0],
    [1, 1, 1]
  ],
  [
    [1, 0],
    [1, 1],
    [1, 0]
  ],
  [
    [1, 1, 1],
    [0, 1, 0]
  ],
  [
    [0, 1],
    [1, 1],
    [0, 1]
  ]
];

const shape3 = [
  [
    [1, 1],
    [1, 1]
  ]
];

const shape4 = [
  [
    [0, 1, 0],
    [1, 1, 1],
    [0, 1, 0]
  ]
];

const shape5 = [
  [
    [1, 1],
    [0, 1],
    [0, 1]
  ],
  [
    [0, 0, 1],
    [1, 1, 1]
  ],
  [
    [1, 0],
    [1, 0],
    [1, 1]
  ],
  [
    [1, 1, 1],
    [1, 0, 0]
  ]
];

const shape6 = [
  [
    [1, 1, 0],
    [0, 1, 1]
  ],
  [
    [0, 1],
    [1, 1],
    [1, 0]
  ]
];

const shape7 = [
  [
    [0, 1, 1],
    [1, 1, 0]
  ],
  [
    [1, 0],
    [1, 1],
    [0, 1]
  ]
];

const shape8 = [
  [
    [1, 1, 1],
    [0, 1, 0],
    [0, 1, 0]
  ],
  [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 1]
  ],
  [
    [0, 1, 0],
    [0, 1, 0],
    [1, 1, 1]
  ],
  [
    [1, 0, 0],
    [1, 1, 1],
    [1, 0, 0]
  ]
];

const shape9 = [
  [
    [1, 1],
    [1, 0],
    [1, 0]
  ],
  [
    [1, 1, 1],
    [0, 0, 1]
  ],
  [
    [0, 1],
    [0, 1],
    [1, 1]
  ],
  [
    [1, 0, 0],
    [1, 1, 1]
  ]
];

const shape10 = [
  [
    [1, 1],
    [1, 0]
  ],
  [
    [1, 1],
    [0, 1]
  ],
  [
    [0, 1],
    [1, 1]
  ],
  [
    [1, 0],
    [1, 1]
  ]
];

const All_SHAPES = [
  shape1,
  shape2,
  shape3,
  shape4,
  shape5,
  shape6,
  shape7,
  shape8,
  shape9,
  shape10
];

export default class Tetris {
  public bg: Array<Array<number>> = [];
  public draw: Draw;
  public blockWidth: number;
  public lineWidth: number;
  private row: number;
  private column: number;
  private speed = 1000;
  private step = 1;
  private renderTimer?: NodeJS.Timer;
  private donwTimer?: NodeJS.Timer;
  private collision = false;
  private needClearShape = false;
  private shapeList: Array<Shape> = [];
  private currentShapeIndex = 0;
  private oldShape?: Shape;
  // 活动的形状
  private shape: Shape = [[]];
  // 形状位置
  private position: Position = {
    row: 0,
    column: 0
  };
  // 形状移动的位置
  private moveInfo: Position = {
    row: 0,
    column: 0
  };
  private stoneNum = 5;
  private brickNum = 5;
  private onScore: Function;

  public constructor({
    row = 40,
    column = 20,
    draw,
    speed = 100,
    stoneNum,
    brickNum,
    onScore
  }: TetrisProps) {
    this.row = row;
    this.column = column;
    this.speed = speed;
    this.draw = draw;
    this.blockWidth = Math.floor(686 / column);
    this.lineWidth = 4;
    this.stoneNum = stoneNum;
    this.brickNum = brickNum;
    this.onScore = onScore;
    draw.setBrush({
      fillStyle: FILL_COLOR[FILL_TYPE.brick],
      strokeStyle: '#343455',
      lineWidth: this.lineWidth
    });
    this.initGame();
  }

  public initGame() {
    const { row, column, stoneNum, brickNum } = this;
    this.bg = generateBg({ row, column, stoneNum, brickNum });
    this.renderBg();
    this.initShapeInfo();
  }

  public start() {
    if (this.renderTimer) {
      return;
    }
    this.renderTimer = setInterval(() => {
      this.renderShape();
    }, 100);
    const { speed } = this;
    this.donwTimer = setInterval(() => {
      this.moveDown();
    }, speed);
  }

  public stopTimer() {
    console.log('停止');
    if (this.renderTimer) {
      clearInterval(this.renderTimer);
      this.renderTimer = undefined;
    }
    if (this.donwTimer) {
      clearInterval(this.donwTimer);
      this.donwTimer = undefined;
    }
  }

  public gameOver() {
    this.stopTimer();
    const { draw } = this;
    draw.save();
    draw.setFont({
      font: 'italic small-caps 600 100px 楷体',
      textAlign: 'left',
      textBaseline: 'top',
      direction: 'rtl'
    });
    const x = 120;
    const text = 'Game Over';
    const w = draw.ctx?.measureText(text)?.width || 0;
    draw.setBrush({
      lineWidth: 10,
      fillStyle: draw.generateGradient({
        linear: {
          point1: {
            x,
            y: 0
          },
          point2: {
            x: x + Math.floor(w),
            y: 0
          }
        },
        colorStopList: [
          {
            position: 0,
            color: 'red'
          },
          {
            position: 0.5,
            color: 'yellow'
          },
          {
            position: 1,
            color: 'blue'
          }
        ]
      })
    });
    draw.text({
      text,
      x,
      y: 400,
      fill: true
    });
    draw.restore();
  }

  public reset() {
    this.stopTimer();
    this.initGame();
  }

  public pause() {
    this.stopTimer();
  }

  public moveLeft() {
    const moveInfo = {
      row: this.moveInfo.row,
      column: this.moveInfo.column - this.step
    };
    if (this.checkPosition(moveInfo)) {
      console.log('向左移动');
      this.moveInfo = moveInfo;
    }
  }

  public moveRight() {
    const moveInfo = {
      row: this.moveInfo.row,
      column: this.moveInfo.column + this.step
    };
    if (this.checkPosition(moveInfo)) {
      console.log('向右移动');
      this.moveInfo = moveInfo;
    }
  }

  public moveDown() {
    if (this.checkGameOver()) {
      this.gameOver();
      return;
    }
    const newMoveInfo = {
      row: this.moveInfo.row + this.step,
      column: this.moveInfo.column
    };
    if (this.checkPosition(newMoveInfo)) {
      console.log('快速下落');
      this.moveInfo = newMoveInfo;
    } else {
      this.collision = true;
    }
  }

  public rotate() {
    // 如果已经碰撞，不能变形
    if (this.collision) {
      return;
    }
    const { shapeList, currentShapeIndex } = this;
    const len = shapeList.length;
    let index = currentShapeIndex + 1;
    if (index === len) {
      index = 0;
    }
    const shape = this.shapeList[index];
    if (this.checkPosition(this.moveInfo, shape)) {
      console.log('变变变');
      this.oldShape = this.shape;
      this.shape = shape;
      this.currentShapeIndex = index;
    }
  }

  public renderBg() {
    const { bg, draw, blockWidth, lineWidth } = this;
    // 清除画布
    draw.clearRect({
      x: 0,
      y: 0,
      width: 750,
      height: 900
    });
    // 重新绘制背景
    forEachList(bg, (i, j, v) => {
      draw.rectangle({
        x: 32 + j * blockWidth,
        y: 32 + i * blockWidth,
        width: blockWidth,
        height: blockWidth,
        pathType: 'stroke'
      });
      if (v) {
        draw.save();
        if (v === FILL_TYPE.stone) {
          draw.setBrush({
            fillStyle: FILL_COLOR[FILL_TYPE.stone]
          });
        }
        draw.rectangle({
          x: 32 + j * blockWidth + lineWidth / 2,
          y: 32 + i * blockWidth + lineWidth / 2,
          width: blockWidth - lineWidth,
          height: blockWidth - lineWidth,
          pathType: 'fill'
        });
        draw.restore();
      }
    });
  }

  public renderShape() {
    const {
      shape,
      position,
      moveInfo,
      draw,
      blockWidth,
      lineWidth,
      collision,
      bg,
      needClearShape,
      oldShape
    } = this;
    // 清除之前位置上的填充块, needClearShape 表示画布是干净的不需要清除及每次出现的新图行
    if (needClearShape) {
      forEachList(oldShape ? oldShape : shape, (i, j, v) => {
        if (v === FILL_TYPE.brick && bg[position.row + i]) {
          draw.clearRect({
            x: 32 + (position.column + j) * blockWidth + lineWidth / 2,
            y: 32 + (position.row + i) * blockWidth + lineWidth / 2,
            width: blockWidth - lineWidth,
            height: blockWidth - lineWidth
          });
        }
      });
      this.oldShape = undefined;
    }
    this.needClearShape = true;
    position.row += moveInfo.row;
    position.column += moveInfo.column;
    moveInfo.row = 0;
    moveInfo.column = 0;
    // 画出最新的填充块
    forEachList(shape, (i, j, v) => {
      if (v && bg[position.row + i]) {
        // 碰撞，将点记录到画布
        if (collision) {
          bg[position.row + i][position.column + j] = FILL_TYPE.brick;
        }
        draw.rectangle({
          x: 32 + (position.column + j) * blockWidth + lineWidth / 2,
          y: 32 + (position.row + i) * blockWidth + lineWidth / 2,
          width: blockWidth - lineWidth,
          height: blockWidth - lineWidth,
          pathType: 'fill'
        });
      }
    });
    if (collision) {
      // 消行判断
      this.dissolveLine();
      this.initShapeInfo();
    }
  }

  // 初始化一个形状出来
  private initShapeInfo() {
    this.generateRandomShape();
    const { column, shape } = this;
    this.position = {
      row: -shape.length + 1,
      column: Math.ceil((column - shape[0].length) / 2)
    };
    this.moveInfo = {
      row: 0,
      column: 0
    };
    this.collision = false;
    this.needClearShape = false;
  }

  private dissolveLine() {
    const { bg, onScore, column } = this;
    let lines: Array<number> = [];
    bg.forEach((item, i) => {
      if (item.every((v) => v === FILL_TYPE.brick)) {
        lines.push(i);
      }
    });
    if (!lines.length) {
      return;
    }
    // 移除当前行
    const newbg = bg.filter((_item, i) => !lines.includes(i));
    // 如果想要做一些消除行的动效，可以停止定时器，做消行动画，然后再开启定时器
    // 在头部添加新行
    newbg.unshift(
      ...generateBg({
        row: lines.length,
        column
      })
    );
    this.bg = newbg;
    // 重新绘制画布背景
    this.renderBg();
    if (lines.length) {
      onScore(100 * lines.length);
    }
  }

  private checkPosition(moveInfo: Position, shape: Shape = this.shape) {
    const { position, row: gameRow, column: gameColumn, bg } = this;
    const column = position.column + moveInfo.column; // 位置是从0 开始算
    const row = position.row + moveInfo.row; // 位置是从0 开始算
    const shapeWidth = shape[0].length;
    const shapeHeight = shape.length;

    // 底部边界
    if (row + shapeHeight > gameRow) {
      return false;
    }
    // 左右边界
    if (column < 0 || column + shapeWidth > gameColumn) {
      return false;
    }
    // 块边界
    const isCollision = someList(shape, (i, j, v) => {
      return !!(
        v !== FILL_TYPE.none &&
        bg[i + row] &&
        bg[i + row][j + column] &&
        bg[i + row][j + column] !== FILL_TYPE.none
      );
    });
    if (isCollision) {
      return false;
    }
    return true;
  }

  private checkGameOver() {
    const { bg } = this;
    return bg[0].some((v) => v);
  }
  private generateRandomShape() {
    this.shapeList = All_SHAPES[getRandomNum(0, All_SHAPES.length)];
    this.currentShapeIndex = getRandomNum(0, this.shapeList.length);
    this.shape = this.shapeList[this.currentShapeIndex];
  }
}

```



# Canvas 优化

1. 离屏幕提前渲染
2. 避免使用浮点数坐标
3. 使用多层画布
4. 使用 css 当背景，避免绘制背景大图
5. 关闭透明度 canvas.getContext('2d', { alpha: false })

# 参考文档

https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial
