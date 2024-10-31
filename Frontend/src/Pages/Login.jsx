import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../Service/Services';
import '../assets/css/estilos.css';
import imagen from '../../src/assets/img/Logo_web.png';
import Swal from 'sweetalert2';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            Swal.fire({
                icon: 'warning',
                title: 'Campos incompletos',
                text: 'Por favor, complete todos los campos',
                confirmButtonText: 'Aceptar'
            });
            return;
        }

        try {
            const result = await loginUser(username, password);
            console.log(result);
            if (result.token) {
                localStorage.setItem('token', result.token);
                localStorage.setItem('username', username);
                if (result.idUsuario) {
                    localStorage.setItem('idUsuario', result.idUsuario);
                }
                setErrorMessage('');
                Swal.fire({
                    icon: 'success',
                    title: 'Inicio de sesión exitoso',
                    text: '¡Bienvenido!',
                    confirmButtonText: 'Aceptar'
                }).then(() => navigate('/home'));
            } else {
                setErrorMessage('Usuario o contraseña incorrectos');
            }
        } catch (error) {
            setErrorMessage('Usuario o contraseña incorrectos.');
        }
    };

    const handleNewPassword = (e) => {
        e.preventDefault();
        if (!username) {
            Swal.fire({
                icon: 'info',
                title: 'Usuario requerido',
                text: 'Por favor, digita el usuario.',
                confirmButtonText: 'Aceptar'
            });
            return;
        }
        navigate('/cambiar-contrasena', { state: { username } });

    }

    return (
        <div className="container-fluid login-page">
            <div className="row vh-100">
                <div className="col-md-6 d-md-flex login-image">
                    <img src={imagen} alt="Oficina" />
                </div>

                <div className="col-md-6 d-flex align-items-center justify-content-center div">
                    <div className="login-box">
                        <h2 className="text-center text-success">Welcome to TdeAAds!</h2>

                        <form className='form' onSubmit={handleLogin}>
                            <div className="mb-3 user">
                                <label htmlFor="username" className="form-label">Usuario:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    placeholder="Usuario"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>

                            <div className="mb-3 pass">
                                <label htmlFor="password" className="form-label">Contraseña:</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    placeholder="Contraseña"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

                            <button type="submit" className="btn btn-success w-100 mb-3">Login</button>

                            <div className="d-flex justify-content-center">
                                <a onClick={handleNewPassword} className='text-success linkNewPassword'>¿Olvidaste tu Contraseña?</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;