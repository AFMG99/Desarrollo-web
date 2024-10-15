import { sql } from "../Config/Connection.js";

const getAllPublicaciones = async () => {
    try {
        const resultado = await sql.query(
            `SELECT p.id, p.titulo, p.contenido, u.nombreUsuario, u.imagenUsuario, p.idUsuario, p.fechaCreacion
                FROM Publicaciones p
                JOIN Usuarios u ON p.idUsuario = u.id`
        )
        return resultado.recordset
    } catch (error) {
        throw error
    }
}

export { getAllPublicaciones }