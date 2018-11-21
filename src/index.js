import React from 'react';
import './index.css';
import App from './containers/App/App';
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker';
import { hydrate, render } from 'react-dom';
import store from './store/store'

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
