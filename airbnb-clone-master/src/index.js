// src/index.js

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { StateProvider } from './context/StateProvider';
import './styles/global.css'; // Import the global CSS file

// Get the root element where your React app will be mounted
const container = document.getElementById('root');

// Create a root with createRoot
const root = createRoot(container);

// Render the App component wrapped in the StateProvider
root.render(
  <StateProvider>
    <App />
  </StateProvider>
);
