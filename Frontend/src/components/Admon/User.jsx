import React, { useEffect, useState } from 'react';
import '../../assets/css/estilos.css';
import { getAllUser } from '../../Service/Services';

const User = () => {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        fetchUsuarios();
    }, []);

    const fetchUsuarios = async () => {
        try {
            const data = await getAllUser();
            console.log('Datos obtenidos', data);
            setUsuarios(data);
        } catch (error) {
            console.error('Error al cargar usuarios', error);
        }
    };

    // const handleAdd = (id) => {
    //     console.log(`Insertar usuario con ID: ${id}`);
    // };
    
    const handleDelete = (id) => {
        console.log(`Eliminar usuario con ID: ${id}`);
        setUsuarios(usuarios.filter((usuario) => usuario.id !== id));
    };

    return (
        <div className="user-container">
            <h2 className="text-center my-4">Lista de Usuarios</h2>
            <table className="table table-hover table-bordered text-center">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Usuario</th>
                        <th scope="col">Contraseña</th>
                        <th scope="col">Fecha de Creación</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario, index) => (
                        <tr key={index}>
                            <td>{usuario.id}</td>
                            <td>{usuario.nombreUsuario}</td>
                            <td>{usuario.contrasena}</td>
                            <td>{new Date(usuario.fechaCreacion).toLocaleDateString()}</td>
                            <td>
                                {/* <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => handleAdd(usuario.id)}
                                >
                                    Añadir
                                </button> */}
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(usuario.id)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default User;
