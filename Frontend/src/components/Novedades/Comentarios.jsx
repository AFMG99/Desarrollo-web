import React, { useState } from 'react';

const Comentarios = ({ comentarios, onAgregarComentario }) => {
  const [comentarioContenido, setComentarioContenido] = useState('');

  const handleSubmit = () => {
    if (comentarioContenido.trim()) {
      onAgregarComentario(comentarioContenido);
      setComentarioContenido('');
    }
  };

  return (
    <div className="comentarios-list mt-3">
      {comentarios.map((comentario) => (
        <div key={comentario.id} className="card mt-2">
          <div className="card-body">
            <div className='d-flex align-items-center mb-1'>
              <span><strong>{comentario.nombreUsuario}</strong></span>
              <span className='position-absolute top-0 end-0'>{comentario.fechaCreacion}</span>
            </div>
            <p className="card-text">{comentario.contenido}</p>
          </div>
        </div>
      ))}

      <div className="form-group mt-3">
        <textarea
          placeholder="Agregar Comentario"
          value={comentarioContenido}
          onChange={(e) => setComentarioContenido(e.target.value)}
          className="form-control"
        />
      </div>
      <button onClick={handleSubmit} className="btn btn-primary mt-2">Agregar Comentario</button>
    </div>
  );
};

export default Comentarios;