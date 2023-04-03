export function topx(rpx: number) {
  return rpx * (screen.width / 750);
}

type PathType = 'fill' | 'stroke' | 'closePath';

interface Point {
  x: number;
  y: number;
}

interface Round extends Point {
  r: number;
}

interface LineProps {
  pathType?: PathType;
  points: Array<Point>;
}

interface BaseRectProps extends Point {
  width: number;
  height: number;
}

interface RectangleProps extends BaseRectProps {
  leftTopRadius?: number;
  rightTopRadius?: number;
  rightBottomRadius?: number;
  leftBottomRadius?: number;
  radius?: number;
  pathType?: PathType;
  method?: 'arc' | 'arcTo' | 'quadraticCurveTo';
}

interface ImageProps extends RectangleProps {
  image?: HTMLImageElement;
}
interface RoundArcProps extends Point {
  radius: number;
  startAngle?: number;
  endAngle?: number;
  anticlockwise?: boolean;
}

interface RoundArcToProps {
  radius: number;
  cpl: Point;
  end: Point;
}

interface RoundQuadraticCurveToProps {
  cpl: Point;
  end: Point;
}

interface RoundBezierCurveToCurveToProps {
  cpl1: Point;
  cpl2: Point;
  start: Point;
  end: Point;
}

interface ColorStop {
  position: number;
  color: string;
}

interface GradientProps {
  linear?: {
    point1: Point;
    point2: Point;
  };
  radial?: {
    round1: Round;
    round2: Round;
  };
  colorStopList: Array<ColorStop>;
}

interface PatternProps {
  image: HTMLImageElement | HTMLCanvasElement;
  type: 'repeat' | 'repeat-x' | 'repeat-y' | 'no-repeat';
}

interface BrushProps {
  // 设置图形的填充颜色
  fillStyle?: string | CanvasGradient | CanvasPattern | null;
  // 设置图形轮廓的颜色
  strokeStyle?: string | CanvasGradient | CanvasPattern | null;
  // 指定透明度
  globalAlpha?: number; // 0.0-1.0
  // 这个属性设置当前绘线的粗细。属性值必须为正数。默认值是1.0。线宽是指给定路径的中心到两边的粗细。换句话说就是在路径的两边各绘制线宽的一半
  lineWidth?: number;
  // 设置线条末端样式。 butt，round 和 square。默认是 butt。
  lineCap?: 'butt' | 'round' | 'square';
  // 设定线条与线条间接合处的样式。 round, bevel 和 miter。默认是 miter
  lineJoin?: 'round' | 'bevel' | 'miter';
  // 限制当两条线相交时交接处最大长度；所谓交接处长度（斜接长度）是指线条交接处内角顶点到外角顶点的长度。
  miterLimit?: number;
  // 虚线
  lineDash?: {
    // 设置当前虚线样式。用来控制虚线的 实线与空白 的长度。如果数组是基数会被复制并重复， 如果是偶数 直接重复
    segments: Array<number>;
    // 设置虚线样式的起始偏移量。
    lineDashOffset: number;
  };
  shadow?: {
    // shadowOffsetX 和 shadowOffsetY 用来设定阴影在 X 和 Y 轴的延伸距离，它们是不受变换矩阵所影响的。负值表示阴影会往上或左延伸，正值则表示会往下或右延伸，它们默认都为 0。
    offsetX: number;
    // shadowOffsetX 和 shadowOffsetY 用来设定阴影在 X 和 Y 轴的延伸距离，它们是不受变换矩阵所影响的。负值表示阴影会往上或左延伸，正值则表示会往下或右延伸，它们默认都为 0。
    offsetY: number;
    // shadowBlur 用于设定阴影的模糊程度，其数值并不跟像素数量挂钩，也不受变换矩阵的影响，默认为 0。
    blur: number;
    // shadowColor 是标准的 CSS 颜色值，用于设定阴影颜色效果，默认是全透明的黑色。
    color: string;
  };
  globalCompositeOperation?:
    | 'source-over' // 这是默认设置，并在现有画布上下文之上绘制新图形
    | 'source-in' // 新图形只在新图形和目标画布重叠的地方绘制。其他的都是透明的
    | 'source-out' // 在不与现有画布内容重叠的地方绘制新图形。
    | 'source-atop' // 新图形只在与现有画布内容重叠的地方绘制。
    | 'destination-over' // 在现有的画布内容后面绘制新的图形。
    | 'destination-in' // 现有的画布内容保持在新图形和现有画布内容重叠的位置。其他的都是透明的。
    | 'destination-out' // 现有内容保持在新图形不重叠的地方。
    | 'destination-atop' // 现有的画布只保留与新图形重叠的部分，新的图形是在画布内容后面绘制的。
    | 'lighter' // 两个重叠图形的颜色是通过颜色值相加来确定的。
    | 'copy' // 只显示新图形。
    | 'xor' // 图像中，那些重叠和正常绘制之外的其他地方是透明的。
    | 'multiply' // 将顶层像素与底层相应像素相乘，结果是一幅更黑暗的图片。
    | 'screen' // 像素被倒转，相乘，再倒转，结果是一幅更明亮的图片。
    | 'overlay' // multiply和screen的结合，原本暗的地方更暗，原本亮的地方更亮。
    | 'darken' // 保留两个图层中最暗的像素。
    | 'lighten' // 保留两个图层中最亮的像素。
    | 'color-dodge' // 将底层除以顶层的反置。
    | 'color-burn' // 将反置的底层除以顶层，然后将结果反过来。
    | 'hard-light' // 屏幕相乘（A combination of multiply and screen）类似于叠加，但上下图层互换了
    | 'soft-light' // 用顶层减去底层或者相反来得到一个正值。
    | 'difference' // 一个柔和版本的强光（hard-light）。纯黑或纯白不会导致纯黑或纯白。
    | 'exclusion' // 和difference相似，但对比度较低。
    | 'hue' // 保留了底层的亮度（luma）和色度（chroma），同时采用了顶层的色调（hue）。
    | 'saturation' // 保留底层的亮度（luma）和色调（hue），同时采用顶层的色度（chroma）。
    | 'color' // 保留了底层的亮度（luma），同时采用了顶层的色调(hue)和色度(chroma)。
    | 'luminosity'; // 保持底层的色调（hue）和色度（chroma），同时采用顶层的亮度（luma）
}
interface FontProps {
  // 当前我们用来绘制文本的样式. 这个字符串使用和 CSS font 属性相同的语法. 默认的字体是 10px sans-serif。
  // font 属性可以用来作为 font-style, font-variant, font-weight, font-size, line-height 和 font-family 属性的简写，或将元素的字体设置为系统字体。
  font?: string;
  // 文本对齐选项. 可选的值包括：start, end, left, right or center. 默认值是 start。
  textAlign?: 'start' | 'end' | 'left' | 'right' | 'center';
  // 基线对齐选项. 可选的值包括：top, hanging, middle, alphabetic, ideographic, bottom。默认值是 alphabetic。
  textBaseline?: 'top' | 'hanging' | 'middle' | 'alphabetic' | 'ideographic' | 'bottom';
  // 文本方向。可能的值包括：ltr, rtl, inherit。默认值是 inherit。
  direction?: 'ltr' | 'rtl' | 'inherit';
}

interface TextProps extends Point {
  text: string;
  maxWidth?: number; //
  fill?: boolean; // 填充还是描边
  compressedSpace?: boolean; // 在 maxWidth 下 压缩字体空间，显示文本
}

export default class Draw {
  public ctx: CanvasRenderingContext2D | null = null;

  public constructor(canvas: HTMLCanvasElement | null) {
    if (canvas) {
      const ctx = canvas.getContext('2d');
      const dpr = window.devicePixelRatio;
      // 画布的大小
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      // 适配真实尺寸，缩放坐标
      ctx?.scale(topx(dpr), topx(dpr));
      this.ctx = ctx;
    }
    // ctx.canvas 可以对 canvas 反向引用
  }

  public realPx(px: number) {
    const dpr = window.devicePixelRatio;
    return topx(px) * dpr;
  }

  public linearGradient() {
    const { ctx } = this;
    if (!ctx) {
      return;
    }
    const radgrad = ctx.createRadialGradient(45, 45, 10, 52, 50, 30);
    return radgrad;
  }

  public generateGradient({ linear, radial, colorStopList = [] }: GradientProps) {
    const { ctx } = this;
    if (!ctx) {
      return null;
    }
    let gradient: CanvasGradient | null = null;
    if (linear) {
      const { point1, point2 } = linear;
      gradient = ctx.createLinearGradient(point1.x, point1.y, point2.x, point2.y);
    } else if (radial) {
      const { round1, round2 } = radial;
      gradient = ctx.createRadialGradient(
        round1.x,
        round1.y,
        round1.r,
        round2.x,
        round2.y,
        round2.r
      );
    }
    colorStopList.forEach(({ position, color }) => {
      gradient?.addColorStop(position, color);
    });
    return gradient;
  }

  public generatePattern({ image, type }: PatternProps) {
    const { ctx } = this;
    if (!ctx) {
      return null;
    }
    return ctx.createPattern(image, type);
  }

  // 设置画笔
  public setBrush({
    fillStyle,
    strokeStyle,
    globalAlpha,
    lineWidth,
    lineCap,
    lineJoin,
    miterLimit,
    lineDash,
    shadow,
    globalCompositeOperation
  }: BrushProps) {
    const { ctx } = this;
    if (!ctx) {
      return;
    }
    if (fillStyle) {
      ctx.fillStyle = fillStyle;
    }
    if (strokeStyle) {
      ctx.strokeStyle = strokeStyle;
    }
    if (globalAlpha) {
      ctx.globalAlpha = globalAlpha;
    }
    if (lineWidth) {
      ctx.lineWidth = lineWidth;
    }
    if (lineCap) {
      ctx.lineCap = lineCap;
    }
    if (lineJoin) {
      ctx.lineJoin = lineJoin;
    }
    if (miterLimit) {
      ctx.miterLimit = miterLimit;
    }
    if (lineDash) {
      ctx.setLineDash(lineDash.segments);
      ctx.lineDashOffset = lineDash.lineDashOffset;
    }
    if (shadow) {
      ctx.shadowOffsetX = shadow.offsetX;
      ctx.shadowOffsetY = shadow.offsetY;
      ctx.shadowBlur = shadow.blur;
      ctx.shadowColor = shadow.color;
    }
    if (globalCompositeOperation) {
      ctx.globalCompositeOperation = globalCompositeOperation;
    }
  }

  // 设置字体
  public setFont({
    font = '10px sans-serif',
    textAlign = 'start',
    textBaseline = 'alphabetic',
    direction = 'inherit'
  }: FontProps) {
    const { ctx } = this;
    if (!ctx) {
      return;
    }
    ctx.font = font;
    ctx.textAlign = textAlign;
    ctx.textBaseline = textBaseline;
    ctx.direction = direction;
  }

  // 保存画布(canvas)的所有状态
  // 当前应用的变形（即移动，旋转和缩放) translate(x, y) rotate(angle) scale(x, y)
  // 当前的裁切路径（clipping path）
  // strokeStyle, fillStyle, globalAlpha, lineWidth, lineCap, lineJoin, miterLimit,
  // lineDashOffset, shadowOffsetX, shadowOffsetY, shadowBlur, shadowColor,
  // font, textAlign, textBaseline, direction, imageSmoothingEnabled
  // globalCompositeOperation 控制涂层叠加效果
  public save() {
    this.ctx?.save();
  }

  // 恢复 canvas 状态的
  public restore() {
    this.ctx?.restore();
  }

  public beginPath() {
    this.save();
    this.ctx?.beginPath();
  }

  public endPath(pathType: PathType = 'stroke') {
    if (pathType === 'fill') {
      this.ctx?.fill();
    }
    if (pathType === 'stroke') {
      this.ctx?.stroke();
    }
    if (pathType === 'closePath') {
      this.ctx?.closePath();
      this.ctx?.stroke();
    }
    this.restore();
  }

  public clearRect({ x, y, width, height }: BaseRectProps) {
    this.ctx?.clearRect(x, y, width, height);
  }

  public rotate(angle: number) {
    this.ctx?.rotate(angle);
  }

  public translate(x: number, y: number) {
    this.ctx?.translate(x, y);
  }

  public text({
    text,
    x,
    y,
    maxWidth = (this.ctx?.canvas?.width || 0) - x,
    fill = false,
    compressedSpace = true
  }: TextProps) {
    const { ctx } = this;
    if (!ctx) {
      return;
    }
    console.log('maxWidth', maxWidth);
    let textWidth = ctx.measureText(text)?.width || 0;
    if (!maxWidth || textWidth <= maxWidth || compressedSpace) {
      if (fill) {
        ctx.fillText(text, x, y, maxWidth);
      } else {
        ctx.strokeText(text, x, y, maxWidth);
      }
      return textWidth;
    }
    const tailWidth = ctx.measureText('...')?.width || 0;
    const textList = text.split('');
    textWidth = tailWidth;
    for (let i = 0; i < textList.length; i++) {
      const w = ctx.measureText(textList[i])?.width || 0;
      if (textWidth + w > maxWidth) {
        console.log(text.substring(0, i) + '...');
        if (fill) {
          ctx.fillText(text.substring(0, i) + '...', x, y);
        } else {
          ctx.strokeText(text.substring(0, i) + '...', x, y);
        }
        break;
      }
      textWidth += w;
    }
    return textWidth;
  }

  public linePath([onePoint, ...resetPoint]: Array<Point>) {
    const { ctx } = this;
    if (!ctx || !onePoint) {
      return;
    }
    ctx.moveTo(onePoint.x, onePoint.y);
    resetPoint.forEach((point) => {
      console.log(point);
      ctx.lineTo(point.x, point.y);
    });
  }

  public line({ pathType = 'stroke', points = [] }: LineProps) {
    const { ctx } = this;
    if (!ctx) {
      return;
    }
    this.beginPath();
    this.linePath(points);
    this.endPath(pathType);
  }

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

  public rectangleArcTo({
    x,
    y,
    width,
    height,
    radius = 0,
    leftTopRadius = radius,
    rightTopRadius = radius,
    rightBottomRadius = radius,
    leftBottomRadius = radius
  }: RectangleProps) {
    const { ctx } = this;
    if (!ctx) {
      return;
    }
    const point1 = {
      x: x + leftTopRadius,
      y: y
    };
    const point2 = {
      x: x + width,
      y: y
    };
    const point3 = {
      x: x + width,
      y: y + height
    };
    const point4 = {
      x: x,
      y: y + height
    };
    const point5 = {
      x: x,
      y: y
    };
    ctx.moveTo(point1.x, point1.y);
    this.roundArcTo({
      cpl: point2,
      end: point3,
      radius: rightTopRadius
    });
    this.roundArcTo({
      cpl: point3,
      end: point4,
      radius: rightBottomRadius
    });
    this.roundArcTo({
      cpl: point4,
      end: point5,
      radius: leftBottomRadius
    });
    this.roundArcTo({
      cpl: point5,
      end: point1,
      radius: leftTopRadius
    });
    ctx.closePath();
  }

  public rectangleArc({
    x,
    y,
    width,
    height,
    radius = 0,
    leftTopRadius = radius,
    rightTopRadius = radius,
    rightBottomRadius = radius,
    leftBottomRadius = radius
  }: RectangleProps) {
    const { ctx } = this;
    if (!ctx) {
      return;
    }
    const point1 = {
      x: x + leftTopRadius,
      y: y + leftTopRadius,
      radius: leftTopRadius,
      startAngle: Math.PI,
      endAngle: (Math.PI * 3) / 2
    };
    const point2 = {
      x: x + width - rightTopRadius,
      y: y + rightTopRadius,
      radius: rightTopRadius,
      startAngle: (Math.PI * 3) / 2,
      endAngle: Math.PI * 2
    };
    const point3 = {
      x: x + width - rightBottomRadius,
      y: y + height - rightBottomRadius,
      radius: rightBottomRadius,
      startAngle: 0,
      endAngle: Math.PI / 2
    };
    const point4 = {
      x: x + leftBottomRadius,
      y: y + height - leftBottomRadius,
      radius: leftBottomRadius,
      startAngle: Math.PI / 2,
      endAngle: Math.PI
    };
    this.roundArc(point1);
    this.roundArc(point2);
    this.roundArc(point3);
    this.roundArc(point4);
    ctx.closePath();
  }

  public rectangleQuadraticCurveTo({
    x,
    y,
    width,
    height,
    radius = 0,
    leftTopRadius = radius,
    rightTopRadius = radius,
    rightBottomRadius = radius,
    leftBottomRadius = radius
  }: RectangleProps) {
    const { ctx } = this;
    if (!ctx) {
      return;
    }
    const angle1 = {
      cpl: { x, y },
      start: {
        x,
        y: y + leftTopRadius
      },
      end: {
        x: x + leftTopRadius,
        y: y
      }
    };

    const angle2 = {
      cpl: { x: x + width, y },
      start: {
        x: x + width - rightTopRadius,
        y
      },
      end: {
        x: x + width,
        y: y + rightTopRadius
      }
    };
    const angle3 = {
      cpl: {
        x: x + width,
        y: y + height
      },
      start: {
        x: x + width,
        y: y + height - rightBottomRadius
      },
      end: {
        x: x + width - rightBottomRadius,
        y: y + height
      }
    };
    const angle4 = {
      cpl: {
        x: x,
        y: y + height
      },
      start: {
        x: x + leftBottomRadius,
        y: y + height
      },
      end: {
        x,
        y: y + height - leftBottomRadius
      }
    };
    ctx.moveTo(angle1.start.x, angle1.start.y);
    this.roundQuadraticCurveTo(angle1);
    ctx.lineTo(angle2.start.x, angle2.start.y);
    this.roundQuadraticCurveTo(angle2);
    ctx.lineTo(angle3.start.x, angle3.start.y);
    this.roundQuadraticCurveTo(angle3);
    ctx.lineTo(angle4.start.x, angle4.start.y);
    this.roundQuadraticCurveTo(angle4);
    ctx.lineTo(angle1.start.x, angle1.start.y);
    ctx.closePath();
  }

  // 圆心坐标、半径、弧度起点、弧度终点，anticlockwise （false）顺｜（true）逆时针绘制
  public roundArc({
    x,
    y,
    radius,
    startAngle = 0,
    endAngle = Math.PI * 2,
    anticlockwise = false
  }: RoundArcProps) {
    const { ctx } = this;
    if (!ctx) {
      return;
    }
    ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
  }

  // 通过辅助切线画圆弧
  public roundArcTo({ cpl, end, radius }: RoundArcToProps) {
    const { ctx } = this;
    if (!ctx) {
      return;
    }
    ctx.arcTo(cpl.x, cpl.y, end.x, end.y, radius);
  }

  // 二次贝塞尔曲线
  public roundQuadraticCurveTo({ cpl, end }: RoundQuadraticCurveToProps) {
    const { ctx } = this;
    if (!ctx) {
      return;
    }
    ctx.quadraticCurveTo(cpl.x, cpl.y, end.x, end.y);
  }

  // 三次贝塞尔曲线
  public roundBezierCurveToCurveTo({ cpl1, cpl2, start, end }: RoundBezierCurveToCurveToProps) {
    const { ctx } = this;
    if (!ctx) {
      return;
    }
    ctx.moveTo(start.x, start.y);
    ctx.bezierCurveTo(cpl1.x, cpl1.y, cpl2.x, cpl2.y, end.x, end.y);
  }

  public generateImage(source: string): Promise<HTMLImageElement | undefined> {
    return new Promise((resolve) => {
      const img = new Image(); // 创建img元素
      img.onload = function () {
        resolve(img);
      };
      img.onerror = () => {
        resolve(undefined);
      };
      img.src = source;
    });
  }

  public image({
    x,
    y,
    width,
    height,
    radius = 0,
    leftTopRadius = radius,
    rightTopRadius = radius,
    rightBottomRadius = radius,
    leftBottomRadius = radius,
    image
  }: ImageProps) {
    const { ctx } = this;
    if (!ctx || !image) {
      return;
    }
    this.beginPath();
    if (leftTopRadius || rightTopRadius || rightBottomRadius || leftBottomRadius) {
      // 创建裁剪区域
      this.rectangleArc({
        x,
        y,
        width,
        height,
        radius,
        leftTopRadius,
        rightTopRadius,
        rightBottomRadius,
        leftBottomRadius
      });
      ctx.clip();
    }
    let sx;
    let sy;
    let sWidth;
    let sHeight;
    if (image.width / image.height > width / height) {
      // 如果图片的宽高比大于目标宽高比，说明图片宽度需要截取
      sy = 0;
      sWidth = Math.floor((width * image.height) / height);
      sx = (image.width - sWidth) / 2;
      sHeight = image.height;
    } else if (image.width / image.height < width / height) {
      // 如果图片的宽高比小于于目标宽高比，说明图片高度需要截取
      sx = 0;
      sWidth = image.width;
      sHeight = Math.floor((height * image.width) / width);
      sy = (image.height - sHeight) / 2;
    } else {
      // 如果图片的宽高比等于目标宽高比，无需处理
      sx = 0;
      sy = 0;
      sWidth = image.width;
      sHeight = image.height;
    }
    ctx.drawImage(image, sx, sy, sWidth, sHeight, x, y, width, height);
    this.endPath();
  }
}
