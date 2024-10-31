import React, { useEffect, useState } from 'react';
import '../../src/assets/css/estilos.css';
import imagen from '../../src/assets/img/programacion.jpg';
import icono1 from '../../src/assets/img/fire.png';
import icono2 from '../../src/assets/img/escucha.png';
import icono3 from '../../src/assets/img/busqueda.png';
import { useNavigate } from 'react-router-dom';
import { getAllPublicaciones } from '../Service/Services';

const Principal = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [titles, setTitles] = useState([]);
  const [filteredTiltles, setFilteredTitles] = useState([]);
  const [selectOpen, setSelectOpen] = useState(false);

  useEffect(() => {
    const fetchTitle = async () => {
      const publicaciones = await getAllPublicaciones();
      setTitles(publicaciones.map(pub => pub.titulo));
      setFilteredTitles(publicaciones.map(pub => pub.titulo));
    }
    fetchTitle();
  }, []);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filtered = titles.filter(title =>
      title.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredTitles(filtered);
    setSelectOpen(true);
  };

  const handleSearch = () => {
    navigate(`/novedades?search=${searchTerm}`);
  };

  const handleOptionClik = (title) => {
    setSearchTerm(title);
    setSelectOpen(false);
    navigate(`/novedades?search=${title}`);
  };

  return (
    <div>
      <div className="busqueda">
        <div style={{ position: 'relative', width: '100%' }}>
          <input
            className='input-busqueda'
            type="text"
            placeholder="Busqueda"
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={() => setSelectOpen(true)}
          />
          {selectOpen && (
            <ul
              className='custom-select-dropdown'
              onMouseLeave={() => setSelectOpen(false)}
            >
              {filteredTiltles.map((title, index) => (
                <li
                  key={index}
                  onClick={() => handleOptionClik(title)}
                >
                  {title}
                </li>
              ))}
              {filteredTiltles.length === 0 && (
                <li className='dropdown-item'>Resultado no encontrado</li>
              )}
            </ul>
          )}
        </div>
        <button type="button" onClick={handleSearch}>
          <img className='imgB' src={icono3} alt="Busqueda" />
        </button>
      </div>

      <div className="imagen">
        <img src={imagen} alt="programacion" />
      </div>

      <div className="contenido">
        <div
          className="cart"
          onClick={() => navigate('/novedades')}
          style={{ cursor: 'pointer' }}
        >
          <img src={icono1} alt="Novedades" />
          <h3>Novedades</h3>
          <p>Vea contenido reciente de la comunidad</p>
        </div>
        <div
          className="cart"
          onClick={() => navigate('/foro')}
          style={{ cursor: 'pointer' }}
        >
          <img src={icono2} alt="Foro" />
          <h3>Foro</h3>
          <p>Conecta con la comunidad académica</p>
        </div>
      </div>
    </div>
  );
}

export default Principal;