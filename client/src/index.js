import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import globalReducer from './store/reducer/global';
import authReducer from './store/reducer/auth';
import menuReducer from './store/reducer/menu';
import ordersReducer from './store/reducer/orders';
import mealReducer from './store/reducer/meal';

const composeEnhancers =
  process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 })
    : null || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  menu: menuReducer,
  orders: ordersReducer,
  meal: mealReducer,
  global: globalReducer
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, logger)));

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
