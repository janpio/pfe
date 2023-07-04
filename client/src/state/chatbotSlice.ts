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
export type chatbotSliceType = {
    teammate: User | null
    teammates: Array<User> | null
    setTeammate: (teammate: User | null) => void,
    setTeammates: (teammates: Array<User> | null) => void,

}

export const chatbotSlice: StateCreator<chatbotSliceType, [], [], chatbotSliceType> = ((set): any => ({
    teammate: null,
    teammates: null,

    setTeammate: (teammate: User) =>
        set((state) => ({ ...state, teammate })),

    setTeammates: (teammates: Array<User>) =>
        set((state) => ({ ...state, teammates })),
}));
