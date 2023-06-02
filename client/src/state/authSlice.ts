import { StateCreator } from 'zustand';

export type User = {
    id: number,
    name: string,
    email: string,
    position?: string,
    image?: string
    parentId?: string | number,
    responses: any[]
    supervisorId?: number
    deskId?: number
}
export type Supervisor = {
    id: number,
    name: string,
    email?: string,
    position?: string,
    image?: string
    employees?: User[]
    teamId?: number
}
/*type authSlice = {
    teammates: Array<User> | null | any
    user: User | Supervisor | null;
    token: string | null
    requestLoading: boolean

    setTeammates: (teammates: Array<User> | null) => void,
    setRequestLoading: (isLoading: boolean) => void;
    login: (user: User | Supervisor, token: string) => void;
    logout: () => void
};*/

export const authSlice: StateCreator<[]> = ((set): any => ({
    user: null,
    token: null,
    requestLoading: false,


    setRequestLoading: (isLoading: boolean) =>
        set((state) => ({ ...state, requestLoading: isLoading })),

    login: (user: User | Supervisor, token: string) => {
        localStorage.setItem("user", JSON.stringify({ user, token }));
        set((state) => ({ ...state, user, token }));
    },

    logout: () => {
        localStorage.removeItem("user");
        set((state) => ({ ...state, user: null, token: null }));
    },
}));
