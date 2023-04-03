import { isObjEqual } from '@/utils/toos';
import { useCallback, useRef, useState } from 'react';

interface Params {
  [key: string]: any;
}

interface RequestParams {
  pn: number;
  ps: number;
  [key: string]: any;
}

interface Data {
  list: any[];
  empty: boolean;
}

export interface Result {
  resList: any[];
  total: number;
}

export default function usePagingQuery({
  fetchData,
  defaultPs = 20,
  defaultTotal = 0
}: {
  fetchData: (params: RequestParams) => Promise<Result>;
  params?: Params;
  defaultPs?: number;
  defaultTotal?: number;
  initQuery?: boolean;
}) {
  const pageInfo = useRef<{
    pn: number;
    ps: number;
    total: number;
    count: number;
    params?: {};
  }>({
    pn: 0,
    ps: defaultPs,
    total: defaultTotal,
    count: 0
  });
  const [data, setData] = useState<Data>({ list: [], empty: false });

  const queryData = useCallback(
    async (count: number) => {
      const { pn, ps, total, params } = pageInfo.current;
      if (total && pn * ps >= total) {
        return Promise.resolve('no');
      }
      try {
        const { resList, total: total_1 } = await fetchData({
          ...params,
          pn: pn + 1,
          ps
        });
        console.log(count, pageInfo.current.count);
        if (count === pageInfo.current.count) {
          if (resList && resList.length > 0) {
            pageInfo.current.pn += 1;
            pageInfo.current.total = total_1;
            setData(({ list }: Data) => {
              if (pageInfo.current.pn === 1) {
                return {
                  list: resList,
                  empty: resList.length === 0
                };
              }
              const newlist = [...list, ...resList];
              return {
                list: newlist,
                empty: newlist.length === 0
              };
            });
          } else {
            pageInfo.current.total = (pn + 1) * ps;
          }
          return Promise.resolve('ok');
        }
      } catch {
        return Promise.resolve('error');
      }
    },
    [fetchData]
  );

  const onQuery = useCallback(
    (params?: Params) => {
      if (params && !isObjEqual(pageInfo.current.params, params)) {
        pageInfo.current.params = params;
        pageInfo.current.pn = 0;
      }
      pageInfo.current.count += 1;
      return queryData(pageInfo.current.count);
    },
    [queryData]
  );

  const { pn, ps, total } = pageInfo.current;
  const { list, empty } = data;
  return {
    pn,
    ps,
    total,
    list,
    empty,
    onQuery
  };
}
