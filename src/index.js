import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import  rootReducer  from './reducers/index';
import middleware from './middleware'
import { createStore } from 'redux';

const store = createStore(rootReducer,middleware)
ReactDOM.render(

     <Provider store={store}> <App /></Provider>
  ,
  document.getElementById('root')
);


