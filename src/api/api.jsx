import axios from "axios";

const url = "https://34.92.8.4:9097/";

const api = axios.create({
    baseURL: url,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config) => {
        const accessToken = JSON.parse(localStorage.getItem("accessToken"));
        if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
