import { sql } from "../Config/Connection.js";

const getRespuestaPorPublicacion = async (idPublicacion) => {
    try {
        const request = new sql.Request();
        request.input('idPublicacion', sql.Int, idPublicacion);
        
        const resultado = await request.query(
            `SELECT r.id, r.contenido, u.nombreUsuario, u.imagenUsuario, r.idUsuario
            FROM Respuestas r
            JOIN Usuarios u ON r.idUsuario = u.id
            WHERE r.idPublicacion = @idPublicacion`
        );
        return resultado.recordset;
    } catch (error) {
        throw error;
    }
};

export { getRespuestaPorPublicacion }