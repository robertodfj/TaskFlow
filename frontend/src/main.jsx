import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css';
import LogReg from './Login-Register'
import AdminCreate from './Admin-create';
import AdminRegister from './Admin-Register';
import DashBoard from './Dashboard'

const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashBoard />} />
        
      </Routes>
    </BrowserRouter>
  </StrictMode>
);