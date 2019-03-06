import React from 'react';
import ReactDOM from 'react-dom';

import Routers from './routes';

const render = () => {
  ReactDOM.render(<Routers />, document.getElementById('root'));
}

render();

if (module.hot) {
  module.hot.accept('./routes', () => {
    render()
  })
}
