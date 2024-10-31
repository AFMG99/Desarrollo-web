import React from 'react';

const PublicationsTable = ({ publicaciones, respuestas, onToggleStatus, onViewDetails, onDelete }) => {
    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Título</th>
                    <th>Fecha</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {publicaciones.map((publicacion) => (
                    <tr key={publicacion.id}>
                        <td>{publicacion.id}</td>
                        <td>{publicacion.titulo}</td>
                        <td>{publicacion.fecha}</td>
                        <td>{publicacion.estado === 0 ? 'Activa' : 'Inactiva'}</td>
                        <td>
                            <button
                                className="btn btn-sm btn-primary me-2"
                                onClick={() => onToggleStatus(publicacion)}
                            >
                                {publicacion.estado === 0 ? 'Desactivar' : 'Activar'}
                            </button>
                            <button
                                className="btn btn-sm btn-info me-2"
                                onClick={() => onViewDetails(publicacion.id)}
                            >
                                Ver Respuestas
                            </button>
                            <button
                                className="btn btn-sm btn-danger"
                                onClick={() => onDelete(publicacion.id)}
                            >
                                Eliminar
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default PublicationsTable;
