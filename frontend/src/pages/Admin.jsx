import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import NavBar from "../components/NavBar";
import Filtro from "../components/Filtro";
import Paginacion from "../components/Paginacion";
import { obtenerTodasLasTareas } from "../services/api";
import ListaTareas from "../components/ListaTareas";

function Admin() {

    const { token } = useAuth();
    const [tareas, setTareas] = useState([]);
    const [filtroEstado, setFiltroEstado] = useState("");
    const [orden, setOrden] = useState("asc");
    const [paginaActual, setPaginaActual] = useState(1);
    const [paginasTotales, setPaginasTotales] = useState(1);

    useEffect(() => {
        cargarTareas();
    }, [filtroEstado, orden, paginaActual]);

    async function cargarTareas() {
        try {
            const datos = await obtenerTodasLasTareas(
                token,
                filtroEstado,
                orden,
                paginaActual
            );

            setTareas(datos.tareas);
            setPaginasTotales(datos.paginasTotales);

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <NavBar />
            <h1> Panel Administrador</h1>

            <Filtro
                filtroEstado={filtroEstado}
                setFiltroEstado={setFiltroEstado}
                orden={orden}
                setOrden={setOrden}
            />

            <ListaTareas
                tareas={tareas}
                cargarTareas={cargarTareas}
            />

            <Paginacion
                paginaActual={paginaActual}
                paginasTotales={paginasTotales}
                setPaginaActual={setPaginaActual}
            />
            <ListaTareas
                tareas={tareas}
                cargarTareas={cargarTareas}
                esAdmin={true}
            />

        </>

    );

}

export default Admin;