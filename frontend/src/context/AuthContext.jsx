import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [usuario, setUsuario] = useState(
        JSON.parse(localStorage.getItem("usuario"))
    );

    const [token, setToken] = useState(
        localStorage.getItem("token")
    );

    return (
        <AuthContext.Provider
            value={{
                usuario,
                setUsuario,
                token,
                setToken
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}