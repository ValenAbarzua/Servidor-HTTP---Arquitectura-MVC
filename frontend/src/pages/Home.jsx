import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { obtenerTareas } from "../services/api";

import NavBar from "../components/NavBar";
import FormularioTarea from "../components/FormularioTarea";
import ListaTareas from "../components/ListaTareas";

function Home() {

    const { token } = useAuth();
    const [tareas, setTareas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [tareaEditando, setTareaEditando] = useState(null);

    useEffect(() => {
        cargarTareas();
    }, []);

    async function cargarTareas() {
        try {
            const datos = await obtenerTareas(token);
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