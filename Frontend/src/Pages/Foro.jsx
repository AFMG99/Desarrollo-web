import React, { useState, useEffect } from 'react';
import {
    getAllPublicaciones,
    agregarPublicacion,
    getRespuestasPorPublicacion,
    agregarRespuesta,
    getComentarios,
    agregarComentario
} from '../Service/Services';
import FormularioPublicacion from '../components/Novedades/FormularioPublicacion';
import ListaPublicaciones from '../components/Novedades/ListaPublicaciones';

const Foro = () => {
    const [publicaciones, setPublicaciones] = useState([]);
    const [respuestasPorPublicacion, setRespuestasPorPublicacion] = useState({});
    const [comentariosPorRespuesta, setComentariosPorRespuesta] = useState({});

    useEffect(() => {
        fetchPublicaciones();
    }, []);


    const fetchPublicaciones = async () => {
        try {
            const response = await getAllPublicaciones();
            setPublicaciones(response);
        } catch (error) {
            console.error('Error al obtener las publicaciones:', error.response?.data?.message);
        }
    };

    const handleAgregarPublicacion = async (titulo, contenido) => {
        const idUsuario = localStorage.getItem('idUsuario');
        if (!idUsuario) {
            console.error("ID de usuario no encontrado");
            return;
        }

        const estado = 1;
        try {
            await agregarPublicacion({ titulo, contenido, idUsuario, estado });
            fetchPublicaciones();
        } catch (error) {
            console.error('Error al agregar publicación:', error.response?.data?.message);
        }
    };

    const handleRespuestas = async (idPublicacion) => {
        try {
            const response = await getRespuestasPorPublicacion(idPublicacion);
            setRespuestasPorPublicacion((prev) => ({
                ...prev,
                [idPublicacion]: response,
            }));
        } catch (error) {
            console.error('Error al obtener respuestas:', error);
        }
    };

    const handleAgregarRespuesta = async (contenido, idPublicacion) => {
        await agregarRespuesta(contenido, idPublicacion, 1);
        handleRespuestas(idPublicacion);
    };

    const handleVerComentarios = async (idRespuesta) => {
        const comentariosData = await getComentarios(idRespuesta);
        setComentariosPorRespuesta((prev) => ({
            ...prev,
            [idRespuesta]: comentariosData,
        }));
    };

    const handleAgregarComentario = async (contenido, idRespuesta) => {
        await agregarComentario(contenido, idRespuesta, 1);
        handleVerComentarios(idRespuesta);
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Foro Universitario</h1>
            <FormularioPublicacion onAgregarPublicacion={handleAgregarPublicacion} />
            <ListaPublicaciones
                publicaciones={publicaciones}
                onVerRespuestas={handleRespuestas}
                respuestasPorPublicacion={respuestasPorPublicacion}
                onAgregarRespuesta={handleAgregarRespuesta}
                onVerComentarios={handleVerComentarios}
                comentariosPorRespuesta={comentariosPorRespuesta}
                onAgregarComentario={handleAgregarComentario}
            />
        </div>
    );
};

export default Foro;