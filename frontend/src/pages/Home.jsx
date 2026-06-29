import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Home() {

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
        <div>

            <h1>Task Manager</h1>

            <h2>
                Hola {usuario?.nombre}!
            </h2>

            <button onClick={logout}>
                Cerrar sesión
            </button>

        </div>
    );
}

export default Home;