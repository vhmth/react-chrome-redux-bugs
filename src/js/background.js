import React from 'react';
import { wrapStore } from 'react-chrome-redux';
import { createStore } from 'redux';

const DEFAULT_STATE = {
  renderSubComponent: false,
  counter:            null
};
const rootReducer = (state = DEFAULT_STATE, action) => {
  switch  (action.type) {
    case 'increment-counter':
      return (() => {
        const { counter } = state;
        const { count } = counter;
        return Object.assign({}, state, {
          counter: { count: count + 1 }
        });
      })();
    case 'toggle-app':
      return (() => {
        const { renderSubComponent } = state;
        const counter = renderSubComponent ? null : { count: 0 };
        return { renderSubComponent: !renderSubComponent, counter };
      })();
    default:
      return state;
  }
};

const store = createStore(rootReducer);
wrapStore(store, {
  portName: 'react-chrome-redux-bugs'
});

// for debugging
window.store = store;

chrome.browserAction.onClicked.addListener(() => {
  store.dispatch({ type: 'toggle-app' });
});
