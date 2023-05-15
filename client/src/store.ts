
import { create } from 'zustand';

type User = {
    id?: number,
    name?: string,
    email?: string,
    role?: string,
    image?: string
    supervisorId?: number
    deskId?: number
}

type Store = {
    user: User | null | number;
    token: string | null
    requestLoading: boolean
    setRequestLoading: (isLoading: boolean) => void;
    login: (user: User | number, token: string) => void;
    logout: () => void
};

const useAuthStore = create<Store>((set) => ({
    user: null,
    token: null,
    requestLoading: false,

    setRequestLoading: (isLoading) =>
        set((state) => ({ ...state, requestLoading: isLoading })),

    login: (user: User | number, token: string) => {
        set((state) => ({ ...state, user, token }));
    },

    logout: () => {
        set((state) => ({ ...state, user: null, token: null }));
    },
}));

export default useAuthStore;
