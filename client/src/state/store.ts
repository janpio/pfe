import { create } from 'zustand'
import { authSlice } from './authSlice'
import { chatbotSlice } from './chatbotSlice'


export const useStore = create((...props) => ({
    ...authSlice(...props),
    ...chatbotSlice(...props),
}))

