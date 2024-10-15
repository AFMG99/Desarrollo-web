import { sql } from "../Config/Connection.js";

const getAllPerfil = async () => {
    try {
        const resultado = await sql.query(`
            SELECT u.nombreUsuario, u.imagenUsuario, r.nombreRol, r.descripcion 
            FROM Usuarios u 
	        JOIN UsuarioRoles ur ON ur.idUsuario = u.id
	        JOIN Roles r ON r.id = ur.idRol
        `);
        return resultado.recordset
    } catch (error) {
        throw error
    }
}

export { getAllPerfil };