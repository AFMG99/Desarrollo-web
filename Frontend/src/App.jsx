import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Pages/Login';
import Publicaciones from './components/Novedades/Publicaciones';
import Novedades from './Pages/Novedades';
import Principal from './Pages/Principal';
import Navegacion from './components/Header/Navegacion';
import Header from './components/Header/Header';
import Registro from './Pages/Registro';
import Foro from './Pages/Foro';
import Main from './Pages/Main';
import CambiarContrasena from './Pages/CambiarContrasena';
import User from './components/Novedades/User';

const NotFound = () => {
    return <h1>404 - Página no encontrada</h1>;
};

const App = () => {
    return (
        <Router>
            <MainContent />
        </Router>
    );
};

const MainContent = () => {
    const location = useLocation();
    return (
        <>
            {location.pathname !== '/' && location.pathname !== '/registro' && location.pathname !== '/cambiar-contrasena' && <Header />}
            {location.pathname !== '/' && location.pathname !== '/registro' && location.pathname !== '/cambiar-contrasena' && <Navegacion />}
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/registro" element={<Registro />} />
                <Route path="/cambiar-contrasena" element={<CambiarContrasena />} />
                <Route path='/home' element={<Principal />} />
                <Route path='/novedades' element={<Novedades />} />
                <Route path='/foro' element={<Foro />} />
                <Route path='/publicaciones' element={<Publicaciones />} />
                <Route path='/user' element={<User/>} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
};

export default App;
