import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../Layout/Layout';
import ProtectedRoute from './ProtectedRoute';
import Login from '../Pages/Login';
import CambiarContrasena from '../Pages/CambiarContrasena';
import Principal from '../Pages/Principal';
import Novedades from '../Pages/Novedades';
import Foro from '../Pages/Foro';
import Publicaciones from '../components/Novedades/Publicaciones';
import Admin from '../Pages/Admin';

const NotFound = () => {
    return <h1>404 - Página no encontrada</h1>;
};

const token = localStorage.getItem('token');

const isAuthenticated = () => {
    if (!token) return false;
    try {
        const { exp } = JSON.parse(atob(token.split('.')[1]));
        return exp * 1000 > Date.now();
    } catch (e) {
        return false;
    }
};

const AppRouter = () => {
    return (
        <Router>
            <Layout>
                <Routes>
                    {/* Rutas públicas */}
                    <Route path="/" element={isAuthenticated() ? <Navigate to="/home" /> : <Login />} />
                    <Route path="/cambiar-contrasena" element={<CambiarContrasena />} />

                    {/* Rutas protegidas */}
                    <Route path="/home" element={<ProtectedRoute element={Principal} />} />
                    <Route path="/novedades" element={<ProtectedRoute element={Novedades} />} />
                    <Route path="/foro" element={<ProtectedRoute element={Foro} />} />
                    <Route path="/publicaciones" element={<ProtectedRoute element={Publicaciones} />} />
                    <Route path="/admin" element={<ProtectedRoute element={Admin} />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Layout>
        </Router>
    );
};

export default AppRouter;


