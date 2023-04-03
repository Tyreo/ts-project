import React, { useCallback, useEffect, useRef } from 'react';
import Draw from '@/utils/draw';
import Canvas_earth from './images/Canvas_earth.png';
import Canvas_moon from './images/Canvas_moon.png';
import Canvas_sun from './images/Canvas_sun.png';

import './style.scss';

export default function Galaxy() {
  const canvasObj = useRef<HTMLCanvasElement>(null);
  const doDraw = useCallback(async (draw: Draw) => {
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
          ((2 * Math.PI) / 60) * time.getSeconds() +
            ((2 * Math.PI) / 60000) * time.getMilliseconds()
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
  }, []);

  useEffect(() => {
    const draw = new Draw(canvasObj.current);
    doDraw(draw);
  }, [doDraw]);

  return (
    <div className="canvas-galaxy-router">
      <canvas ref={canvasObj} id="myCanvas" className="canvas-galaxy-container">
        canvas test
      </canvas>
    </div>
  );
}
