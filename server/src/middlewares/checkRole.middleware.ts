import { Response, NextFunction } from 'express';

export const checkRole = (roles: Array<string>) => {
    return async (req: any, res: Response, next: NextFunction) => {

        const role = req.user.role;

        //Check if array of authorized roles includes the user's role
        if (roles.indexOf(role) > -1)
            next();
        else res.status(401).json({ error: "Unauthorized" });

    };
};