import express from 'express';
import { getAllPublic, agregarPublicacion, getRespuestas, agregarRespuesta, getComentarios, agregarComentario } from '../Controller/PublicacionController.js';
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

export default router;