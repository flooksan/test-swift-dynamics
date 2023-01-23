import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom"
import { UserDBContextProvider } from './context/contextAPI';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserDBContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </UserDBContextProvider>
  
  
);


