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
        ref: 'User',
        required: false
    }
});

schema.methods.toJSON = function() {

    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
    
}



export const CalendarEventModel = model<CalendarEvent>('CalendarEvent', schema);