import { NextFunction, Request, Response} from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {

    // x-token viene en el header

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try {

        const payload: JwtPayload = verify(token, process.env.SECRET_JWT_SEED as string) as JwtPayload;
        const {uid, name} = payload;
        
        // es se pasará por next a la siguiente funcion
        req.body.uid = uid;
        req.body.name = name;    

        
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: 'Token inválido'
        });
    }

    next();
};