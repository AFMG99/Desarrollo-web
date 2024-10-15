import React from 'react'
import TablaEstadisticas from './TablaEstadisticas'
import GraficoUsuarios from './GraficosUsuario'

function Estadisticas({imagen, imagen2}) {
    return (
        <div id='simple-list-item-1'>
            <h4 className='text-center'>Estadísticas de Ingreso de Usuarios</h4>
            <p className="text-center">
                A continuación se presentan las estadísticas de ingreso de usuarios en el último mes.
            </p>
            <div className="text-center mb-4">
                <img src={imagen2} alt="Estadísticas" className="img-fluid" />
            </div>

            <h5>Resumen General</h5>
            <TablaEstadisticas />

            <h5 className="mt-4">Gráfico de Usuarios Nuevos</h5>
            <GraficoUsuarios imagen={imagen} />

            <h5 className="mt-4">Análisis de Tendencias</h5>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam optio, deleniti laboriosam possimus eaque tenetur veniam! Voluptas, quis labore. Inventore eum eaque expedita hic eligendi.</p>
        </div>
    )
}

export default Estadisticas
