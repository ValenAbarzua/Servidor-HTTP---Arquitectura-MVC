import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../services/api";

function Register() {

    const navigate = useNavigate();

    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errores, setErrores] = useState({});

    const handleSubmit = async (e) => {

        e.preventDefault();

        setErrores({});

        try {

            await register(
                nombre,
                apellido,
                email,
                password
            );

            navigate("/", {
                state: {
                    mensaje:" Usuario registrado correctamente. Ya puedes iniciar sesion"
                }
            });

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
        <div className="auth-container">
            <div className="auth-card">
                <h1>Crear una cuenta</h1>
                <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />

                {
                    errores.nombre &&
                    <p className="error">{errores.nombre}</p>
                }

                <input
                    type="text"
                    placeholder="Apellido"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                />

                {
                    errores.apellido &&
                    <p className="error">{errores.apellido}</p>
                }

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
                    Crear cuenta
                </button>
            </form>

            <p>
                Ya tenes una cuenta?
                
            <Link to="/">
                Iniciar sesión
            </Link>
            </p>
            </div>
            
        </div>

    );

}

export default Register;