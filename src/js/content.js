import React from 'react';
import { render } from 'react-dom';
import { Store } from 'react-chrome-redux';
import { Provider } from 'react-redux';

import ContentApp from './components/content';

const proxyStore = new Store({
  portName: 'react-chrome-redux-bugs'
});

const unsubscribe = proxyStore.subscribe(() => {
  unsubscribe();

  let container = document.createElement('div');
  container.id = 'react-chrome-redux-bugs';
  document.body.appendChild(container);

  render(
    <Provider store={ proxyStore }>
      <ContentApp />
    </Provider>,
    container
  );
});
