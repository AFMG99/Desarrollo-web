import React, { useState } from 'react';
import Barra from '../components/Admon/Barra';
import Estadisticas from '../components/Admon/Estadisticas';
import imagen from '../../src/assets/img/graficoU.png';
import imagen2 from '../../src/assets/img/estadisticasU.gif';
import User from '../components/Admon/User'

const Admin = () => {
  const [componenteActual, setComponenteActual] = useState(null)

  const mostrarComponente = (componente) => {
    setComponenteActual(componente)
  }

  return (
    <div>
      <div className="row me-2">
        <div className="col-2 barra">
          <Barra mostrarComponente={mostrarComponente} />
        </div>
        <div className="col-10">
          <div
            data-bs-spy="scroll"
            data-bs-target="#simple-list-example"
            data-bs-offset="0"
            data-bs-smooth-scroll="true"
            className="scrollspy-example container-estadistica"
            tabIndex="0"
          >
            {componenteActual === 'Estadisticas' && (
              <Estadisticas imagen={imagen} imagen2={imagen2} />
            )}
            {componenteActual === 'Usuarios' && (
              <User />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
