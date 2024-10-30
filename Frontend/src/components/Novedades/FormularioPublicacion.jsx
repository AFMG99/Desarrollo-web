import React, { useState } from 'react';

const FormularioPublicacion = ({ onAgregarPublicacion }) => {
    const [titulo, setTitulo] = useState('');
    const [contenido, setContenido] = useState('');

    const handleSubmit = () => {
        if (titulo.trim() && contenido.trim()) {
            onAgregarPublicacion(titulo, contenido);
            setTitulo('');
            setContenido('');
        }
    };

    return (
        <div className="mb-4">
            <h2>Crear Nueva Publicación</h2>
            <div className="form-group mb-3">
                <label htmlFor="post-title" className="form-label">Título:</label>
                <input
                    type="text"
                    className="form-control"
                    id="post-title"
                    placeholder="Título de la publicación"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="post-content" className="form-label">Contenido:</label>
                <textarea
                    className="form-control"
                    id="post-content"
                    rows="4"
                    placeholder="Contenido de la publicación"
                    value={contenido}
                    onChange={(e) => setContenido(e.target.value)}
                ></textarea>
            </div>
            <button onClick={handleSubmit} className="btn btn-success">Publicar</button>
        </div>
    );
};

export default FormularioPublicacion;