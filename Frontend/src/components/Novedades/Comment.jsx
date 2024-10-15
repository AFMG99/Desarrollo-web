import React from 'react'

function Comment({ author, content }) {
    return (
        <div className='bg-light p-2 rounded mt-2'>
            <div className='d-flex justify-content-between'>
                <span className="font-weight-bold text-success">{author}</span>
                <span className="text-muted">Hace 1 hora</span>
            </div>
            <p>{content}</p>
        </div>
    )
}

export default Comment
