import React, { useState } from 'react'

function PostForm({ addPost }) {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (title && content) {
            addPost({ title, content, author: "Usuario Anónimo", date: new Date() })
            setTitle('')
            setContent('')
        }
    }

    return (
        <form onSubmit={handleSubmit} className='bg-white p-3 rounded shadow mb-4'>
            <h2>Crear Nueva Publicación</h2>
            <div className='form-group'>
                <label htmlFor="post-title">Titulo:</label>
                <input
                    type="text"
                    id='post-title'
                    className='form-control'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div className='form-group'>
                <label htmlFor="post-content">Contenido:</label>
                <textarea
                    id="post-content"
                    className='form-control'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
            </div>
            <button type='submit' className='btn btn-success'>Publicar</button>
        </form>
    )
}

export default PostForm
