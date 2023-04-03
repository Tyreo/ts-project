import Draw from '@/utils/draw';
import React, { useEffect, useRef } from 'react';
import './style.scss';

export default function Variety() {
  const canvasObj = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const draw = new Draw(canvasObj.current);

    // translate
    draw.save();
    for (let i = 0; i < 5; i++) {
      draw.translate(100, 100);
      draw.rectangle({
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        pathType: 'fill'
      });
    }
    draw.restore();

    // translate
    draw.save();
    draw.translate(300, 800);
    for (let i = 0; i < 5; i++) {
      if (i > 0) {
        draw.rotate((2 * Math.PI) / 5);
      }
      draw.rectangle({
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        pathType: 'fill'
      });
    }
    draw.restore();

    // transform
    draw.save();
    draw.ctx?.transform(1, 0, 0, 1, 50, 1000);
    draw.rectangle({
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      pathType: 'fill'
    });
    draw.ctx?.setTransform(1.5, 0, 0, 1.5, 200, 1000);
    draw.rectangle({
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      pathType: 'fill'
    });
    draw.ctx?.setTransform(2, 1, 1, 2, 400, 1000);
    draw.rectangle({
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      pathType: 'fill'
    });
    draw.restore();

    // CanvasGradient
    draw.save();
    draw.setBrush({
      fillStyle: draw.generateGradient({
        radial: {
          round1: {
            x: 250,
            y: 1500,
            r: 50
          },
          round2: {
            x: 300,
            y: 1500,
            r: 200
          }
        },
        colorStopList: [
          {
            position: 0,
            color: '#E600EE'
          },
          {
            position: 0.9,
            color: 'rgba(255, 251, 0, 1)'
          },
          {
            position: 1,
            color: 'rgba(255, 251, 0, 0.5)'
          }
        ]
      })
    });
    draw.rectangle({
      x: 0,
      y: 1200,
      width: 700,
      height: 700,
      pathType: 'fill'
    });
    draw.restore();

    // "evenodd" | "nonzero"
    draw.save();
    draw.ctx?.beginPath();
    draw.roundArc({
      x: 250,
      y: 1900,
      radius: 50
    });
    draw.roundArc({
      x: 250,
      y: 1900,
      radius: 100
    });
    draw.ctx?.fill('evenodd');
    draw.restore();

    // globalCompositeOperation
    draw.save();
    draw.setBrush({
      fillStyle: '#FFFF00'
    });
    draw.rectangle({
      x: 0,
      y: 2000,
      width: 750,
      height: 500,
      pathType: 'fill'
    });
    draw.save();
    draw.setBrush({
      fillStyle: '#F55F00',
      globalCompositeOperation: 'source-over'
    });
    draw.rectangle({
      x: 200,
      y: 2100,
      width: 400,
      height: 500,
      pathType: 'fill'
    });
    draw.restore();
    draw.restore();
  }, []);

  return (
    <div className="canvas-variety-container">
      <canvas ref={canvasObj} className="canvas-variety-container-obj">
        variety
      </canvas>
    </div>
  );
}
