import React, { useEffect, useState } from 'react';
import { getPerfilData } from '../../Service/Services';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [perfil, setPerfil] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPerfil();
  }, []);

  const fetchPerfil = async () => {
    try {
      const data = await getPerfilData();
      setPerfil(data[1]); 
    } catch (error) {
      console.error('Error al cargar el perfil', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/'); 
  };

  if (!perfil) {
    return <div>Loading....</div>;
  }

  return (
    <header className="header d-flex align-items-center justify-content-between px-4 py-3 shadow-sm">
      <h1 className="header-title">TdeAAds!</h1>
      <div className="perfil d-flex align-items-center">
        <button
          className="btn"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#perfilOffcanvas"
          aria-controls="perfilOffcanvas"
        >
          <img
            src={perfil.imagenUsuario}
            alt="Usuario"
            className="perfil-imagen rounded-circle"
            style={{ width: '50px', height: '50px' }}
          />
        </button>
      </div>

      <div className="offcanvas offcanvas-end" tabIndex="-1" id="perfilOffcanvas" aria-labelledby="perfilOffcanvasLabel">
        <div className="offcanvas-header">
          <h5 id="perfilOffcanvasLabel" className='text-center'>Perfil de Usuario</h5>
          <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body text-center">
          <img
            src={perfil.imagenUsuario}
            alt="Usuario"
            className="rounded-circle mb-3"
            style={{ width: '100px', height: '100px' }}
          />
          <h2 className="perfil-nombre">{perfil.nombreUsuario}</h2>
          <p><strong>Rol:</strong> {perfil.nombreRol}</p>
          <p><strong>Descripción:</strong> {perfil.descripcion}</p>
          <button className="btn btn-danger mt-4" onClick={handleLogout}>Cerrar Sesión</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
