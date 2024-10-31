import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import '../assets/css/estilos.css';
import { contrasena } from '../Service/Services';

function CambiarContrasena() {
    const [correo, setCorreo] = useState('');
    const [nuevaContrasena, setNuevaContrasena] = useState('');
    const [tokenIngresado, setTokenIngresado] = useState('');
    const [tokenGenerado, setTokenGenerado] = useState(null);
    const [fase, setFase] = useState(1);
    const [username, setUsername] = useState('');
    const [mensaje, setMensaje] = useState('');

    const location = useLocation();
    const navigate = useNavigate();
    const { username: usernameFromLocation } = location.state || {};

    const correoPredeterminado = 'prueba@correo.com';

    const generarToken = () => {
        const nuevoToken = Math.floor(100000 + Math.random() * 900000);
        setTokenGenerado(nuevoToken);
        Swal.fire({
            icon: 'info',
            title: 'Token Generado',
            text: `Se ha enviado un token al correo ${correoPredeterminado}. (Token para prueba: ${nuevoToken})`,
            confirmButtonText: 'Aceptar'
        });
    };

    const handleVerificarCorreo = (e) => {
        e.preventDefault();
        if (correo === correoPredeterminado) {
            generarToken();
            setFase(2);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Correo Incorrecto',
                text: 'El correo ingresado no coincide con el registrado.',
                confirmButtonText: 'Aceptar'
            });
        }
    };

    const handleCambiarContrasena = (e) => {
        e.preventDefault();
        if (parseInt(tokenIngresado) === tokenGenerado) {
            handleSubmit(e);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Token Incorrecto',
                text: 'El token ingresado no es válido.',
                confirmButtonText: 'Aceptar'
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await contrasena(usernameFromLocation || username, nuevaContrasena);
            setMensaje(response.message);
            Swal.fire({
                icon: 'success',
                title: 'Contraseña Cambiada',
                text: 'La contraseña se ha cambiado exitosamente.',
                confirmButtonText: 'Aceptar'
            }).then(() => navigate('/'));
        } catch (error) {
            setMensaje(error.response?.data?.message || 'Error al cambiar la contraseña.');
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: mensaje,
                confirmButtonText: 'Aceptar'
            });
        }
    };

    return (
        <div className='container-fluid recuperar-page'>
            <div className="recuperar-container">
                <h2 className="text-center mb-4 text-success">Cambiar Contraseña</h2>
                
                {fase === 1 && (
                    <form className="recuperar-form" onSubmit={handleVerificarCorreo}>
                        <div className='form-group'>
                            <label>Correo:</label>
                            <input
                                type='email'
                                className='form-control'
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                                required
                            />
                        </div>
                        <button type='submit' className='btn btn-success w-100 mb-3'>Enviar Token</button>
                    </form>
                )}

                {fase === 2 && (
                    <form className="recuperar-form" onSubmit={handleCambiarContrasena}>
                        <div className='form-group'>
                            <label>Usuario:</label>
                            <input
                                type='text'
                                className='form-control'
                                value={usernameFromLocation || username}
                                onChange={(e) => setUsername(e.target.value)}
                                readOnly={!!usernameFromLocation}
                                required
                            />
                        </div>
                        <div className='form-group my-3'>
                            <label>Token:</label>
                            <input
                                type='text'
                                className='form-control'
                                value={tokenIngresado}
                                onChange={(e) => setTokenIngresado(e.target.value)}
                                required
                            />
                        </div>
                        <div className='form-group my-3'>
                            <label>Nueva Contraseña:</label>
                            <input
                                type='password'
                                className='form-control'
                                value={nuevaContrasena}
                                onChange={(e) => setNuevaContrasena(e.target.value)}
                                required
                            />
                        </div>
                        <button type='submit' className='btn btn-success w-100 mb-3'>Cambiar Contraseña</button>
                    </form>
                )}
                
                <p className='text-center'><a onClick={() => navigate('/')} className="text-success">Volver a Login</a></p>
            </div>
        </div>
    );
}

export default CambiarContrasena;
