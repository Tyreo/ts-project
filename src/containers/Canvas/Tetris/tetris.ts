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
