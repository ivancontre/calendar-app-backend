/*
    Rutas de CalendarEvent
    host + /api/calendar-event
*/

import { Router } from 'express';
import { check } from 'express-validator';
import { getCalendarEvents, createCalendarEvent, updateCalendarEvent, deleteCalendarEvent} from '../controllers/calendarEvent';
import { isDate } from '../helpers/isDate';
import { fieldsValidator } from '../middlewares/fields-validator';
import { verifyJWT } from '../middlewares/verify-jwt';

const router: Router = Router();

// Todos los endpoints que estén abajo de router.use(verifyJWT) tendrán que verificar el token
router.use(verifyJWT);

router.get(
    '/', 
    //verifyJWT,
    getCalendarEvents
);

router.post(
    '/', 
    [
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom(isDate),
        check('endDate', 'La fecha de finalización es obligatoria').custom(isDate),
        fieldsValidator
    ],
    //verifyJWT,
    createCalendarEvent
);

router.put(
    '/:id', 
    //verifyJWT,
    updateCalendarEvent
);

router.delete(
    '/:id', 
    //verifyJWT,
    deleteCalendarEvent
);

module.exports = router;