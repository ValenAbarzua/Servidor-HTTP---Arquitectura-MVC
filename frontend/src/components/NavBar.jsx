import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function NavBar() {

    const { usuario, setUsuario, setToken } = useAuth();

    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("usuario");

        setUsuario(null);
        setToken(null);

        navigate("/");

    };

    return (

        <nav>

            <h2>Agenda de tareas personales</h2>

            <p>
                Hola {usuario?.nombre}!
            </p>

            <button onClick={logout}>
                Cerrar sesión
            </button>

        </nav>

    );

}

export default NavBar;