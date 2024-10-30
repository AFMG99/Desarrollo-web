import { getConnection, sql } from "../Config/Connection.js";

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
};

const agregarNuevaPublicacion = async (publicacion) => {
    await getConnection();

    const { titulo, contenido, idUsuario, estado } = publicacion;

    console.log('Datos de la publicación', publicacion);
    try {
        const resultado = await new sql.Request()
            .input('titulo', sql.VarChar, titulo)
            .input('contenido', sql.VarChar, contenido)
            .input('idUsuario', sql.Int, idUsuario)
            .input('fechaCreacion', sql.DateTime, new Date())
            .input('estado', sql.Bit, estado)
            .query(`INSERT INTO Publicaciones (titulo, contenido, idUsuario, fechaCreacion, estado) 
                OUTPUT INSERTED.* 
                VALUES (@titulo, @contenido, @idUsuario, @fechaCreacion, @estado)`);

        return resultado.recordset[0];
    } catch (error) {
        throw new Error('Error al insertar la nueva publicación: ' + error.message);
    }
};

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

const agregarNuevaRespuesta = async (respuesta) => {
    const { idPublicacion, idUsuario, contenido } = respuesta;
    try {
        await getConnection();
        const resultado = await new sql.Request()
            .input('idPublicacion', sql.Int, idPublicacion)
            .input('idUsuario', sql.Int, idUsuario)
            .input('contenido', sql.VarChar, contenido)
            .input('fechaCreacion', sql.DateTime, new Date())
            .query(
                'INSERT INTO Respuestas (idPublicacion, idUsuario, contenido, fechaCreacion) OUTPUT INSERTED.* VALUES (@idPublicacion, @idUsuario, @contenido, @fechaCreacion)'
            );

        return resultado.recordset[0];
    } catch (error) {
        throw new Error('Error al insertar la nueva respuesta: ' + error.message);
    }
};

const getComentariosPorRespuesta = async (idRespuesta) => {
    try {
        const request = new sql.Request();
        request.input('idRespuesta', sql.Int, idRespuesta);

        const resultado = await request.query(
            `SELECT c.id, c.contenido, c.fechaCreacion, u.nombreUsuario
             FROM Comentarios c
             JOIN Usuarios u ON c.idUsuario = u.id
             WHERE c.idRespuesta = @idRespuesta`
        );
        return resultado.recordset;
    } catch (error) {
        throw error;
    }
};

const agregarNuevoComentario = async () => {
    try {
        await getConnection();

        const resultado = await new sql.Request()
            .input('contenido', sql.varchar, contenido)
            .input('idRespuesta', sql.Int, idRespuesta)
            .input('idUsuario', sql.Int, idUsuario)
            .input('fechaCreacion', sql.DateTime, new Date())
            .query('INSERT INTO Comentarios (contenido, idRespuesta, idUsuario, fechaCreacion) OUTPUT INSERTED.* VALUES (@contenido, @idRespuesta, @idUsuario, @fechaCreacion)')

        return resultado.recordset[0];
    } catch (error) {
        throw new Error('Error al insertar el nuevo comentario: ' + error.message);
    }
};

export { getAllPublicaciones, agregarNuevaPublicacion, getRespuestaPorPublicacion, agregarNuevaRespuesta, getComentariosPorRespuesta, agregarNuevoComentario }