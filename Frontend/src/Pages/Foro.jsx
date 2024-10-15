import React, { useState } from 'react'
import PostForm from '../components/Novedades/PostForm'
import Post from '../components/Novedades/Post'

function Foro() {
  const [posts, setPosts] = useState([
    {
      author: 'Alejandro Magno',
      title: 'Consulta sobre interacción con los anuncios',
      content: '¿Alguien sabe cuáles son las políticas de interacción con los anuncios?',
      date: '2023-10-07T12:34:56',
    }
  ])
  
  const addPost = () => {
    setPosts([newPost, ...posts])
  }

  return (
    <div className='container mt-4'>
      <h2 className="text-center mb-4 text-success">Foro</h2>
      <PostForm addPost={addPost} />
      <ul className='list-unstyled'>
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </ul>
    </div>
  )
}

export default Foro
