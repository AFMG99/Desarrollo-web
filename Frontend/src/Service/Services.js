import axios from 'axios';

const API_URL = 'http://localhost:8085/';

// modulos de Publicaciones
export const getAllPublicaciones = async () => {
    const response = await axios.get(`${API_URL}publicaciones`);
    return response.data;
};

export const agregarPublicacion = async (publicacion) => {
    const response = await axios.post(`${API_URL}publicacion`, publicacion);
    return response.data;
}

export const removePublicacion = async (idPublicacion) => {
    const response = await axios.delete(`${API_URL}publicacion/${idPublicacion}`);
    return response.data;
}

export const modificarPublicacion = async (publicacion) => {
    const { id, titulo, contenido, estado } = publicacion;
    const response = await axios.put(`${API_URL}publicacion/${id}`, { titulo, contenido, estado });
    return response.data;
};

// modulos de Respuestas
export const getRespuestasPorPublicacion = async (idPublicacion) => {
    const response = await axios.get(`${API_URL}respuestas?idPublicacion=${idPublicacion}`);
    return response.data;
};

export const agregarRespuesta = async (respuesta) => {
    const response = await axios.post(`${API_URL}respuesta`, respuesta);
    return response.data;
}

export const removeRespuesta = async (idRespuesta) => {
    const response = await axios.delete(`${API_URL}respuesta/${idRespuesta}`);
    return response.data;
}

// modulos de Comentarios
export const getComentarios = async (idRespuesta) => {
    const response = await axios.get(`${API_URL}comentarios?idRespuesta=${idRespuesta}`);
    return response.data;
}

export const agregarComentario = async (comentario) => {
    const response = await axios.post(`${API_URL}comentario`, comentario);
    return response.data;
}

export const removeComentario = async (idComentario) => {
    const response = await axios.delete(`${API_URL}comentario/${idComentario}`);
    return response.data;
}

// modulos de Login, Usuarios y Perfil
export const loginUser = async (username, password) => {
    const response = await axios.post(`${API_URL}login`, { username, password });
    return response.data;
};

export const getPerfilData = async (idUsuario) => {
    const response = await axios.get(`${API_URL}perfil?idUsuario=${idUsuario}`);
    return response.data;
};

export const contrasena = async (username, nuevaContrasena) => {
    const response = await axios.post(`${API_URL}cambiar-contrasena`, { username, nuevaContrasena });
    return response.data;
};

export const getAllUser = async () => {
    const response = await axios.get(`${API_URL}usuarios`);
    return response.data;
}