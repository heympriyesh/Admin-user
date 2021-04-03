import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ApiProvider } from './components/ApiContext'
ReactDOM.render(
  <BrowserRouter>
    <ApiProvider>
      <App />
    </ApiProvider>
  </BrowserRouter>
  ,
  document.getElementById('root')
);

