import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component }) => {
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

    return isAuthenticated() ? <Component /> : <Navigate to="/" />;
};

export default ProtectedRoute;
