import 'lib-flexible';

import React from 'react';
import ReactDOM from 'react-dom';
import { renderRoutes } from 'react-router-config';
import { BrowserRouter } from 'react-router-dom';
import routes from './routes';

import './style';

const render = () => {
  ReactDOM.render(
    <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>,
    document.getElementById('root')
  );
};

render();

if (module.hot) {
  module.hot.accept('./routes', () => {
    render();
  });
}
