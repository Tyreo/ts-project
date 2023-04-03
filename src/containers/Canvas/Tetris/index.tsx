import React, { useEffect, useRef, useState } from 'react';
import Draw from '@/utils/draw';
import Tetris from './tetris';
import './style.scss';

export default function TetrisD() {
  const [score, setScore] = useState(0);
  const canvasObj = useRef<HTMLCanvasElement>(null);
  const tetrisObj = useRef<Tetris>();

  useEffect(() => {
    if (canvasObj.current) {
      tetrisObj.current = new Tetris({
        row: 25,
        column: 20,
        speed: 500,
        draw: new Draw(canvasObj.current),
        stoneNum: 5,
        brickNum: 5,
        onScore: (v: number) => {
          setScore((s) => s + v);
        }
      });
      return () => {
        if (tetrisObj.current) {
          tetrisObj.current?.stopTimer();
        }
      };
    }
  }, []);

  return (
    <div className="canvas-tetris-router">
      <canvas ref={canvasObj} id="myCanvas" className="canvas-tetris-container">
        canvas test
      </canvas>
      <button
        onClick={() => {
          tetrisObj.current?.reset();
        }}
        id="reset"
      >
        重置游戏
      </button>
      <button
        onClick={() => {
          tetrisObj.current?.pause();
        }}
        id="pause"
      >
        暂停游戏
      </button>
      <button
        onClick={() => {
          tetrisObj.current?.start();
        }}
        id="start"
      >
        开始游戏
      </button>
      <button id="score">得分: {score}</button>
      <div className="canvas-tetris-between">
        <div className="canvas-tetris-center">
          <div>
            <button
              onClick={() => {
                tetrisObj.current?.moveDown();
              }}
              id="moveDown"
            >
              向下移动
            </button>
          </div>
          <div>
            <button
              onClick={() => {
                tetrisObj.current?.moveLeft();
              }}
              id="moveLeft"
            >
              向左移动
            </button>
            <button
              onClick={() => {
                tetrisObj.current?.moveRight();
              }}
              id="moveRight"
            >
              向右移动
            </button>
          </div>
        </div>
        <div>
          <button
            onClick={() => {
              tetrisObj.current?.rotate();
            }}
            id="rotate"
          >
            变变变
          </button>
        </div>
      </div>
    </div>
  );
}
