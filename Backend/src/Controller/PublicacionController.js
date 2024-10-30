import { getAllPublicaciones, agregarNuevaPublicacion, getRespuestaPorPublicacion, agregarNuevaRespuesta, getComentariosPorRespuesta, agregarNuevoComentario  } from "../Model/PublicacionModel.js"

const getAllPublic = async ( req, res) => {
    try {
        const publicaciones = await getAllPublicaciones()
        res.json(publicaciones)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

const agregarPublicacion = async (req, res) => {
    const { titulo, contenido, idUsuario, estado } = req.body;
    try {
        const resultado = await agregarNuevaPublicacion({titulo, contenido, idUsuario, estado});
        res.json(resultado);
    } catch (error) {
        console.error('Error al ingresar Publicación:', error);
        res.status(500).json({ message: 'Error al crear la publicación', error: error.message });
    }
};

const getRespuestas = async (req, res) => {
    const { idPublicacion } = req.query
    try {
        const respuestas = await getRespuestaPorPublicacion(idPublicacion)
        res.json(respuestas)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

const agregarRespuesta = async (req, res) => {
    const { idPublicacion, idUsuario, contenido } = req.body;

    console.log('Datos recibidos:', req.body);

    try {
        const resultado = await agregarNuevaRespuesta({idPublicacion, idUsuario, contenido});
        res.json(resultado);
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar la respuesta', error: error.message });
    }
};

const getComentarios = async (req, res) => {
    const { idRespuesta } = req.query;
    try {
        const comentarios = await getComentariosPorRespuesta(idRespuesta);
        res.json(comentarios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const agregarComentario = async (req, res) => {
    const { contenido, idRespuesta, idUsuario } = req.body;

    try {
        const resultado = await agregarNuevoComentario(contenido, idRespuesta, idUsuario);
        res.status(201).json({ message: 'Comentario agregado exitosamente', data: resultado });
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar el comentario', error: error.message });
    }
};

export { getAllPublic, agregarPublicacion, getRespuestas, agregarRespuesta, getComentarios, agregarComentario }