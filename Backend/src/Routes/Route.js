import express from 'express';
import { 
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
} from '../Controller/PublicacionController.js';
import { getAllUser, login, contrasena } from '../Controller/LoginController.js';
import { getPerfil } from '../Controller/PerfilController.js';

const router = express.Router();

router.get('/publicaciones', getAllPublic);  
router.get('/respuestas', getRespuestas);
router.get('/usuarios', getAllUser);
router.get('/perfil', getPerfil);
router.get('/comentarios', getComentarios);

router.post('/login', login);
router.post('/publicacion', agregarPublicacion);
router.post('/respuesta', agregarRespuesta);
router.post('/comentario', agregarComentario);
router.post('/cambiar-contrasena', contrasena);

router.delete('/publicacion/:id', removePublicacion);
router.delete('/respuesta/:id', removeRespuesta);
router.delete('/comentario/:id', removeComentario);

router.put('/publicacion/:id', modificarPublicacion);

export default router;