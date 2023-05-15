import axios from 'axios';
import { LoginInput } from '../../pages/login/components/LoginForm';
import { RegisterInput } from '../../pages/signup/components/RegisterForm';
import { GenericResponse } from './types';
import { Node } from '../../pages/orgchart/types';
import { transformData } from '../../pages/orgchart/utils';

//const { token } = JSON.parse(localStorage?.getItem("user"));

const BASE_URL = 'http://localhost:3001/api/';


export const api = axios.create({
    baseURL: BASE_URL,
});

export const signUpUserFn = async (user: RegisterInput) => {
    const response = await api.post<GenericResponse>('auth/register', user);
    return response.data;
};

export const loginUserFn = async (user: LoginInput) => {
    const response = await api.post<GenericResponse>('auth/login', user);
    return response.data;
};

export const getOrgChartData = async (token: string | null) => {
    const response = await api.get<Node[]>('orgchart', { headers: { "Authorization": `Bearer ${token}` } })
    const data = await response.data
    return transformData(data)
}
