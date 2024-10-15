import express from 'express';
import { getAllPublic } from '../Controller/PublicacionController.js';
import { getRespuestas } from '../Controller/RespuestaController.js';
import { getAllUser } from '../Controller/UsuarioController.js'
import { getLogin, login, contrasena } from '../Controller/LoginController.js';
import { getPerfil } from '../Controller/PerfilController.js';

const router = express.Router();

router.get('/publicaciones', getAllPublic);  
router.get('/respuestas', getRespuestas);
router.get('/usuarios', getAllUser);
router.get('/getlogin', getLogin);
router.get('/perfil', getPerfil);
router.post('/login', login);
router.post('/cambiar-contrasena', contrasena);

export default router;