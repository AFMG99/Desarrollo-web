import React from 'react'

function TablaEstadisticas() {
    return (
        <table className="table table-hover table-striped table-bordered mt-4">
            <thead className="table-dark">
                <tr>
                    <th scope="col">Fecha</th>
                    <th scope="col">Usuarios Nuevos</th>
                    <th scope="col">Total de Usuarios</th>
                    <th scope="col">Porcentaje de Crecimiento</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>01/09/2023</td>
                    <td>50</td>
                    <td>500</td>
                    <td>10%</td>
                </tr>
                <tr>
                    <td>08/09/2023</td>
                    <td>70</td>
                    <td>570</td>
                    <td>14%</td>
                </tr>
                <tr>
                    <td>15/09/2023</td>
                    <td>60</td>
                    <td>630</td>
                    <td>11%</td>
                </tr>
                <tr>
                    <td>22/09/2023</td>
                    <td>90</td>
                    <td>720</td>
                    <td>15%</td>
                </tr>
                <tr>
                    <td>30/09/2023</td>
                    <td>120</td>
                    <td>840</td>
                    <td>17%</td>
                </tr>
            </tbody>
        </table>
    )
}

export default TablaEstadisticas
