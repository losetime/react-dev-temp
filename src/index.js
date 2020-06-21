import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './style/global.css'

ReactDOM.render(
  // 注释掉的是DOM的严格模式，antd目前会报错
  // <React.StrictMode>
  // <App />
  // </React.StrictMode>,
  <App />,
  document.getElementById('root')
);
