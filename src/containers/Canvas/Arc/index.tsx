import Draw from '@/utils/draw';
import React, { useEffect, useRef } from 'react';
import './style.scss';

export default function Arc() {
  const canvasObj = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const draw = new Draw(canvasObj.current);

    draw.beginPath();

    // 设置辅助线样式
    draw.setBrush({
      strokeStyle: 'red',
      lineWidth: 1,
      lineDash: {
        segments: [5],
        lineDashOffset: -60
      }
    });

    // 画辅助线
    draw.linePath([
      {
        x: 100,
        y: 100
      },
      {
        x: 500,
        y: 100
      },
      {
        x: 500,
        y: 500
      }
    ]);
    draw.ctx?.moveTo(100, 100);
    draw.roundArc({
      x: 100,
      y: 500,
      radius: 400,
      startAngle: Math.PI + Math.PI / 2,
      endAngle: 2 * Math.PI
    });

    draw.endPath();

    draw.beginPath();
    draw.roundArc({
      x: 500,
      y: 100,
      radius: 50,
      startAngle: Math.PI,
      endAngle: (Math.PI * 5) / 2
    });
    draw.ctx?.moveTo(400, 100);
    draw.roundArcTo({
      cpl: {
        x: 500,
        y: 100
      },
      end: {
        x: 500,
        y: 500
      },
      radius: 50
    });
    draw.ctx?.moveTo(100, 100);
    draw.roundQuadraticCurveTo({
      cpl: {
        x: 500,
        y: 100
      },
      end: {
        x: 500,
        y: 500
      }
    });
    draw.endPath('stroke');
  }, []);

  return (
    <div className="canvas-arc-container">
      <canvas ref={canvasObj} className="canvas-arc-container-obj">
        arcs
      </canvas>
    </div>
  );
}
