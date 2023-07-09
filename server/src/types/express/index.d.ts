import { Employee } from "@prisma/client";

export { };

declare global {
    namespace Express {
        interface Request {
            user: Employee;
        }
    }
}
