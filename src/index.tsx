import React from 'react';
import ReactDOM from 'react-dom/client';
import Users from './components/Users';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Users />
  </React.StrictMode>,
);

reportWebVitals();
