import { getConnection, sql } from "../Config/Connection.js";

const getAllPublicaciones = async () => {
    try {
        const resultado = await sql.query(
            `SELECT p.id, p.titulo, p.contenido, u.nombreUsuario, u.imagenUsuario, p.idUsuario, p.fechaCreacion
            FROM Publicaciones p
            JOIN Usuarios u ON p.idUsuario = u.id`
        );
        return resultado.recordset
    } catch (error) {
        throw error
    }
};

const agregarNuevaPublicacion = async (publicacion) => {
    await getConnection();
    const { titulo, contenido, idUsuario, estado } = publicacion;
    try {
        const resultado = await new sql.Request()
            .input('titulo', sql.VarChar, titulo)
            .input('contenido', sql.VarChar, contenido)
            .input('idUsuario', sql.Int, idUsuario)
            .input('fechaCreacion', sql.DateTime, new Date())
            .input('estado', sql.Bit, estado)
            .query(`INSERT INTO Publicaciones (titulo, contenido, idUsuario, fechaCreacion, estado) 
                OUTPUT INSERTED.* VALUES (@titulo, @contenido, @idUsuario, @fechaCreacion, @estado)`
            );

        return resultado.recordset[0];
    } catch (error) {
        throw new Error('Error al insertar la nueva publicación: ' + error.message);
    }
};

const actualizarPublicacion = async (publicacion) => {
    await getConnection();
    const { id, titulo, contenido, estado } = publicacion;
    console.log('Datos a modificar en la base de datos', publicacion);
    try {
        await new sql.Request()
            .input('id', sql.Int, id)
            .input('titulo', sql.VarChar, titulo)
            .input('contenido', sql.Text, contenido)
            .input('estado', sql.Bit, estado)
            .query(
                `UPDATE Publicaciones
                SET titulo = @titulo, 
                    contenido = @contenido,
                    estado = @estado
                WHERE id = @id`
            );
    } catch (error) {
        throw new Error('Error al actualizar la publicación: ' + error.message);
    }
    
};

const deletePublicacion = async (id) => {
    await getConnection();
    try {
        await new sql.Request()
            .input('idPublicacion', sql.Int, id)
            .query(`DELETE FROM Publicaciones WHERE id = @idPublicacion`);
    } catch (error) {
        throw new Error('Error al eliminar la publicación: ' + error.message);
    }
};

const getRespuestaPorPublicacion = async (idPublicacion) => {
    try {
        const request = new sql.Request();
        request.input('idPublicacion', sql.Int, idPublicacion);

        const resultado = await request.query(
            `SELECT r.id, r.contenido, u.nombreUsuario, u.imagenUsuario, r.idUsuario, r.fechaCreacion
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
                `INSERT INTO Respuestas (idPublicacion, idUsuario, contenido, fechaCreacion) 
                OUTPUT INSERTED.* VALUES (@idPublicacion, @idUsuario, @contenido, @fechaCreacion)`
            );

        return resultado.recordset[0];
    } catch (error) {
        throw new Error('Error al insertar la nueva respuesta: ' + error.message);
    }
};

const deleteRespuesta = async (id) => {
    await getConnection();
    try {
        await new sql.Request()
            .input('idRespuesta', sql.Int, id)
            .query(`DELETE FROM Respuestas WHERE id = @idRespuesta`)
    } catch (error) {
        throw new Error('Error al eliminar la Respuesta: ' + error.message);
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

const agregarNuevoComentario = async (comentario) => {
    await getConnection();
    const { idRespuesta, idUsuario, contenido } = comentario;
    try {
        const resultado = await new sql.Request()
            .input('idRespuesta', sql.Int, idRespuesta)
            .input('idUsuario', sql.Int, idUsuario)
            .input('contenido', sql.Text, contenido)
            .input('fechaCreacion', sql.DateTime, new Date())
            .query(
                `INSERT INTO Comentarios (idRespuesta, idUsuario, contenido, fechaCreacion) OUTPUT INSERTED.* VALUES (@idRespuesta, @idUsuario, @contenido, @fechaCreacion)`
            );
        return resultado.recordset[0];
    } catch (error) {
        throw new Error('Error al insertar el nuevo comentario: ' + error.message);
    }
};

const deleteComentario = async (id) => {
    await getConnection();
    try {
        await new sql.Request()
            .input('idComentario', sql.Int, id)
            .query(`DELETE FROM Comentarios WHERE id = @idComentario`);
    } catch (error) {
        throw new Error('Error al eliminar el Comentario: ' + error.message);
    }
};

export { 
    getAllPublicaciones, 
    agregarNuevaPublicacion, 
    getRespuestaPorPublicacion, 
    agregarNuevaRespuesta, 
    getComentariosPorRespuesta, 
    agregarNuevoComentario, 
    deletePublicacion, 
    deleteRespuesta,
    deleteComentario,
    actualizarPublicacion 
};