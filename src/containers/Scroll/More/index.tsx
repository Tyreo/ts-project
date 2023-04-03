import React, { useCallback, useEffect, useRef, useState } from 'react';

import ScrollMore from '@/components/ScrollMore';
import { RouterProps } from '@/interfaces';

import './style.scss';

function genericList(pn: number, ps: number): Promise<any[]> {
  const list = new Array(ps).fill(1).map((_, index) => ({ key: (pn - 1) * ps + index }));
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(list);
    }, 1000);
  });
}

export default function More(props: RouterProps) {
  const [listDown, setListDown] = useState<any[]>([]);
  const [listTop, setListTop] = useState<any[]>([]);
  const pageInfoDown = useRef({ pn: 1, ps: 10 });
  const pageInfoTop = useRef({ pn: 1, ps: 10 });
  useEffect(() => {
    pageInfoDown.current.pn = 1;
    genericList(pageInfoDown.current.pn, pageInfoDown.current.ps).then((res) => {
      setListDown((oldList) => [...oldList, ...res]);
    });
  }, []);
  useEffect(() => {
    pageInfoTop.current.pn = 1;
    genericList(pageInfoTop.current.pn, pageInfoTop.current.ps).then((res) => {
      setListTop((oldList) => [...res.reverse(), ...oldList]);
    });
  }, []);
  console.log(props);

  const onTouchDown = useCallback(() => {
    pageInfoDown.current.pn += 1;
    return genericList(pageInfoDown.current.pn, pageInfoDown.current.ps).then((res) => {
      setListDown((oldList) => [...oldList, ...res]);
      return Promise.resolve();
    });
  }, []);
  const onTouchTop = useCallback(() => {
    pageInfoTop.current.pn += 1;
    return genericList(pageInfoTop.current.pn, pageInfoTop.current.ps).then((res) => {
      setListTop((oldList) => [...res.reverse(), ...oldList]);
      return Promise.resolve();
    });
  }, []);

  return (
    <div className="scroll-more-router">
      <div className="scroll-title">触底追加数据</div>
      <div className="scroll-list">
        <ScrollMore onTouchDown={onTouchDown}>
          <div className="scroll-content">
            {listDown.map((item) => (
              <div className="scroll-list-item" key={item.key}>
                {item.key}
              </div>
            ))}
          </div>
        </ScrollMore>
      </div>
      <div className="scroll-title">触顶追加数据</div>
      <div className="scroll-list">
        <ScrollMore onTouchTop={onTouchTop}>
          <div className="scroll-content">
            {listTop.map((item) => (
              <div className="scroll-list-item" key={item.key}>
                {item.key}
              </div>
            ))}
          </div>
        </ScrollMore>
      </div>
    </div>
  );
}
