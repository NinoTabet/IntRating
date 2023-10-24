import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const apiUrl = process.env.REACT_APP_API_URL;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App apiUrl={apiUrl} />
  </React.StrictMode>
);

