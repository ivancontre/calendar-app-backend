import { Request, Response} from 'express';
import { UserModel } from '../models/User';

interface Json {
    ok: boolean;
    msg?: string;
    body?: any;
    token?: string;
};

type Send<T = Response> = (body?: Json) => T;

interface CustomResponse extends Response {
    json: Send<this>;
};

export const getUsers = async (req: Request, res: Response): Promise<CustomResponse> => {

    try {
        
        const users = await UserModel.find().select({ ":id": 1, "name": 1, "email": 1 });

        return res.json({
            ok: true,
            body: {
                users
            }   
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

};