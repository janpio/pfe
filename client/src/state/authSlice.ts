import { StateCreator } from 'zustand';

export type User = {
    id: number,
    name: string,
    email: string,
    position?: string,
    team?: string,
    image?: string,
    supervisorId?: number,
    supervisor?: Supervisor;
    responses: any[],
    role?: string,
    parentId?: string | number,
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
export type authSliceType = {
    user?: User | Supervisor | null;
    token?: string | null
    requestLoading?: boolean
    // setTeammates: (teammates: Array<User> | null) => void,
    setRequestLoading: (isLoading: boolean) => void;
    login: (user: User | Supervisor, token: string) => void;
    logout: () => void
};

export const authSlice: StateCreator<authSliceType, [], [], authSliceType> = ((set): any => ({
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
        localStorage.removeItem("teammates");
        set((state) => ({ ...state, user: null, token: null }));
    },
}));
