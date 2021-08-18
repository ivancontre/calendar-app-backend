import { Request, Response} from 'express';
import { CalendarEventModel } from '../models/CalendarEvent';

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


    const calendarEvent = new CalendarEventModel(req.body);

    try {
        calendarEvent.user = req.body.uid;

        await calendarEvent.save();

        return res.status(201).json({
            ok: true,
            body: {
                calendarEvent
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