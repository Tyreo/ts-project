import React, {
  ReactChild,
  forwardRef,
  useEffect,
  useRef,
  UIEventHandler,
  useCallback
} from 'react';

import './style.scss';

const ScrollNested = forwardRef(
  (
    {
      scrollX,
      scrollY,
      needY,
      needX,
      children,
      onScroll
    }: {
      scrollX?: boolean;
      scrollY?: boolean;
      needY?: boolean;
      needX?: boolean;
      children: ReactChild;
      onScroll?: UIEventHandler<HTMLDivElement>;
    },
    ref?: any
  ) => {
    const scrollObj = useRef<any>(null);

    const scrollObjRef = useCallback(
      (node) => {
        if (node !== null) {
          scrollObj.current = node;
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }
      },
      [ref]
    );

    useEffect(() => {
      if (scrollObj.current) {
        const child = scrollObj.current.firstElementChild;
        if (child) {
          if (needY) {
            scrollObj.current.style.height = `${child.clientHeight}px`;
          }
          if (needX) {
            scrollObj.current.style.width = `${child.clientWidth}px`;
          }
        }
      }
    }, [children, needX, needY, scrollX, scrollY]);

    return (
      <div
        ref={scrollObjRef}
        onScroll={onScroll}
        className={`scroll-nested-component ${scrollX ? 'scroll-x' : ''} ${
          scrollY ? 'scroll-y' : ''
        }`}
      >
        {children}
      </div>
    );
  }
);

export default ScrollNested;
