import React from 'react'

function GraficosUsuario({ imagen }) {
  return (
    <div className='text-center'>
      <img src={imagen} alt="Gráfico de usuarios nuevos" className="img-fluid" />
    </div>
  )
}

export default GraficosUsuario
