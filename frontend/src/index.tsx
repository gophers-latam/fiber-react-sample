import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import './css/bootstrap.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import {configStore} from "./redux/configStore";
import {Provider} from "react-redux";

axios.defaults.baseURL = 'http://localhost:3000/api/';
axios.defaults.withCredentials = true;

const store = configStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
