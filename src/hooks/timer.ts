import { useCallback, useEffect, useReducer, useState } from 'react';

// 糟糕的计时器
export function useCountdown1() {
  const [count, setCount] = useState(60);

  useEffect(() => {
    if (count === 0) {
      return;
    }
    console.log('useCountdown1：创建定时器');
    const time = setInterval(() => {
      setCount(count - 1);
    }, 1000);
    return () => {
      console.log('useCountdown1：销毁定时器');
      clearInterval(time);
    };
  }, [count]);

  return count;
}

// 优化版本的计时器
export function useCountdown2() {
  const [count, setCount] = useState(60);

  useEffect(() => {
    console.log('useCountdown2：创建定时器');
    const time = setInterval(() => {
      setCount((preCount) => {
        if (preCount === 0) {
          console.log('useCountdown2：销毁定时器');
          clearInterval(time);
          return 0;
        }
        return preCount - 1;
      });
    }, 1000);
    return () => {
      console.log('useCountdown2：销毁定时器');
      clearInterval(time);
    };
  }, []);

  return count;
}

// 对外提供服务的计时器，我们将其改成毫秒数，使其可以控制的力度可以更细
export function useCountdown3(initCount: number, interval = 1000) {
  const [count, setCount] = useState(initCount);

  useEffect(() => {
    console.log('useCountdown3：创建定时器');
    const time = setInterval(() => {
      setCount((preCount) => {
        if (preCount <= interval) {
          console.log('useCountdown3：销毁定时器');
          clearInterval(time);
          return 0;
        }
        return preCount - interval;
      });
    }, interval);
    return () => {
      console.log('useCountdown3：销毁定时器');
      clearInterval(time);
    };
  }, [interval]);

  return count;
}

// 添加倒计时过程中，重置计时器的功能
export function useCountdown4(initCount: number, interval = 1000) {
  const [count, setCount] = useState(initCount);

  useEffect(() => {
    console.log('useCountdown4：创建定时器');
    const time = setInterval(() => {
      setCount((preCount) => {
        if (preCount <= interval) {
          console.log('useCountdown4：销毁定时器');
          clearInterval(time);
          return 0;
        }
        return preCount - interval;
      });
    }, interval);
    return () => {
      console.log('useCountdown4：销毁定时器');
      clearInterval(time);
    };
  }, [interval]);

  const reset = () => {
    setCount(initCount);
  };

  return { count, reset };
}

// 追加倒计时结束后，可以重置计时器的功能。这里已经能够满足发送短信验证码倒计时的功能了
export function useCountdown5(initCount: number, interval = 1000) {
  const [count, setCount] = useState(initCount);
  // 一个增长的计时器，用于重置倒计时
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    console.log('useCountdown5：创建定时器');
    const time = setInterval(() => {
      setCount((preCount) => {
        if (preCount <= interval) {
          console.log('useCountdown5：销毁定时器');
          clearInterval(time);
          return 0;
        }
        return preCount - interval;
      });
    }, interval);
    return () => {
      console.log('useCountdown5：销毁定时器');
      clearInterval(time);
    };
  }, [interval, ignored]);

  const reset = () => {
    setCount(initCount);
    forceUpdate();
  };

  return { count, reset };
}

// 追加通过外部更改initCount，可以重置计时器的功能，主要为了满足通过服务端时间校准计时器的功能
export function useCountdown6(initCount: number, interval = 1000) {
  const [count, setCount] = useState(initCount);
  // 一个增长的计时器，用于重置倒计时
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

  const reset = useCallback(() => {
    setCount(initCount);
    forceUpdate();
  }, [initCount]);

  useEffect(() => {
    reset();
  }, [reset]);

  useEffect(() => {
    console.log('useCountdown6：创建定时器');
    const time = setInterval(() => {
      setCount((preCount) => {
        if (preCount <= interval) {
          console.log('useCountdown6：销毁定时器');
          clearInterval(time);
          return 0;
        }
        return preCount - interval;
      });
    }, interval);
    return () => {
      console.log('useCountdown6：销毁定时器');
      clearInterval(time);
    };
  }, [interval, ignored]);

  return { count, reset };
}

// 最后我们再提供一个计算时分秒的工具方法, 用来满足支付倒计时
export function remainHMS(time: number) {
  const remainDay = Math.floor(time / (24 * 60 * 60 * 1000));
  const remainTime = time % (24 * 60 * 60 * 1000);
  const remainHour = Math.floor(remainTime / (60 * 60000));
  const remainMinutes = Math.floor((remainTime % (60 * 60000)) / 60000);
  const remainSeconds = Math.floor((remainTime % 60000) / 1000);
  return {
    d: remainDay,
    h: remainHour,
    m: remainMinutes,
    s: remainSeconds
  };
}
