import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        if (isTokenExpired(token)) {
            clearSession()
            window.location.href = "/";
            return Promise.reject(new Error("Token expired"));
        }
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            clearSession()
            window.location.href = "/";
        }
        return Promise.reject(error);
    }
);
function clearSession() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
}

export function isTokenExpired(token) {
    try{
        const payload = JSON.parse(atob(token.split('.')[1]));
        console.log();
        return payload.exp * 1000 < Date.now();
        // return true;
    }catch (e){
        return true;
    }
}
export default api;