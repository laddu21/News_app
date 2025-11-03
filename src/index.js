/**
 * Application Entry Point
 * 
 * This file initializes the React application and renders it to the DOM.
 * It wraps the App component with necessary providers:
 * - React.StrictMode for development warnings and checks
 * - BrowserRouter for client-side routing
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Create root element for React 18+
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the application
root.render(
  <React.StrictMode>
    {/* BrowserRouter enables routing throughout the app */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

