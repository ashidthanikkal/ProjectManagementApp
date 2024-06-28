import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import ContextShare from './services/ContextShare';
import AuthContext from './services/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContext>
        <ContextShare>
          <App />
          </ContextShare>
      </AuthContext>
    </BrowserRouter>
  </React.StrictMode>
);

