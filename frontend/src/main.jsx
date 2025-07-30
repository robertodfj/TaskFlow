import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css';
import LogReg from './LandPage'
import AdminCreate from './CrearAdministrador';
import AdminRegister from './RegistrarAdministrador';
import DashBoard from './Dashboard'
import CrearTarea from './CrearTarea';

const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CrearTarea />} />
        
      </Routes>
    </BrowserRouter>
  </StrictMode>
);