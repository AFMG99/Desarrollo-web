import axios from 'axios';

const API_URL = 'http://localhost:8085/';

export const getAllPublicaciones = async () => {
    const response = await axios.get(`${API_URL}publicaciones`);
    return response.data;
};

export const getRespuestasPorPublicacion = async (idPublicacion) => {
    const response = await axios.get(`${API_URL}respuestas?idPublicacion=${idPublicacion}`);
    return response.data;
};


export const loginUser = async (username, password) => {
    const response = await axios.post(`${API_URL}login`, { username, password });
    return response.data;
};

export const getPerfilData = async () => {
    // const token = localStorage.getItem('token');
    // const config = {
    //     headers: { Authorization: `Bearer ${token}` }
    // };

    const response = await axios.get(`${API_URL}perfil`);
    return response.data;
};

export const contrasena = async (username, nuevaContrasena) => {
    const response = await axios.post(`${API_URL}cambiar-contrasena`, { username, nuevaContrasena });
    return response.data;
};