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
        <>
            <NavBar />

            <FormularioTarea
                token={token}
                cargarTareas={cargarTareas}
            />

            <ListaTareas
                tareas={tareas}
                cargarTareas={cargarTareas}
            />
        </>
    );
}

export default Home;