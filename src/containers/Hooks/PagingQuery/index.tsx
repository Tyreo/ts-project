import React, { useCallback, useEffect, useRef, useState } from 'react';

import ScrollMore from '@/components/ScrollMore';

import usePagingQuery, { Result } from '@/hooks/usePagingQuery';

import './style.scss';

function genericList({
  pn,
  ps,
  count
}: {
  pn: number;
  ps: number;
  count?: number;
}): Promise<Result> {
  console.log('查询条件：', { pn, ps, count });
  const list = new Array(ps).fill(1).map((_, index) => ({ key: (pn - 1) * ps + index }));
  return new Promise<Result>((resolve) => {
    setTimeout(() => {
      resolve({ resList: list, total: 100 });
    }, 1000);
  });
}

export default function PagingQuery() {
  const scrollObj = useRef<HTMLElement>(null);
  const [params, setParams] = useState({ count: 1 });
  const { pn, ps, total, list, empty, onQuery } = usePagingQuery({
    fetchData: genericList, // 这里需要一个不可变方法， 否则会有多次触发的bug
    params
  });

  useEffect(() => {
    // 初始化查询
    if (scrollObj.current) {
      scrollObj.current.scrollTop = 0;
    }
    // 这里可以showLoading
    onQuery(params).then(() => {
      // 这里可以hideLoading
    });
  }, [onQuery, params]);

  // 触底查询
  const onTouchDown = useCallback(() => {
    // 这里无需loading
    return onQuery();
  }, [onQuery]);

  // 修改查询条件
  const resetQuery = useCallback(() => {
    setParams(({ count }) => {
      const newParam = { count: count + 1 };
      return newParam;
    });
  }, []);

  return (
    <div className="hooks-paging-query-router">
      <div onClick={resetQuery} className="scroll-title">
        {`点击重置查询: pn:${pn}-ps:${ps}-total:${total}`}
      </div>
      <div className="scroll-list">
        {empty ? (
          <div>empty</div>
        ) : (
          <ScrollMore myRef={scrollObj} onTouchDown={onTouchDown}>
            <div className="scroll-content">
              {list.map((item) => (
                <div className="scroll-list-item" key={item.key}>
                  {item.key}
                </div>
              ))}
            </div>
          </ScrollMore>
        )}
      </div>
    </div>
  );
}
