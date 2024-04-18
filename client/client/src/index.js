import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"
import { LoggedInProvider } from "./Logged-In-Context.js";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <Router>
    <LoggedInProvider>
      <App/>
    </LoggedInProvider>
  </Router>

);


reportWebVitals();
