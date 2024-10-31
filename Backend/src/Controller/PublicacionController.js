import { 
    getAllPublicaciones, 
    agregarNuevaPublicacion,
    actualizarPublicacion, 
    getRespuestaPorPublicacion, 
    agregarNuevaRespuesta, 
    getComentariosPorRespuesta, 
    agregarNuevoComentario,
    deletePublicacion,  
    deleteRespuesta,
    deleteComentario
} from "../Model/PublicacionModel.js"

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
        res.status(500).json({ message: 'Error al crear la publicación', error: error.message });
    }
};

const modificarPublicacion = async (req, res) => {
    const { id } = req.params;
    const { titulo, contenido, estado } = req.body;
    console.log('Datos que se van a actualizar', req.body);
    try {
        const resultado = await actualizarPublicacion({ id, titulo, contenido, estado });
        res.json(resultado);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la publicación', error: error.message });
    }
};

const removePublicacion = async (req, res) => {
    try {  
        await deletePublicacion(req.params.id);
        res.status(200).json({ message: 'Publicación eliminada con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la publicación', error: error.message });
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

const removeRespuesta = async (req, res) => {
    try {
        await deleteRespuesta(req.params.id);
        res.status(200).json({ message: 'Respuesta eliminada con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la respuesta', error: error.message });
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
    const { idRespuesta, idUsuario, contenido } = req.body;
    console.log('Datos de la pagina:', req.body);
    try {
        const resultado = await agregarNuevoComentario({idRespuesta, idUsuario, contenido});
        res.json(resultado);
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar el comentario', error: error.message });
    }
};

const removeComentario = async (req, res) => {
    try {
        await deleteComentario(req.params.id);
        res.status(200).json({ message: 'Comentario eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el Comentario', error: error.message });
    }
};

export { 
    getAllPublic, 
    agregarPublicacion, 
    getRespuestas, 
    agregarRespuesta, 
    getComentarios, 
    agregarComentario, 
    removePublicacion, 
    removeRespuesta,
    removeComentario,
    modificarPublicacion
};