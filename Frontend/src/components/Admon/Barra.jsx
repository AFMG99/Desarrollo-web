import React from 'react'

function Barra({ mostrarComponente }) {
    return (
        <div className="col-md-4 container-barra">
            <div id="simple-list-example" className="list-group">
                <a 
                    className="list-group-item list-group-item-action" 
                    onClick={() => mostrarComponente('Estadisticas')}
                    style={{cursor: 'pointer'}}
                >
                    Estadísticas
                </a>

                <a 
                    className="list-group-item list-group-item-action" 
                    onClick={() => mostrarComponente('NumerosAnuncios')}
                    style={{cursor: 'pointer'}}
                >
                    Número de Anuncios
                </a>

                <a 
                    className="list-group-item list-group-item-action" 
                    onClick={() => mostrarComponente('Interacciones')}
                    style={{cursor: 'pointer'}}
                >
                    Interacciones
                </a>

                <a 
                    className="list-group-item list-group-item-action" 
                    onClick={() => mostrarComponente('TiempoPagina')}
                    style={{cursor: 'pointer'}}
                >
                    Tiempo en la página
                </a>
                
                <a 
                    className="list-group-item list-group-item-action" 
                    onClick={() => mostrarComponente('RetornoUsuarios')}
                    style={{cursor: 'pointer'}}
                >
                    Retorno de usuarios
                </a>
                
                <a 
                    className="list-group-item list-group-item-action" 
                    onClick={() => mostrarComponente('AnunciosDestacados')}
                    style={{cursor: 'pointer'}}
                >
                    Anuncios destacados
                </a>
            </div>
        </div>
    )
}

export default Barra
