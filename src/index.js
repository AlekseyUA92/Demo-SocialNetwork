// import reportWebVitals from './reportWebVitals';
import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import store from './redux/redux-store';
import MainApp from './App';

let rerenderEntireTree = () => {
  ReactDOM.render(<MainApp />, document.getElementById('root'));
};

rerenderEntireTree();

store.subscribe(() => {
  // let state = store.getState()
  rerenderEntireTree();
});
