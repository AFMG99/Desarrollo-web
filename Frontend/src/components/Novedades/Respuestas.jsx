import React, { useState } from 'react';
import Comentarios from './Comentarios';

const Respuestas = ({ 
  respuestas, 
  onAgregarRespuesta, 
  onVerComentarios, 
  comentariosPorRespuesta, 
  onAgregarComentario, 
  onEliminarRespuesta,
  onEliminarComentario,
  idPublicacion 
}) => {
  const [mostrarComentarios, setMostrarComentarios] = useState({});
  const [respuestaContenido, setRespuestaContenido] = useState('');

  const toggleComentarios = (idRespuesta) => {
    setMostrarComentarios((prev) => ({
      ...prev,
      [idRespuesta]: !prev[idRespuesta],
    }));
    if (!mostrarComentarios[idRespuesta]) {
      onVerComentarios(idRespuesta);
    }
  };

  const handleAgregarRespuesta = () => {
    if (respuestaContenido.trim()) {
      onAgregarRespuesta(respuestaContenido, idPublicacion);
      setRespuestaContenido('');
    }
  };

  return (
    <div className="respuestas-list mt-3">
      {respuestas.map((respuesta) => (
        <div key={respuesta.id} className="card mt-2">
          <div className="card-body">
            <div className='col-12 mb-1'>
              <img src={respuesta.imagenUsuario} alt="usuario" className='rounded-circle mr-2' width="30" />
              <strong className='mx-2'>{respuesta.nombreUsuario}</strong>
              <span className='position-absolute top-1 end-0 me-3'>{respuesta.fechaCreacion}</span>
            </div>
            <p className="card-text">{respuesta.contenido}</p>
            <button className="btn btn-secondary" onClick={() => toggleComentarios(respuesta.id)}>
              {mostrarComentarios[respuesta.id] ? 'Ocultar Comentarios' : 'Ver Comentarios'}
            </button>
            <button 
              className="btn btn-danger ms-2" 
              onClick={() => onEliminarRespuesta(respuesta.id, idPublicacion)}
            >
              Eliminar Respuesta
            </button>

            {mostrarComentarios[respuesta.id] && (
              <Comentarios
                comentarios={comentariosPorRespuesta[respuesta.id] || []}
                onAgregarComentario={(contenido) => onAgregarComentario(contenido, respuesta.id)}
                onEliminarComentario={(idComentario) => onEliminarComentario(idComentario, respuesta.id)}
              />
            )}
          </div>
        </div>
      ))}

      <div className="form-group mt-3">
        <textarea
          placeholder="Agregar Respuesta"
          value={respuestaContenido}
          onChange={(e) => setRespuestaContenido(e.target.value)}
          className="form-control"
        />
      </div>
      <button
        onClick={() => handleAgregarRespuesta(respuestas[0]?.idPublicacion)}
        className="btn btn-primary mt-2"
      >
        Agregar Respuesta
      </button>
    </div>
  );
};

export default Respuestas;