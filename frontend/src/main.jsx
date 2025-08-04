import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css';
import LogReg from './LandPage';
import AdminCreate from './CrearAdministrador';
import AdminRegister from './RegistrarAdministrador';
import DashBoard from './Dashboard';
import CrearTarea from './CrearTarea';
import VistaAdmin from './VistaAdministrador'

const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogReg />} />
        <Route path="/admin-create" element={<AdminCreate />} />
        <Route path="/admin-register" element={<AdminRegister />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/crear-tarea" element={<CrearTarea />} />
        <Route path="/vista-admin" element={<VistaAdmin />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);