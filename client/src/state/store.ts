import { create } from 'zustand'
import { authSlice, authSliceType } from './authSlice'
import { chatbotSlice, chatbotSliceType } from './chatbotSlice'


export const useStore = create<authSliceType & chatbotSliceType>()((...props) => ({
    ...authSlice(...props),
    ...chatbotSlice(...props),
}))

