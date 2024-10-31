import React from 'react';
import Publicaciones from '../components/Novedades/Publicaciones';
import { useLocation } from 'react-router-dom';

function Novedades() {
  const location = useLocation();
  const searchTerm = new URLSearchParams(location.search).get('search') || '';

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 text-success">Novedades</h2>
      <Publicaciones searchTerm={searchTerm} />
    </div>
  );
}

export default Novedades;