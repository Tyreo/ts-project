import Draw from '@/utils/draw';
import React, { useEffect, useRef } from 'react';
import './style.scss';

export default function Rect() {
  const canvasObj = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const draw = new Draw(canvasObj.current);
    // 设置辅助线样式
    draw.setBrush({
      strokeStyle: 'red',
      lineWidth: 10
    });
    draw.rectangle({
      x: 100,
      y: 50,
      height: 200,
      width: 400,
      radius: 50,
      method: 'arc'
    });

    draw.setBrush({
      strokeStyle: 'blue',
      lineWidth: 10
    });
    draw.rectangle({
      x: 100,
      y: 300,
      height: 200,
      width: 400,
      radius: 50,
      method: 'arcTo'
    });

    draw.setBrush({
      strokeStyle: 'black',
      lineWidth: 10
    });
    draw.rectangle({
      x: 100,
      y: 550,
      height: 200,
      width: 400,
      radius: 50,
      method: 'quadraticCurveTo'
    });
  }, []);

  return (
    <div className="canvas-rect-container">
      <canvas ref={canvasObj} className="canvas-rect-container-obj">
        rects
      </canvas>
    </div>
  );
}
