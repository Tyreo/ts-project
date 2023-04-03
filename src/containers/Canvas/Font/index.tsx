import Draw from '@/utils/draw';
import React, { useEffect, useRef } from 'react';
import './style.scss';

export default function Font() {
  const canvasObj = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const draw = new Draw(canvasObj.current);
    draw.rectangle({
      x: 100,
      y: 100,
      width: 500,
      height: 400
    });

    draw.setBrush({
      fillStyle: draw.generateGradient({
        linear: {
          point1: {
            x: 100,
            y: 0
          },
          point2: {
            x: 500,
            y: 0
          }
        },
        colorStopList: [
          {
            position: 0,
            color: '#FFF'
          },
          {
            position: 0.5,
            color: 'red'
          },
          {
            position: 0.5,
            color: 'blue'
          },
          {
            position: 1,
            color: '#E09911'
          }
        ]
      })
    });

    draw.setFont({
      font: 'italic small-caps 600 50px 楷体',
      textAlign: 'left',
      textBaseline: 'top',
      direction: 'ltr'
    });
    draw.text({
      x: 100,
      y: 100,
      text: '测试文本 吕小伟 WelCome',
      fill: true,
      compressedSpace: false,
      maxWidth: 500
    });

    draw.setFont({
      font: 'italic small-caps 600 30px 楷体',
      textAlign: 'left',
      textBaseline: 'bottom',
      direction: 'inherit'
    });
    draw.text({
      x: 100,
      y: 500,
      text: '测试文本吕小伟WelCome',
      fill: true
    });
  }, []);

  return (
    <div className="canvas-font-container">
      <canvas ref={canvasObj} className="canvas-font-container-obj">
        fonts
      </canvas>
    </div>
  );
}
