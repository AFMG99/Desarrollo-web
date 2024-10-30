import { getAllUsuarios, cambiarContrasena, authenticateUser } from "../Model/LoginModel.js";
import jwt from 'jsonwebtoken';

const getAllUser = async (req, res) => {
    try {
        const usuarios = await getAllUsuarios();
        res.json(usuarios)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Por favor ingrese username y password' });
    }
    console.log('Datos recibidos:', username, password);
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
    console.log('Datos recibidos para cambio de contraseña:', username, nuevaContrasena);

    if (!username || !nuevaContrasena) {
        return res.status(400).json({ message: 'Por favor complete todos los campos.' });
    }

    try {
        const resultado = await cambiarContrasena(username, nuevaContrasena);
        res.json(resultado);
    } catch (error) {
        console.error('Error al cambiar contraseña:', error);
        return res.status(500).json({ message: 'Error interno del servidor.', error: error.message });
    }
};

export { getAllUser, login, contrasena }