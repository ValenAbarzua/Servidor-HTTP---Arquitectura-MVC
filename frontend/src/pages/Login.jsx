import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/api";
import { useAuth } from "../context/AuthContext";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const { setUsuario, setToken } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const datos = await login(email, password);

            localStorage.setItem("token", datos.token);
            localStorage.setItem("usuario", JSON.stringify(datos.usuario));

            setToken(datos.token);
            setUsuario(datos.usuario);

            navigate("/home");

        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>

            <h1>Tu agenda de tareas personales</h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">
                    Iniciar sesión
                </button>

            </form>

            {error && <p>{error}</p>}

            <Link to="/register">
                Crear una cuenta
            </Link>

        </div>
    );
}

export default Login;