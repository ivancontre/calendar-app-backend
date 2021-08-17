import { Schema, model } from 'mongoose';
import { CalendarEvent } from './types';

const schema = new Schema<CalendarEvent>({
    title: { 
        type: String, 
        required: true 
    },
    start: { 
        type: Date, 
        required: true
    },
    endDate: { 
        type: Date, 
        required: true
    },
    notes: { 
        type: String, 
        required: false 
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

export const CalendarEventModel = model<CalendarEvent>('CalendarEvent', schema);