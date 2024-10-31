import React, { useState, useEffect } from 'react';
import {
    getAllPublicaciones,
    agregarPublicacion,
    getRespuestasPorPublicacion,
    agregarRespuesta,
    getComentarios,
    agregarComentario,
    removePublicacion,
    removeRespuesta,
    removeComentario
} from '../Service/Services';
import FormularioPublicacion from '../components/Novedades/FormularioPublicacion';
import ListaPublicaciones from '../components/Novedades/ListaPublicaciones';
import Swal from 'sweetalert2'; 

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
            const formattedData = response.map(publicacion => {
                const [date, time] = publicacion.fechaCreacion.split('T');
                const formatedTime = time.split('.')[0];
                return {
                    ...publicacion,
                    fechaCreacion: `${date} ${formatedTime}`,
                };
            });
            setPublicaciones(formattedData);
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

    const handleEliminarPublicacion = async (idPublicacion) => {
        console.log('ID de publicación a eliminar:', idPublicacion);
        const confirm = await Swal.fire({
            title: '¿Estás seguro?',
            text: "Esta acción no se puede deshacer",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar'
        });
        if (confirm.isConfirmed) {
            console.log('Eliminando publicación con ID:', idPublicacion);
            try {
                await removePublicacion(idPublicacion);
                fetchPublicaciones();
                Swal.fire('Eliminado', 'La publicación ha sido eliminada.', 'success');
            } catch (error) {
                console.error('Error al eliminar la publicación:', error);
                Swal.fire('Error', 'No se pudo eliminar la publicación.', 'error');
            }
        }
    };    

    const handleRespuestas = async (idPublicacion) => {
        try {
            const response = await getRespuestasPorPublicacion(idPublicacion);
            const formattedData = response.map(respuesta => {
                const [date, time] = respuesta.fechaCreacion.split('T');
                const formatedTime = time.split('.')[0];
                return {
                    ...respuesta,
                    fechaCreacion: `${date} ${formatedTime}`,
                }; 
            });
            setRespuestasPorPublicacion((prev) => ({
                ...prev,
                [idPublicacion]: formattedData,
            }));
        } catch (error) {
            console.error('Error al obtener respuestas:', error);
        }
    };

    const handleAgregarRespuesta = async (contenido, idPublicacion) => {
        const idUsuario = localStorage.getItem('idUsuario');
        if (!idUsuario) {
            console.error("ID de usuario no encontrado");
            return;
        }

        await agregarRespuesta({ contenido, idPublicacion, idUsuario });
        handleRespuestas(idPublicacion);
    };

    const handleEliminarRespuesta = async (idRespuesta, idPublicacion) => {
        const confirm = await Swal.fire({
            title: '¿Estás seguro?',
            text: "Esta acción no se puede deshacer",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar'
        });
        if (confirm.isConfirmed) {
            console.log('ID publicación:', idPublicacion);
            try {
                await removeRespuesta(idRespuesta);
                handleRespuestas(idPublicacion);
                Swal.fire('Eliminado', 'La respuesta ha sido eliminada.', 'success');
            } catch (error) {
                Swal.fire('Error', 'No se pudo eliminar la respuesta.', 'error');
            }
        }
    };

    const handleVerComentarios = async (idRespuesta) => {
        const comentariosData = await getComentarios(idRespuesta);
        const formattedData = comentariosData.map(comentario => {
            const [date, time] = comentario.fechaCreacion.split('T');
            const formatedTime = time.split('.')[0];
            return {
                ...comentario,
                fechaCreacion: `${date} ${formatedTime}`,
            }; 
        });
        setComentariosPorRespuesta((prev) => ({
            ...prev,
            [idRespuesta]: formattedData,
        }));
    };

    const handleAgregarComentario = async (contenido, idRespuesta) => {
        const idUsuario = localStorage.getItem('idUsuario');
        if (!idUsuario) {
            console.error("ID de usuario no encontrado");
            return;
        }
        await agregarComentario({ contenido, idRespuesta, idUsuario });
        handleVerComentarios(idRespuesta);
    };

    const handleEliminarComentario = async (idComentario, idRespuesta) => {
        const confirm = await Swal.fire({
            title: '¿Estás seguro?',
            text: "Esta acción no se puede deshacer",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar'
        });
        if (confirm.isConfirmed) {
            console.log('ID respuesta:', idRespuesta);
            try {
                await removeComentario(idComentario);
                handleVerComentarios(idRespuesta);
                Swal.fire('Eliminado', 'El comentario ha sido eliminada.', 'success');
            } catch (error) {
                Swal.fire('Error', 'No se pudo eliminar el comentario.', 'error');
            }
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4 text-success">Foro Universitario</h1>
            <FormularioPublicacion onAgregarPublicacion={handleAgregarPublicacion} />
            <ListaPublicaciones
                publicaciones={publicaciones}
                onVerRespuestas={handleRespuestas}
                onEliminarPublicacion={handleEliminarPublicacion}
                respuestasPorPublicacion={respuestasPorPublicacion}
                onAgregarRespuesta={handleAgregarRespuesta}
                onEliminarRespuesta={handleEliminarRespuesta}
                onVerComentarios={handleVerComentarios}
                comentariosPorRespuesta={comentariosPorRespuesta}
                onAgregarComentario={handleAgregarComentario}
                onEliminarComentario={handleEliminarComentario}
            />
        </div>
    );
};

export default Foro;