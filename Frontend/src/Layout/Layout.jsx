import React from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../components/Header/Header'
import Navegacion from '../components/Header/Navegacion'

const Layout = ({ children }) => {
    const location = useLocation();
    const hideHeaderAndNav = location.pathname === '/' || location.pathname === '/cambiar-contrasena';

    return (
        <>
            {!hideHeaderAndNav && <Header />}
            {!hideHeaderAndNav && <Navegacion />}
            {children}
        </>
    );
};

export default Layout;
