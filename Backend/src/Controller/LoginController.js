import { getAllLogin, cambiarContrasena } from "../Model/LoginModel.js";
import { getConnection, sql } from "../Config/Connection.js";
import jwt from 'jsonwebtoken';

const getLogin = async (req, res) => {
    try {
        const login = await getAllLogin()
        res.json(login)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Por favor ingrese username y password' });
    }

    console.log('Datos recibidos:', username, password);

    try {
        await getConnection();

        const data = await new sql.Request()
            .input('username', sql.VarChar, username)
            .input('password', sql.VarChar, password)
            .query('SELECT * FROM Usuarios WHERE nombreUsuario = @username AND contrasena = @password');

        console.log('Resultado de la consulta:', data);

        if (data.recordset.length > 0) {
            const token = jwt.sign({ username }, 'Stack', {
                expiresIn: '3m'
            });

            return res.json({
                message: 'Inicio de sesión exitoso',
                token,
                data: data.recordset,
            });
        } else {
            return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
        }
    } catch (error) {
        console.error('Error en la consulta SQL:', error);
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

export { getLogin, login, contrasena }