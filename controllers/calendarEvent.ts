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

    try {

        const calendarEvents = await CalendarEventModel.find({}).populate('user', 'name');

        return res.json({
            ok: true,
            body: {
                calendarEvents
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

    const calendarEventId = req.params.id;
    const uid = req.body.uid;

    try {
        
        const calendarEvent = await CalendarEventModel.findById(calendarEventId);

        if (!calendarEvent) {
            return res.status(400).json({
                ok: false,
                msg: `CalendarEvent no existe con el id ${calendarEventId}`
            });
        }

        if (calendarEvent.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene prvilegio para editar el CalendarEvent'
            });
        }

        const bodyNewCalendarEvent = {
            ...req.body,
            user: uid
        };

        const calendarEventUpdated = await CalendarEventModel.findByIdAndUpdate(calendarEventId, bodyNewCalendarEvent, { new: true });

        return res.json({
            ok: true,
            body: {
                calendarEventUpdated
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

export const deleteCalendarEvent = async (req: Request, res: Response): Promise<CustomResponse> => {

    const calendarEventId = req.params.id;
    const uid = req.body.uid;

    try {
        
        const calendarEvent = await CalendarEventModel.findById(calendarEventId);

        if (!calendarEvent) {
            return res.status(400).json({
                ok: false,
                msg: `CalendarEvent no existe con el id ${calendarEventId}`
            });
        }

        if (calendarEvent.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene prvilegio para eliminar el CalendarEvent'
            });
        }

        await CalendarEventModel.findByIdAndDelete(calendarEventId);

        return res.json({
            ok: true,
            body: {}   
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

};