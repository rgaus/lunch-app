import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, compose, applyMiddleware} from 'redux';
import { Router, Route, hashHistory } from 'react-router';

import pipeApp from 'reducers/reducer';
import App from 'components/App';

import changeHandle from 'actions/handle';
import fetchFields from 'actions/fetchFields';
import sendError from 'actions/sendError';
import loadingFields from 'actions/loadingFields';

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

// update handle and associated stuff
hashHistory.listen(loc => {
  // change the handle
  let handle = loc.pathname.slice(1);
  store.dispatch(changeHandle(handle));

  // get the template for the handle
  store.dispatch(loadingFields());
  fetch(`/${handle}/fields`).then(resp => resp.json()).then(json => {
    if (json.error) {
      store.dispatch(sendError(json.error));
    } else {
      store.dispatch(fetchFields(json.fields));
    }
  });
});

render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/:handle" component={App} />
    </Router>
  </Provider>,
  document.getElementById('root')
);
