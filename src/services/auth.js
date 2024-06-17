import AsyncStorage from '@react-native-async-storage/async-storage';
import { login as apiLogin } from './api';

const USER_KEY = 'USER_KEY';
const TOKEN_KEY = 'TOKEN_KEY';

export const login = async (department, login_id, password) => {
    try {
        const response = await apiLogin(department, login_id, password);
        const { user, token } = response;

        // Store user data and token in AsyncStorage
        await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
        await AsyncStorage.setItem(TOKEN_KEY, token);

        return user;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const logout = async () => {
    try {
        await AsyncStorage.removeItem(USER_KEY);
        await AsyncStorage.removeItem(TOKEN_KEY);
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getCurrentUser = async () => {
    try {
        const user = await AsyncStorage.getItem(USER_KEY);
        return user ? JSON.parse(user) : null;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem(TOKEN_KEY);
        return token;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const isAuthenticated = async () => {
    try {
        const token = await getToken();
        return !!token;
    } catch (error) {
        throw new Error(error.message);
    }
};
