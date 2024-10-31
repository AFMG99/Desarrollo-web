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
                    onClick={() => mostrarComponente('Usuarios')}
                    style={{cursor: 'pointer'}}
                >
                    Usuarios
                </a>
            </div>
        </div>
    )
}

export default Barra
