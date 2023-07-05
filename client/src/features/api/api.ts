import axios from 'axios';
import { LoginInput } from '../../pages/login/components/LoginForm';
import { RegisterInput } from '../../pages/signup/components/RegisterForm';
import { EmployeeInput } from '../../pages/orgchart/components/AddEmployeeForm';
import { Activity, GenericResponse, Invitation, Question, Response } from './types';
import { Node } from '../../pages/orgchart/types';
import { transformData } from '../../pages/orgchart/utils';


const BASE_URL = 'http://localhost:3001/api/';

export const api = axios.create({
    baseURL: BASE_URL,
});

//auth 
export const signUpUserFn = async (user: RegisterInput) => {
    const response = await api.post<GenericResponse>('auth/register', user);
    return response.data;
};
export const loginUserFn = async (user: LoginInput) => {
    const response = await api.post<GenericResponse>('auth/login', user);
    return response.data;
};


//orginization chart
export const getOrgChartData = async (token: string | null) => {
    const response = await api.get<Node[]>('orgchart', { headers: { "Authorization": `Bearer ${token}` } })
    const data = await response.data
    return transformData(data)
}
export const addEmployee = async (employee: EmployeeInput, token: string | null) => {
    const response = await api.post<Node[]>('orgchart', employee, { headers: { "Authorization": `Bearer ${token}` } })
    const data = await response.data
    return data
}

// chatbot
export const getQuestions = async (token: string) => {
    const response = await api.get<Question[]>('chatbot', { headers: { "Authorization": `Bearer ${token}` } })
    const data = await response.data
    return data
}
export const addQuestion = async (question: string, token: string) => {
    const response = await api.post<Question>('chatbot', { question },
        { headers: { "Authorization": `Bearer ${token}` } })
    const data = await response.data
    return data
}
export const deleteQuestion = async (id: number, token: string) => {
    const response = await api.delete<Question>(`chatbot/${id}`,
        { headers: { "Authorization": `Bearer ${token}` } })
    const data = await response.data
    return data
}
export const saveResponse = async (employeeData: Response, token: string) => {
    const res = await api.post<Response>('chatbot/response', employeeData,
        { headers: { "Authorization": `Bearer ${token}` } })
    const data = await res.data
    return data
}

// activity ,invitations

export const getActivities = async (token: string) => {
    const response = await api.get<Activity[]>('activity', { headers: { "Authorization": `Bearer ${token}` } })
    const data = await response.data
    return data
}
export const addActivity = async (activity: Activity, token: string) => {
    const response = await api.post<Activity>('activity', activity, { headers: { "Authorization": `Bearer ${token}` } })
    const data = await response.data
    return data
}

export const deleteActivity = async (id: number, token: string) => {
    const response = await api.delete<Activity>(`activity/${id}`, { headers: { "Authorization": `Bearer ${token}` } })
    const data = await response.data
    return data
}

export const sendInvitation = async (invitation: Invitation, token: string) => {
    const response = await api.post<Invitation>('activity/sendInvitation', invitation, { headers: { "Authorization": `Bearer ${token}` } })
    const data = await response.data
    return data
}
export const getAllInvitations = async (token: string) => {
    const response = await api.get<Invitation[]>('activity/getAllInvitations'
        , {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
    const data = await response.data
    return data
}
export const getInvitationsSent = async (employeeId: number | string, token: string) => {
    const response = await api.get<Invitation[]>(`activity/getInvitationsSent/${employeeId}`
        , { headers: { "Authorization": `Bearer ${token}` } })
    const data = await response.data
    return data
}
export const getInvitationsReceived = async (employeeId: number | string, token: string) => {
    const response = await api.get<Invitation[]>(`activity/getInvitationsReceived/${employeeId}`,
        { headers: { "Authorization": `Bearer ${token}` } })
    const data = await response.data
    return data
}
export const changeInvitationStatus = async (invitationId: number, status: string, token: string) => {
    const response = await api.patch<Invitation>(`activity/changeInvitationStatus/${invitationId}`,
        { status }, { headers: { "Authorization": `Bearer ${token}` } })
    const data = await response.data
    return data
}
export const changeHasRead = async (invitationId: number, hasRead: boolean, token: string) => {
    const response = await api.patch<Invitation>(`activity/changeHasRead/${invitationId}`,
        { hasRead }, { headers: { "Authorization": `Bearer ${token}` } })
    const data = await response.data
    return data
}