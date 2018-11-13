import React from 'react';
import './index.css';
import App from './containers/App/App';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker';
import { hydrate, render } from 'react-dom';

import rootReducer from './reducers/reducers'
const store = createStore(
                rootReducer,
                applyMiddleware(thunk)
              )

const rootElement = document.getElementById('root');
if (rootElement.hasChildNodes()) {
  hydrate(
    <Provider store={store}>
      <App />
    </Provider>
    , rootElement);
} else {
  render(
    <Provider store={store}>
      <App />
    </Provider>
    , rootElement);
}

serviceWorker.unregister();
