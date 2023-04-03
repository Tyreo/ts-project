export const isPassive = (function () {
  let supportsPassiveOption = false;
  // 定义一个具有 passive 属性的 对象，设置其 getter
  const options = Object.defineProperty({}, 'passive', {
    get: function () {
      supportsPassiveOption = true;
      return null;
    }
  });
  try {
    document.addEventListener('test', () => {}, options);
  } catch (e) {
    console.log(e);
  }
  return supportsPassiveOption;
})();

function getSlideAngle(dx: number, dy: number) {
  return (Math.atan2(dy, dx) * 180) / Math.PI;
}

// 根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动
export function getSlideDirection({
  startX,
  startY,
  endX,
  endY
}: {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}) {
  const dy = startY - endY;
  const dx = endX - startX;
  let result = 0;
  // 如果滑动距离太短
  if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
    return result;
  }
  const angle = getSlideAngle(dx, dy);
  if (angle >= -45 && angle < 45) {
    result = 4;
  } else if (angle >= 45 && angle < 135) {
    result = 1;
  } else if (angle >= -135 && angle < -45) {
    result = 2;
  } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
    result = 3;
  }
  return result;
}

export function addHandler(
  element: HTMLElement | null | undefined,
  type: string,
  handler: globalThis.EventListener | globalThis.EventListenerObject | null | undefined
) {
  if (element && handler) {
    const option = isPassive ? { capture: false, passive: true } : false;
    element.addEventListener(type, handler, option);
  }
}

export function removeHandler(
  element: HTMLElement | null | undefined,
  type: string,
  handler: globalThis.EventListener | globalThis.EventListenerObject | null | undefined
) {
  if (element && handler) {
    const option = isPassive ? { capture: false, passive: true } : false;
    element.removeEventListener(type, handler, option);
  }
}

export function isObjEqual(o1: any, o2: any) {
  // console.log('比较一致性', o1, o2)
  if (!o1 && !o2) {
    return true;
  }
  if ((o1 && !o2) || (!o1 && o2)) {
    return false;
  }
  let props1 = Object.getOwnPropertyNames(o1);
  let props2 = Object.getOwnPropertyNames(o2);
  if (props1.length !== props2.length) {
    return false;
  }
  for (let i = 0, max = props1.length; i < max; i++) {
    let propName = props1[i];
    if (o1[propName] !== o2[propName]) {
      return false;
    }
  }
  return true;
}
