import { getConnection, sql } from "../Config/Connection.js";

const getAllLogin = async () => {
    try {
        const resultado = await sql.query('SELECT * FROM Usuarios');
        return resultado.recordset
    } catch (error) {
        throw error
    }
}

const cambiarContrasena = async (username, nuevaContrasena) => {
    await getConnection();

    console.log('Iniciando proceso de cambio de contraseña para:', username);

    const usuario = await new sql.Request()
        .input('username', sql.VarChar, username)
        .query('SELECT * FROM Usuarios WHERE nombreUsuario = @username');

    console.log('Resultado de búsqueda de usuario:', usuario);

    if (usuario.recordset.length === 0) {
        throw new Error('Usuario no encontrado.');
    }

    const idUsuario = usuario.recordset[0].id;
    console.log('Insertando en HistorialContrasena para el usuario ID:', idUsuario);

    await new sql.Request()
        .input('idUsuario', sql.Int, idUsuario)
        .input('contrasenaAnterior', sql.VarChar, usuario.recordset[0].contrasena)
        .input('fechaCambio', sql.DateTime, new Date())
        .query('INSERT INTO HistorialContrasenas (idUsuario, contrasenaAnterior, fechaCambio) VALUES (@idUsuario, @contrasenaAnterior, @fechaCambio)');

    console.log('Historial actualizado. Actualizando nueva contraseña para ID:', idUsuario);

    await new sql.Request()
        .input('idUsuario', sql.Int, idUsuario)
        .input('nuevaContrasena', sql.VarChar, nuevaContrasena)
        .query('UPDATE Usuarios SET contrasena = @nuevaContrasena WHERE id = @idUsuario');

    console.log('Contraseña actualizada correctamente para el usuario ID:', idUsuario);
    return { message: 'Contraseña cambiada exitosamente.' };
};

export { getAllLogin, cambiarContrasena };