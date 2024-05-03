import Config from "../config";
import axios from "axios";


const httpInstance = axios.create({
    baseURL: Config.API_URL,
});

httpInstance.interceptors.request.use(
    async (config) => {
        const newConfig = {...config};
        return newConfig;
    },
    (error)=> {
        return Promise.reject(error);
    }
);

httpInstance.interceptors.request.use(
    async (response) => {
        return response;
    },
    (error)=> {
        return Promise.reject(error);
    }
)

export default httpInstance;