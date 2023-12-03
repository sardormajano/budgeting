import React from 'react';
import { App}  from './App';
import './App.css';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const container = document.getElementById('app');
const root = createRoot(container);
root.render(
  <HashRouter>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <App />
    </LocalizationProvider>
  </HashRouter>
);
