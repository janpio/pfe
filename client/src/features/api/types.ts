
import { User, Supervisor } from "../../state/authSlice";

export type GenericResponse = {
    token: string;
    user: User | Supervisor;
}

export type Response = {
    id?: number | string,
    response?: string
    questionId?: string | number,
    employeeId?: string | number,
    category?: string,
}

export type Question = {
    id?: any,
    question?: string,
    abreviation?: string,
    category?: string,
    response?: Response[] | null
}
export type Invitation = {
    id?: number | string,
    activity?: number | string,
    sender?: number | string,
    recipient?: number | string,
    status?: string,
    hasRead?: boolean,
    date?: Date
}
export type Activity = {
    id?: number | string,
    type?: string,
    image?: string,
    invitations?: Invitation[]
}