import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import allReducers from './reducers';
import { Provider } from 'react-redux';

const store = createStore(allReducers, applyMiddleware(thunk));

store.subscribe(() => {
  console.log('store state:', store.getState());
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
