import axios from "axios";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_BACK_END_URL}/api`,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

// 1. THE FIXED REQUEST INTERCEPTOR (Attaches the token)
api.interceptors.request.use(
    (config) => {
        const auth = localStorage.getItem("auth");
        if (auth) {
            const parsedAuth = JSON.parse(auth);
            const token = parsedAuth.jwtToken || parsedAuth.jwt || parsedAuth.token; 
            
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            } else {
                console.warn("No token found in auth object during API request");
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 2. THE RESTORED RESPONSE INTERCEPTOR (Handles real expirations safely)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            const isLoginRequest = error.config.url.includes('/auth/signin');
            if (!isLoginRequest) {
                window.dispatchEvent(new CustomEvent('session-expired'));
            }
        }
        return Promise.reject(error);
    }
);

export default api;