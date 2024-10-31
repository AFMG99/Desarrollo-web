import React, { useEffect, useState } from 'react';
import { getAllPublicaciones, getRespuestasPorPublicacion } from '../../Service/Services';

const Publicaciones = ({ searchTerm }) => {
    const [publicaciones, setPublicaciones] = useState([]);
    const [filteredPublicaciones, setFilteredPublicaciones] = useState([]);
    const [respuestas, setRespuestas] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchPublicaciones();
    }, []);

    useEffect(() => {
        const filtered = publicaciones.filter(pub =>
            pub.titulo.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPublicaciones(filtered);
    }, [searchTerm, publicaciones]);

    const fetchPublicaciones = async () => {
        try {
            const response = await getAllPublicaciones();
            setPublicaciones(response);
        } catch (err) {
            setError('Error al obtener las publicaciones');
        } finally {
            setLoading(false);
        }
    };

    const obtenerRespuestas = async (idPublicacion) => {
        try {
            const response = await getRespuestasPorPublicacion(idPublicacion);
            setRespuestas((prev) => ({
                ...prev,
                [idPublicacion]: response
            }));
        } catch (error) {
            console.error('Error al obtener respuestas:', error);
        }
    };

    if (loading) return <p>Cargando publicaciones...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container mt-4">
            {filteredPublicaciones.map((pub) => (
                <div key={pub.id} className='card mb-3'>
                    <div className="card-body">
                        <div className='d-flex align-items-center mb-3'>
                            <img src={pub.imagenUsuario} alt="usuario" className="rounded-circle mr-2" width="50" />
                            <span className='mx-2'><strong>{pub.nombreUsuario}</strong></span>
                            <span className='position-absolute top-0 end-0 m-3'>{pub.fechaCreacion}</span>
                        </div>
                        <p className='fs-1'><strong>{pub.titulo}</strong></p>
                        <p className='fs-3'>{pub.contenido}</p>
                        <button
                            className="btn btn-outline-secondary"
                            onClick={() => obtenerRespuestas(pub.id)}
                        >
                            Ver Respuestas
                        </button>
                        {respuestas[pub.id] && (
                            <ul className="mt-3">
                                {respuestas[pub.id].map((resp) => (
                                    <li key={resp.id} className='d-flex align-items-center mb-2'>
                                        <div className='row'>
                                            <div className='col-12'>
                                                <img src={resp.imagenUsuario} alt="usuario" className='rounded-circle mr-2' width="30" />
                                                <strong className='mx-2'>{resp.nombreUsuario}</strong>
                                            </div>
                                            <div className='col-12 my-3'>
                                                <p className='fs-5'>{resp.contenido}</p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Publicaciones;