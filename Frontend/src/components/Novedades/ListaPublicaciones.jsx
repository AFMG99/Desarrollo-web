import React, { useState } from 'react';
import Respuestas from './Respuestas';

const ListaPublicaciones = ({ publicaciones, onVerRespuestas, respuestasPorPublicacion, onAgregarRespuesta, onVerComentarios, comentariosPorRespuesta, onAgregarComentario }) => {
    const [mostrarRespuestas, setMostrarRespuestas] = useState({});

    const toggleRespuestas = (idPublicacion) => {
        setMostrarRespuestas((prevState) => ({
            ...prevState,
            [idPublicacion]: !prevState[idPublicacion],
        }));
        if (!mostrarRespuestas[idPublicacion]) {
            onVerRespuestas(idPublicacion);
        }
    };

    return (
        <div className="publicaciones-list">
            {publicaciones.map((publicacion) => (
                <div key={publicacion.id} className="card mb-4">
                    <div className="card-body">
                        <div className='d-flex align-items-center mb-3'>
                            <img src={publicacion.imagenUsuario} alt="usuario" className="rounded-circle mr-2" width="50" />
                            <span className='mx-2'><strong>{publicacion.nombreUsuario}</strong></span>
                            <span className='position-absolute top-0 end-0 m-3'>{publicacion.fechaCreacion}</span>
                        </div>
                        <h3 className="card-title">{publicacion.titulo}</h3>
                        <p className="card-text">{publicacion.contenido}</p>
                        <button
                            className="btn btn-primary"
                            onClick={() => toggleRespuestas(publicacion.id)}
                        >
                            {mostrarRespuestas[publicacion.id] ? 'Ocultar Respuestas' : 'Ver Respuestas'}
                        </button>

                        {mostrarRespuestas[publicacion.id] && (
                            <Respuestas
                                respuestas={respuestasPorPublicacion[publicacion.id] || []}
                                onAgregarRespuesta={(contenido) => onAgregarRespuesta(contenido, publicacion.id)}
                                onVerComentarios={onVerComentarios}
                                comentariosPorRespuesta={comentariosPorRespuesta}
                                onAgregarComentario={onAgregarComentario}
                            />
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ListaPublicaciones;