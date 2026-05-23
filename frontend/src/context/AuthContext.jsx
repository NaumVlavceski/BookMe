import {createContext, useContext, useState} from "react";
import {login as loginService, logout as logoutService} from "../services/AuthService";
import {isTokenExpired} from "../services/api.js"
const AuthContext = createContext(null);

export function AuthProvider({children}) {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (!token || isTokenExpired(token)){
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            return null;
        }
        return saved ? JSON.parse(saved) : null;
    });
    const login = async (email, password) => {
        const data = await loginService(email, password);

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify({
            id: data.id,
            name: data.name,
            email: data.email,
            role: data.role,
        }));

        setUser(data);
        return data;
    }
    const logout = async () => {
        logoutService();
        setUser(null);
        window.redirect("/");
    };

    return (
        <AuthContext.Provider value={{user, login, logout, isLoggedIn: !!user}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within the AuthProvider");
    return context;
}
