import React, { PureComponent, ReactChild } from 'react';
import ScrollNested from '@/components/ScrollNested';

import './style.scss';

export interface ScrollMoreProps {
  onTouchDown?: () => Promise<any>; // 触底加载
  onTouchTop?: () => Promise<any>; // 触顶加载
  downDistance?: number; // 距离底部多少的时候加载
  topDistance?: number; // 距离顶部多少的时候加载
  onScroll?: globalThis.EventListener | globalThis.EventListenerObject;
  children: ReactChild;
  myRef?: any;
}

class ScrollMore extends PureComponent<ScrollMoreProps, {}> {
  public scrollObj: HTMLElement | null = null;
  public loading = { top: false, down: false };
  public scrolling = false;

  public onScrollY(e: any) {
    if (
      e.target.scrollTop >= e.target.scrollHeight - e.target.clientHeight ||
      e.target.scrollTop <= 0
    ) {
      this.scrolling = false;
    } else {
      this.scrolling = true;
    }
    const { onTouchDown, onTouchTop, topDistance = 50, downDistance = 50, onScroll } = this.props;
    if (typeof onScroll === 'function') {
      onScroll(e);
    }
    if (typeof onTouchDown === 'function' && !this.loading.down) {
      if (e.target.scrollTop + downDistance >= e.target.scrollHeight - e.target.clientHeight) {
        console.log('触底加载。。。');
        this.loading.down = true;
        onTouchDown().finally(() => {
          console.log('触底加载结束。。。');
          setTimeout(() => {
            this.loading.down = false;
          }, 500);
        });
      }
    }
    if (typeof onTouchTop === 'function' && !this.loading.top) {
      if (e.target.scrollTop <= topDistance) {
        console.log('触顶加载。。。');
        this.loading.top = true;
        onTouchTop().finally(() => {
          console.log('触顶加载结束。。。');
          setTimeout(() => {
            this.loading.top = false;
          }, 500);
        });
      }
    }
  }

  public getSnapshotBeforeUpdate() {
    if (this.loading.top && this.scrollObj) {
      return this.scrollObj.scrollHeight - this.scrollObj.scrollTop;
    }
    return 0;
  }

  public componentDidUpdate(_preProps: any, _preState: any, scrollTop: number) {
    const { onTouchTop } = this.props;
    if (typeof onTouchTop === 'function') {
      if (scrollTop && this.scrollObj) {
        this.scrollObj.scrollTop = this.scrollObj.scrollHeight - scrollTop;
        return;
      }
      if (this.scrollObj) {
        this.scrollObj.scrollTop = this.scrollObj.scrollHeight - this.scrollObj.clientHeight;
      }
    }
  }

  public render() {
    const { children, myRef } = this.props;
    return (
      <div className="scroll-more-component">
        <div>header</div>
        <ScrollNested
          scrollY
          onScroll={this.onScrollY.bind(this)}
          ref={(obj: HTMLDivElement) => {
            this.scrollObj = obj;
            if (typeof myRef === 'function') {
              myRef(obj);
            } else if (myRef) {
              myRef.current = obj;
            }
          }}
        >
          {children}
        </ScrollNested>
      </div>
    );
  }
}

export default ScrollMore;
