import React, { useState } from 'react';
import {
  useCountdown1,
  useCountdown2,
  useCountdown3,
  useCountdown4,
  useCountdown5,
  useCountdown6,
  remainHMS
} from '@/hooks/timer';

import './style.scss';

export default function Countdown() {
  const count1 = useCountdown1();
  const count2 = useCountdown2();
  const count3 = useCountdown3(30 * 1000, 2000);
  const { count: count4, reset: reset4 } = useCountdown4(40 * 1000, 2000);
  const { count: count5, reset: reset5 } = useCountdown5(10 * 1000, 1000);
  const [count, setCount] = useState(10 * 1000);
  const { count: count6 } = useCountdown6(count, 1000);
  const { d, h, m, s } = remainHMS(count6);

  return (
    <div className="hooks-paging-count-down-router">
      <div>{`useCountdown1：${count1 / 1000}`}</div>
      <div>{`useCountdown2：${count2 / 1000}`}</div>
      <div>{`useCountdown3: ${count3 / 1000}`}</div>
      <div
        onClick={() => {
          reset4();
        }}
      >{`useCountdown4: ${count4 / 1000}      点击重置计时器(结束无法重置)`}</div>
      <div
        onClick={() => {
          reset5();
        }}
      >{`useCountdown5: ${count5 / 1000}      点击重置计时器(结束可以重置)`}</div>
      <div
        onClick={() => {
          setCount((c) => c + 1 * 60 * 60 * 1000);
        }}
      >{`useCountdown6: ${count6 / 1000}      点击重置计时器(结束可以重置)`}</div>
      <div>{`${d}天-${h}时-${m}分-${s}秒`}</div>
    </div>
  );
}
