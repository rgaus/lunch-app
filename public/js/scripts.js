import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, compose, applyMiddleware} from 'redux';

import pipeApp from 'reducers/reducer';
import App from 'components/App';

import changeHandle from 'actions/handle';

let store = createStore(pipeApp, {
  fieldSchema: {
    "fields":{
      "expensive":["no","yes"],
      "hasaturkeysandwich":["yes","no"],
      "caneatoutside":["no","yes",""],
      "canorderout":["","yes"],
    }
  },
  fields: { /* the user's state */ },
  choice: { /* output response with a random place */ },
}, compose(
  applyMiddleware(),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

// Update handle
store.dispatch(changeHandle(location.hash.slice(1)));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
