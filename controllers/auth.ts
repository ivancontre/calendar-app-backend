import { Request, Response} from 'express';
import bcrypt from 'bcryptjs';
import { UserModel } from '../models/User';
import { generateJWT } from '../helpers/jwt';

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

export const loginUser = async (req: Request, res: Response): Promise<CustomResponse> => {

    const { email, password } = req.body;

    try {

        const userExists = await UserModel.findOne({ email });

        if (!userExists) {
            return res.status(400).json({
                ok: false,
                msg: `Usuario y contraseña no son correctos`
            });
        }

        // Confirmar passwords
        const validPassword = bcrypt.compareSync(password, userExists.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: `Usuario y contraseña no son correctos.`
            });
        }

        // Generar nuestro JWT
        const token = await generateJWT(userExists.id, userExists.name);

        return res.json({
            ok: true,
            body: {
                uid: userExists.id,
                name: userExists.name,
                email: userExists.email
            },
            token      
        });
        
    } catch (error) {

        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });

    }
    
};

export const registerUser = async (req: Request, res: Response): Promise<CustomResponse> => {

    const { email, password } = req.body;    

    try {

        const userExists = await UserModel.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                ok: false,
                msg: `El usuario ya existe con el email "${ email }"`
            });
        }

        const user = new UserModel(req.body);

        // Encriptar password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();
        
        // Generar nuestro JWT
        const token = await generateJWT(user.id, user.name);

        return res.status(201).json({
            ok: true,
            body: {
                uid: user.id,
                name: user.name.charAt(0).toUpperCase() + user.name.slice(1),
                email: user.email
            },
            token           
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });

    }    
};

export const renewToken = async (req: Request, res: Response): Promise<CustomResponse> => {

    const {uid, name, email} = req.body;

    try {
        // Generar nuestro JWT
        const token = await generateJWT(uid, name);

        return res.json({
            ok: true,
            token,
            body: {
                uid, 
                name, 
                email
            }            
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'No fue posible renovar el token'
        });
    }    
};