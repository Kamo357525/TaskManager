import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import {getCookie, setCookie} from "../helpers/cookie";
import useAuth from "../hooks/useAuth";

const axiosInstance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
    }
});

axiosInstance.interceptors.request.use(
    (config: AxiosRequestConfig): any => {
        const token = getCookie('Token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
axiosInstance.interceptors.response.use(

    function (response) {
        return response;
    },

    async function (error) {
        try {
            const originalRequest = error.config;
            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;

                const res = await Auth.upDateToken({
                    "refreshToken": getCookie('RefreshToken')
                });
                const {accessToken, refreshToken} = res.data.data;
                setCookie('Token', accessToken, 1);
                setCookie('RefreshToken', refreshToken, 2);
                return await axiosInstance(originalRequest);
            }
        } catch (error) {
            const {signOut}=useAuth();
            signOut();
        }
        return Promise.reject(error);
    },
);

export class Auth {
    static userLogin = (formData) => axiosInstance.post('/auth/login', formData);
    static userRegister = (formData) => axiosInstance.post('/auth/register', formData);
    static updatePassword = (formData) => axiosInstance.patch('/auth/password', formData);
    static upDateToken = (refreshToken) => axiosInstance.post('/auth/refresh-token', refreshToken)
}

export class Tasks {
    static getTasks = (data) => axiosInstance.get(`/tasks?take=12&skip=${data.skip}&dueDate=${data.dueDate}${data.status ? `&status=${data.status}` : ''}`);
    static createTasks = (formData) => axiosInstance.post('/tasks', formData);
    static deleteTasks = (id) => axiosInstance.delete('/tasks/' + id);
    static updateTasks = (formData) => axiosInstance.patch('/tasks/' + formData.id, formData);
    static getTasksId = (id) => axiosInstance.get(`/tasks/${id}`);
}

export class Users {
    static getUserProfile = (token) => axiosInstance.get('/users/profile', token);
    static updateUser = (formData) => axiosInstance.patch('/users/profile', formData,{
        headers:{
            'Content-Type': 'multipart/form-data',
        }
    });
}

export default axiosInstance;
