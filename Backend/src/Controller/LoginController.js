import { getAllUsuarios, cambiarContrasena, authenticateUser } from "../Model/LoginModel.js";
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const getAllUser = async (req, res) => {
    try {
        const usuarios = await getAllUsuarios();
        const encryptedUsers = usuarios.map(usuario => {
            const hash = crypto.createHash('sha1').update(usuario.contrasena).digest('hex');
            return {
                ...usuario,
                contrasena: hash,
            };
        });
        res.json(encryptedUsers);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const data = await authenticateUser(username, password);
        console.log('Resultado de la consulta:', data);
        if (data.length > 0) {
            const token = jwt.sign({ username }, 'Stack', { expiresIn: '1h'});
            const idUsuario = data[0].id;
            return res.json({
                message: 'Inicio de sesión exitoso',
                token,
                idUsuario,
                data
            });
        } else {
            return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Error interno en el servidor', error: error.message });
    }
};

const contrasena = async (req, res) => {
    const { username, nuevaContrasena } = req.body;
    try {
        const resultado = await cambiarContrasena(username, nuevaContrasena);
        res.json(resultado);
    } catch (error) {
        console.error('Error al cambiar contraseña:', error);
        return res.status(500).json({ message: 'Error interno del servidor.', error: error.message });
    }
};

export { getAllUser, login, contrasena }