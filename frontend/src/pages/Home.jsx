import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { obtenerTareas } from "../services/api";

import NavBar from "../components/NavBar";
import FormularioTarea from "../components/FormularioTarea";
import ListaTareas from "../components/ListaTareas";
import Filtro from "../components/Filtro";
import Paginacion from "../components/Paginacion";

function Home() {

    const { token } = useAuth();
    const [tareas, setTareas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [tareaEditando, setTareaEditando] = useState(null);
    const [filtroEstado, setFiltroEstado] = useState("");
    const [orden, setOrden] = useState("asc");
    const [paginaActual, setPaginaActual] =useState(1);
    const [paginasTotales, setPaginasTotales]= useState(1);

    useEffect(() => {
        cargarTareas();
    }, [filtroEstado, orden, paginaActual]);

    useEffect(() => {
        setPaginaActual(1);
    }, [filtroEstado, orden]);

    async function cargarTareas() {
        try {
            const datos = await obtenerTareas(token, filtroEstado, orden, paginaActual);
            setTareas(datos.tareas);
            setPaginasTotales(datos.paginasTotales);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <p>Cargando...</p>;
    }

    return (
        <div className="container">
            <div className="left-column">
                <FormularioTarea
                token={token}
                cargarTareas={cargarTareas}
                tareaEditando={tareaEditando}
                setTareaEditando={setTareaEditando}
                />
            </div>
            
            <Filtro
                filtroEstado={filtroEstado}
                setFiltroEstado={setFiltroEstado}

                orden={orden}
                setOrden={setOrden}
            />

            <div className="right-column">
                <ListaTareas
                tareas={tareas}
                cargarTareas={cargarTareas}
                tareaEditando={tareaEditando}
                setTareaEditando={setTareaEditando}
                />
                <Paginacion 
                paginaActual={paginaActual}
                paginasTotales={paginasTotales}
                setPaginaActual={setPaginaActual}
                />
            </div>

            <NavBar />
        </div>
    );
}

export default Home;