import { User, Supervisor } from "../../store";

export type GenericResponse = {
    token: string;
    user: User | Supervisor;
}
