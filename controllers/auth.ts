import { Request, Response} from 'express';

export const loginUser = (req: Request, res: Response): Response => {

    const { email, password } = req.body;

    return res.json({
        ok: true,
        msg: 'login'
    });
};

export const registerUser = (req: Request, res: Response): Response => {

    const { name, email, password } = req.body;

    if (name.length < 3) {
        return res.status(400).json({
            ok: false,
            msg: 'El nombre debde tener al menos 3 letras'
        });
    }

    return res.json({
        ok: true,
        msg: 'register',
        name,
        email,
        password
    });
};

export const renewToken = (req: Request, res: Response): Response => {
    return res.json({
        ok: true,
        msg: 'renewToken'
    });
};