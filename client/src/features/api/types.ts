export type IUser = {
    id?: number,
    name?: string,
    email?: string,
    role?: string,
    image?: string
    supervisorId?: number
    deskId?: number
}


export type GenericResponse = {
    token: string;
    user: IUser;
}
