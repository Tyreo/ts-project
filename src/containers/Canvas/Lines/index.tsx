import Draw from '@/utils/draw';
import React, { useEffect, useRef } from 'react';
import './style.scss';

export default function Lines() {
  const canvasObj = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const draw = new Draw(canvasObj.current);
    // 一条辅助线
    draw.save();
    draw.setBrush({
      strokeStyle: '#FF00FF',
      lineWidth: 1,
      lineCap: 'butt'
    });
    draw.line({
      pathType: 'stroke',
      points: [
        {
          x: 100,
          y: 100
        },
        {
          x: 100,
          y: 400
        }
      ]
    });
    draw.line({
      pathType: 'stroke',
      points: [
        {
          x: 100,
          y: 130
        },
        {
          x: 500,
          y: 130
        }
      ]
    });
    draw.line({
      pathType: 'stroke',
      points: [
        {
          x: 100,
          y: 370
        },
        {
          x: 500,
          y: 370
        }
      ]
    });
    draw.restore();

    // 画一条粗线
    draw.save();
    draw.setBrush({
      strokeStyle: '#00',
      lineWidth: 30,
      lineCap: 'butt'
    });
    draw.line({
      pathType: 'stroke',
      points: [
        {
          x: 100,
          y: 130
        },
        {
          x: 100,
          y: 370
        }
      ]
    });
    draw.restore();

    draw.save();
    draw.setBrush({
      strokeStyle: '#00',
      lineWidth: 30,
      lineCap: 'round'
    });
    draw.line({
      pathType: 'stroke',
      points: [
        {
          x: 150,
          y: 130
        },
        {
          x: 150,
          y: 370
        }
      ]
    });
    draw.restore();

    draw.save();
    draw.setBrush({
      strokeStyle: '#00',
      lineWidth: 30,
      lineCap: 'square'
    });
    draw.line({
      pathType: 'stroke',
      points: [
        {
          x: 200,
          y: 130
        },
        {
          x: 200,
          y: 370
        }
      ]
    });
    draw.restore();

    draw.save();
    draw.setBrush({
      strokeStyle: '#00',
      lineWidth: 10,
      lineCap: 'butt'
    });
    draw.line({
      pathType: 'stroke',
      points: [
        {
          x: 300,
          y: 130
        },
        {
          x: 300,
          y: 370
        }
      ]
    });
    draw.restore();

    draw.save();
    draw.setBrush({
      strokeStyle: '#00',
      lineWidth: 10,
      lineCap: 'round'
    });
    draw.line({
      pathType: 'stroke',
      points: [
        {
          x: 350,
          y: 130
        },
        {
          x: 350,
          y: 370
        }
      ]
    });
    draw.restore();

    draw.save();
    draw.setBrush({
      strokeStyle: '#00',
      lineWidth: 10,
      lineCap: 'square'
    });
    draw.line({
      pathType: 'stroke',
      points: [
        {
          x: 400,
          y: 130
        },
        {
          x: 400,
          y: 370
        }
      ]
    });
    draw.restore();

    // 相交线
    draw.save();
    draw.setBrush({
      strokeStyle: '#00FF',
      lineWidth: 30,
      lineCap: 'butt',
      lineJoin: 'bevel'
    });
    draw.line({
      pathType: 'stroke',
      points: [
        {
          x: 100,
          y: 500
        },
        {
          x: 100,
          y: 800
        },
        {
          x: 300,
          y: 800
        }
      ]
    });
    draw.restore();

    draw.save();
    draw.setBrush({
      strokeStyle: '#00FF',
      lineWidth: 30,
      lineCap: 'butt',
      lineJoin: 'miter',
      miterLimit: 10
    });
    draw.line({
      pathType: 'stroke',
      points: [
        {
          x: 470,
          y: 500
        },
        {
          x: 500,
          y: 800
        },
        {
          x: 530,
          y: 500
        }
      ]
    });
    draw.restore();

    // 画一条虚线
    draw.save();
    draw.setBrush({
      strokeStyle: '#00FF00',
      lineWidth: 10,
      lineCap: 'butt',
      lineDash: {
        segments: [10, 15, 20],
        lineDashOffset: 25
      }
    });
    draw.line({
      pathType: 'stroke',
      points: [
        {
          x: 100,
          y: 900
        },
        {
          x: 700,
          y: 900
        }
      ]
    });
    draw.restore();

    // 画一条圆点虚线
    draw.save();
    draw.setBrush({
      strokeStyle: '#00FF00',
      lineWidth: 30,
      lineCap: 'round',
      lineDash: {
        segments: [0, 60],
        lineDashOffset: 0
      }
    });
    draw.line({
      pathType: 'stroke',
      points: [
        {
          x: 100,
          y: 950
        },
        {
          x: 700,
          y: 950
        }
      ]
    });
    draw.restore();

    // 画一个三角形
    draw.save();
    draw.setBrush({
      strokeStyle: '#00FF00',
      fillStyle: '#EE0099',
      lineWidth: 30,
      lineCap: 'square'
    });
    draw.line({
      pathType: 'stroke',
      points: [
        {
          x: 100,
          y: 1000
        },
        {
          x: 100,
          y: 1300
        },
        {
          x: 600,
          y: 1000
        },
        {
          x: 100,
          y: 1000
        }
      ]
    });
    draw.line({
      pathType: 'fill',
      points: [
        {
          x: 100,
          y: 1000
        },
        {
          x: 100,
          y: 1300
        },
        {
          x: 600,
          y: 1000
        }
      ]
    });
    draw.restore();
    // 画一个五角星
    draw.save();
    draw.setBrush({
      strokeStyle: '#00FF00',
      fillStyle: '#EE0099',
      lineWidth: 30,
      lineCap: 'square'
    });
    const points = [];
    for (let i = 0; i < 5; i++) {
      points.push({
        x: Math.cos(((18 + i * 72) / 180) * Math.PI) * 200 + 350,
        y: -Math.sin(((18 + i * 72) / 180) * Math.PI) * 200 + 1500
      });
      points.push({
        x: Math.cos(((54 + i * 72) / 180) * Math.PI) * 100 + 350,
        y: -Math.sin(((54 + i * 72) / 180) * Math.PI) * 100 + 1500
      });
    }
    draw.line({
      pathType: 'closePath',
      points
    });
    draw.line({
      pathType: 'fill',
      points
    });
    draw.restore();
  }, []);

  return (
    <div className="canvas-line-container">
      <canvas ref={canvasObj} className="canvas-line-container-obj">
        lines
      </canvas>
    </div>
  );
}
