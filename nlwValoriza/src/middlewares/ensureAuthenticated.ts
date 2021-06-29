import { Request, Response, NextFunction } from 'express';
import { verify } from "jsonwebtoken";


interface IPayload {
    sub: string;
}


export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authToken = request.headers.authorization;

    if (!authToken) {
        return response.status(401).end();
    }

    const [, token] = authToken.split(" ");

    try {
        const { sub } = verify(token, "668685580583b0b9a11565ce6d59a570") as IPayload;

        request.user_id = sub

        return next();
    } catch (err) {
        return response.status(401).end();
    }

}