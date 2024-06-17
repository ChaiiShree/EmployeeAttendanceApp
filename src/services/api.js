import axios from 'axios';

const API_URL = 'http://localhost:8090'; // Change to your PocketBase URL

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const login = async (department, login_id, password) => {
    try {
        const response = await api.post('/api/collections/users/auth-with-password', {
            identity: login_id,
            password: password,
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

export const punchIn = async (data) => {
    try {
        const response = await api.post('/api/collections/attendance/records', data);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

export const punchOut = async (id, data) => {
    try {
        const response = await api.patch(`/api/collections/attendance/records/${id}`, data);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

export const getAttendanceData = async (userId) => {
    try {
        const response = await api.get(`/api/collections/attendance/records?filter=(user_id='${userId}')`);
        return response.data.items;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

export const getManagerData = async (managerId) => {
    try {
        const response = await api.get(`/api/collections/attendance/records?filter=(user.manager_id='${managerId}')`);
        return response.data.items;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

export const getAllAttendanceData = async () => {
    try {
        const response = await api.get('/api/collections/attendance/records');
        return response.data.items;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};
