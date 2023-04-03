import React, { useCallback, useEffect, useRef } from 'react';
import Draw from '@/utils/draw';
import './style.scss';

import imgUrl from './images/image001.png';

export default function Img() {
  const canvasObj = useRef<HTMLCanvasElement>(null);
  const doDraw = useCallback(async (draw) => {
    const image = await draw.generateImage(imgUrl);
    // 等比缩放
    draw.image({
      x: 100,
      y: 100,
      width: 500,
      height: 500,
      image
    });

    // 圆角图片
    draw.image({
      x: 100,
      y: 700,
      width: 500,
      height: 500,
      image,
      radius: 50
    });
  }, []);

  useEffect(() => {
    const draw = new Draw(canvasObj.current);
    doDraw(draw);
  }, [doDraw]);

  return (
    <div className="canvas-img-container">
      <canvas ref={canvasObj} className="canvas-img-container-obj">
        imgs
      </canvas>
    </div>
  );
}
