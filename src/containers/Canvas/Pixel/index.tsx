import React, { useCallback, useEffect, useRef, useState } from 'react';
import Draw from '@/utils/draw';
import testImg from './images/image001.png';

import './style.scss';

export default function Pixel() {
  const canvasObj = useRef<HTMLCanvasElement>(null);
  const bigLook = useRef<HTMLCanvasElement>(null);

  const drawObj = useRef<Draw>();
  const drawBigLook = useRef<Draw>();

  const [selectedColor, setSelectedColor] = useState('');

  const doDraw = useCallback(async (draw: Draw) => {
    const img = await draw.generateImage(testImg);

    draw.image({
      x: 0,
      y: 0,
      image: img,
      width: 400,
      height: 400
    });
  }, []);

  const pick = useCallback((event, setColor, draw) => {
    const dpr = window.devicePixelRatio;
    // 获取点击位置坐标
    let x = event.layerX * dpr;
    let y = event.layerY * dpr;

    // 提取当前色值
    let pixel = draw.ctx.getImageData(x, y, 1, 1);
    let data = pixel.data;
    const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
    setColor(rgba);

    // 清空画布
    drawBigLook.current?.clearRect({
      x: 0,
      y: 0,
      width: 400,
      height: 400
    });
    // 提取点击位置周围 20 * 20 px 的像素值，画到400*dpr * 400*dpr 的画布上。
    drawBigLook.current?.ctx?.drawImage(draw.ctx.canvas, x - 20, y - 20, 40, 40, 0, 0, 400, 400);
    return rgba;
  }, []);

  useEffect(() => {
    let node = canvasObj.current;
    const draw = new Draw(canvasObj.current);
    drawObj.current = draw;
    drawBigLook.current = new Draw(bigLook.current);
    doDraw(draw);

    // 给canvas 添加点击事件
    const clickEvent = (event: MouseEvent) => {
      pick(event, setSelectedColor, draw);
    };
    node?.addEventListener('click', clickEvent);
    return () => {
      node?.removeEventListener('click', clickEvent);
    };
  }, [doDraw, pick]);

  const changeImg = () => {
    const draw = drawObj.current;
    if (draw) {
      // 获取canvas 指定区域的像素数据
      const imageData = draw.ctx?.getImageData(0, 0, draw.realPx(400), draw.realPx(400));
      // 更改像素色值
      if (imageData) {
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
          data[i] = 255 - data[i]; // red
          data[i + 1] = 255 - data[i + 1]; // green
          data[i + 2] = 255 - data[i + 2]; // blue
        }
        // 替换指定区域的颜色
        draw.ctx?.putImageData(imageData, 0, 0);
      }
    }
  };

  return (
    <div className="canvas-pixel-router">
      <canvas ref={canvasObj} className="canvas-pixel-container">
        canvas test
      </canvas>
      <canvas ref={bigLook} className="canvas-pixel-big-look">
        canvas test
      </canvas>
      <div style={{ backgroundColor: selectedColor }} className="canvas-pixel-color-div">
        Selected color: {selectedColor}
      </div>
      <div>
        <button onClick={changeImg}>操作像素</button>
      </div>
    </div>
  );
}
