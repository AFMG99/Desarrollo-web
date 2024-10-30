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
            console.error('Error al cargar el perfil', error);
        }
    };

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">nombreUsuario</th>
                        <th scope="col">Contraseña</th>
                        <th scope="col">Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario) => (
                        <tr>
                            <td>{usuario.id}</td>
                            <td>{usuario.nombreUsuario}</td>
                            <td>{usuario.contrasena}</td>
                            <td>{usuario.fechaCreacion}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default User;