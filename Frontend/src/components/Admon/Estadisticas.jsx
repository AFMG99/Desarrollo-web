import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
    getAllPublicaciones,
    getRespuestasPorPublicacion,
    removePublicacion,
} from '../../Service/Services';
import Swal from 'sweetalert2';
import StatCard from './StatCard';
import PublicationsTable from './PublicationsTable';

const fetchData = async (fetchFunction, ...params) => {
    try {
        return await fetchFunction(...params);
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
};

const AdminPanel = () => {
    const [publicaciones, setPublicaciones] = useState([]);
    const [respuestas, setRespuestas] = useState({});
    const [showDetalles, setShowDetalles] = useState(null);

    useEffect(() => {
        fetchPublicaciones();
    }, []);

    const fetchPublicaciones = async () => {
        const data = await fetchData(getAllPublicaciones);
        if (data) {
            const formattedData = data.map(pub => ({
                ...pub,
                fecha: new Date(pub.fechaCreacion).toLocaleDateString(),
            }));
            setPublicaciones(formattedData);
        }
    };

    const estadisticas = useMemo(() => {
        const totalPublicaciones = publicaciones.length;
        const publicacionesActivas = publicaciones.filter(pub => pub.estado === 1).length;
        const totalRespuestas = Object.values(respuestas).flat().length;
        return { totalPublicaciones, publicacionesActivas, totalRespuestas };
    }, [publicaciones, respuestas]);

    const verDetallesPublicacion = useCallback(async (idPublicacion) => {
        const data = await fetchData(getRespuestasPorPublicacion, idPublicacion);
        if (data) {
            setRespuestas(prev => ({ ...prev, [idPublicacion]: data }));
            setShowDetalles(idPublicacion);
        }
    }, []);

    const eliminarPublicacion = useCallback(async (id) => {
        const confirm = await Swal.fire({
            title: '¿Estás seguro?',
            text: "Esta acción no se puede deshacer",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar'
        });
        if (confirm.isConfirmed) {
            await fetchData(removePublicacion, id);
            fetchPublicaciones();
        }
    }, []);

    return (
        <div className="bg-light min-vh-100">
            <div className="container-fluid py-4">
                <div className="row mb-4">
                    <div className="col-12">
                        <h1 className="h3 mb-0 text-primary">Panel de Administración</h1>
                    </div>
                </div>
                <div className="row mb-4 g-3">
                    <StatCard
                        icon="bi bi-file-post"
                        title="Total Publicaciones"
                        value={estadisticas.totalPublicaciones}
                        subtitle={`Última actualización: ${new Date().toLocaleDateString()}`}
                    />
                    <StatCard
                        icon="bi bi-chat-dots"
                        title="Total Respuestas"
                        value={estadisticas.totalRespuestas}
                        subtitle={`Promedio: ${(estadisticas.totalPublicaciones > 0) ? (estadisticas.totalRespuestas / estadisticas.totalPublicaciones).toFixed(1) : 0} por publicación`}
                    />
                </div>
                <div className="card shadow-sm">
                    <div className="card-body">
                        <PublicationsTable
                            publicaciones={publicaciones}
                            respuestas={respuestas}
                            onViewDetails={verDetallesPublicacion}
                            onDelete={eliminarPublicacion}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;