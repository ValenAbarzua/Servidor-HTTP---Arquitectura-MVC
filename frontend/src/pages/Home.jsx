import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { obtenerTareas } from "../services/api";

import NavBar from "../components/NavBar";
import FormularioTarea from "../components/FormularioTarea";
import ListaTareas from "../components/ListaTareas";
import Filtro from "../components/Filtro";

function Home() {

    const { token } = useAuth();
    const [tareas, setTareas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [tareaEditando, setTareaEditando] = useState(null);
    const [filtroEstado, setFiltroEstado] = useState("");
    const [orden, setOrden] = useState("asc");

    useEffect(() => {
        cargarTareas();
    }, [filtroEstado, orden]);

    async function cargarTareas() {
        try {
            const datos = await obtenerTareas(token, filtroEstado, orden);
            setTareas(datos.tareas);
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
            </div>

            <NavBar />
        </div>
    );
}

export default Home;