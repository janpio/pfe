import { Response, NextFunction } from 'express';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';

export const authMiddleware = async (req: any, res: Response, next: NextFunction) => {

    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(403).json({ error: "Authorization token required" });
    }

    const token = authorization.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.SECRET as jwt.Secret);

        req.user = decoded;

        next();

    } catch (error) {
        if (error instanceof JsonWebTokenError) {

            if (error.name === "TokenExpiredError") {
                res.status(401).json({ error: "Expired Token" });
            }
            else {
                res.status(401).json({ error: "Invalid Token" });
            }
        }

    }
};
