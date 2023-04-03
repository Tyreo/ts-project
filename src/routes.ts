import App from '@/containers';
import Menu from '@/containers/Menu';

// 滚动相关
import Scroll from '@/containers/Scroll';
import Nested from '@/containers/Scroll/Nested';
import More from '@/containers/Scroll/More';

// React Hooks
import Hooks from '@/containers/Hooks';
import Countdown from '@/containers/Hooks/Countdown';
import PagingQuery from '@/containers/Hooks/PagingQuery';

// canvas
import Canvas from '@/containers/Canvas';
import Galaxy from '@/containers/Canvas/Galaxy';
import Tetris from '@/containers/Canvas/Tetris';
import Arc from '@/containers/Canvas/Arc';
import Lines from '@/containers/Canvas/Lines';
import Font from '@/containers/Canvas/Font';
import Img from '@/containers/Canvas/Img';
import Rect from '@/containers/Canvas/Rect';
import Variety from '@/containers/Canvas/Variety';
import Pixel from '@/containers/Canvas/Pixel';

// css
import Css from '@/containers/Css';
import FrostedGlass from '@/containers/Css/FrostedGlass';
import TextWrapping from '@/containers/Css/TextWrapping';

import { RouteConfig } from 'react-router-config';

const routes: RouteConfig[] = [
  {
    component: App,
    routes: [
      {
        path: '/',
        exact: true,
        component: Menu
      },
      {
        title: '滚动',
        path: '/scroll',
        component: Scroll,
        routes: [
          {
            title: '嵌套滚动',
            path: '/scroll/nested',
            exact: true,
            component: Nested
          },
          {
            title: '滚动加载更多',
            path: '/scroll/more',
            exact: true,
            component: More
          }
        ]
      },
      {
        title: 'Hooks',
        path: '/hooks',
        component: Hooks,
        routes: [
          {
            title: '倒计时',
            path: '/hooks/Countdown',
            exact: true,
            component: Countdown
          },
          {
            title: '分页查询',
            path: '/hooks/PagingQuery',
            exact: true,
            component: PagingQuery
          }
        ]
      },
      {
        title: 'Canvas',
        path: '/canvas',
        component: Canvas,
        routes: [
          {
            title: '绘制直线',
            path: '/canvas/lines',
            exact: true,
            component: Lines
          },
          {
            title: '绘制弧度',
            path: '/canvas/arc',
            exact: true,
            component: Arc
          },
          {
            title: '绘制圆角矩形',
            path: '/canvas/rect',
            exact: true,
            component: Rect
          },
          {
            title: '绘制文字',
            path: '/canvas/font',
            exact: true,
            component: Font
          },
          {
            title: '绘制图片',
            path: '/canvas/img',
            exact: true,
            component: Img
          },
          {
            title: '像素操作',
            path: '/canvas/pixel',
            exact: true,
            component: Pixel
          },
          {
            title: '变形与叠加',
            path: '/canvas/variety',
            exact: true,
            component: Variety
          },
          {
            title: '月地环绕',
            path: '/canvas/galaxy',
            exact: true,
            component: Galaxy
          },
          {
            title: '俄罗斯方块',
            path: '/canvas/tetris',
            exact: true,
            component: Tetris
          }
        ]
      },
      {
        title: '样式测试',
        path: '/css',
        component: Css,
        routes: [
          {
            title: '毛玻璃效果',
            path: '/css/input',
            exact: true,
            component: FrostedGlass
          },
          {
            title: '文字环绕',
            path: '/css/textWrapping',
            exact: true,
            component: TextWrapping
          }
        ]
      }
    ]
  }
];

export default routes;
