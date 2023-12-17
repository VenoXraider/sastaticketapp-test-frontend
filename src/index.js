import React from 'react';
import './index.scss';
import App from './App';
import ReactDOM from 'react-dom/client';
import Providers from "./redux/provider";
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'antd/dist/antd.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Providers>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        theme="dark"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
      />
    </Providers>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
