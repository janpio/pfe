
import { create } from 'zustand';

export type User = {
    id: number,
    name: string,
    email?: string,
    role?: string,
    image?: string
    supervisorId?: number
    deskId?: number
}

export type Supervisor = {
    id: number,
    name: string,
    email?: string,
    role?: string,
    image?: string
    employees?: User[]
    teamId?: number
}
type Store = {
    user: User | Supervisor | null;
    token: string | null
    showForm: boolean
    requestLoading: boolean
    setRequestLoading: (isLoading: boolean) => void;
    login: (user: User | Supervisor, token: string) => void;
    logout: () => void
};

const useAuthStore = create<Store>((set) => ({
    user: null,
    token: null,
    showForm: false,
    requestLoading: false,

    setShowForm: (showForm: boolean) =>
        set((state) => ({ ...state, showForm: showForm })),

    setRequestLoading: (isLoading) =>
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

export default useAuthStore;
