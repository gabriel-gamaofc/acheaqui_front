import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async'; 
import AppRoutes from './routes/AppRoutes.jsx';

import './styles/theme.css';
import './styles/global.css';
import './styles/responsive.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider> 
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);