import { sql } from "../Config/Connection.js";

const getAllPerfil = async (idUsuario) => {
    try {
        const request = new sql.Request();
        request.input('idUsuario', sql.Int, idUsuario);

        const resultado = await request.query(`
            SELECT u.nombreUsuario, u.imagenUsuario, r.nombreRol, r.descripcion 
            FROM Usuarios u 
	        JOIN UsuarioRoles ur ON ur.idUsuario = u.id
	        JOIN Roles r ON r.id = ur.idRol
            WHERE u.id = @idUsuario
        `);

        console.log('Resultado de la consulta:', resultado);

        return resultado.recordset;
    } catch (error) {
        throw error
    }
}

export { getAllPerfil };