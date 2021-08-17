import { Request, Response} from 'express';

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

export const getCalendarEvents = async (req: Request, res: Response): Promise<CustomResponse> => {

    return res.json({
        ok: true,
        msg: 'getCalendarEvents'    
    });
};

export const createCalendarEvent = async (req: Request, res: Response): Promise<CustomResponse> => {


    console.log(req.body)

    return res.json({
        ok: true,
        msg: 'createCalendarEvent'    
    });
};

export const updateCalendarEvent = async (req: Request, res: Response): Promise<CustomResponse> => {

    return res.json({
        ok: true,
        msg: 'updateCalendarEvent'    
    });
};

export const deleteCalendarEvent = async (req: Request, res: Response): Promise<CustomResponse> => {

    return res.json({
        ok: true,
        msg: 'deleteCalendarEvent'    
    });
};