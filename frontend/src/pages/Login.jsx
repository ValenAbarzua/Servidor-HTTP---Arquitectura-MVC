import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { login } from "../services/api";
import { useAuth } from "../context/AuthContext";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errores, setErrores] = useState({});

    const navigate = useNavigate();
    const location = useLocation();

    const { setUsuario, setToken } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrores({});
        try {

            const datos = await login(email, password);

            localStorage.setItem("token", datos.token);
            localStorage.setItem("usuario", JSON.stringify(datos.usuario));

            setToken(datos.token);
            setUsuario(datos.usuario);

            navigate("/home");

        } catch (error) {
            if (error.errores) {
                const nuevosErrores = {};
                error.errores.forEach((e) => {
                    nuevosErrores[e.campo] = e.mensaje;
                });
            setErrores(nuevosErrores);
            } else {
            alert(error.message);
            }
        }
    };

    return (
        <div>

            <h1>Tu agenda de tareas personales</h1>

            {
                location.state?.mensaje && (
                    <div className="mensaje-exito">
                    {location.state.mensaje}
                    </div>
                )
            }

            <form onSubmit={handleSubmit}>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {
                    errores.email && 
                    <p className="error">{errores.email}</p>
                }

                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {
                    errores.password &&
                    <p className="error">{errores.password}</p>
                }

                <button type="submit">
                    Iniciar sesión
                </button>

            </form>

            <p>
                No tenes una cuenta?
                <Link to="/register">
                Crear una cuenta
                </Link>
            </p>

        </div>
    );
}

export default Login;