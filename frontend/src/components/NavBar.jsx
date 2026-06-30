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

        <nav className="navbar">

            <div className="navbar-left">

                <h2>📋 Task Manager</h2>

                <p>
                    Hola, <strong>{usuario?.nombre}</strong> 👋
                </p>

            </div>

            <div className="navbar-right">

                <span
                    className={
                        usuario?.rol === "admin"
                            ? "badge-admin"
                            : "badge-user"
                    }
                >
                    {usuario?.rol === "admin"
                        ? "👑 Administrador"
                        : "👤 Cliente"}
                </span>

                {
                    usuario?.rol === "admin" && (

                        <button
                            className="btn-admin"
                            onClick={() => navigate("/admin")}
                        >
                            Panel Admin
                        </button>

                    )
                }

                <button
                    className="btn-logout"
                    onClick={logout}
                >
                    Cerrar sesión
                </button>

            </div>

        </nav>

    );

}

export default NavBar;