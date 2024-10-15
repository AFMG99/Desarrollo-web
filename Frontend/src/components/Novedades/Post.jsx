import React from 'react'
import Comment from './Comment'

function Post({ post }) {
  return (
    <li className='bg-white p-3 rounded shadow mb-4'>
        <div className='d-flex justify-content-between'>
            <span className='font-weight-bold text-success'>{post.author}</span>
            <span className='text-muted'>{new Date(post.date).toLocaleString()}</span>
        </div>
        <h3>{post.title}</h3>
        <p>{post.content}</p>
        <div className='d-flex gap-2'>
            <button className='btn btn-outline-secondary btn-sm'>Me gusta</button>
            <button className='btn btn-outline-secondary btn-sm'>Comentar</button>
            <button className='btn btn-outline-secondary btn-sm'>Compartir</button>
        </div>
        <div className='mt-3'>
            <Comment author="María Magdalena García" content="¡Gran publicación!" />
        </div>
    </li>
  )
}

export default Post
