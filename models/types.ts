import { Document } from 'mongoose';


export interface User extends Document{
    name: string;
    email: string;
    password: string;
};

export interface CalendarEvent extends Document {
    title: string;
    start: Date;
    endDate: Date;
    notes: string;
    user: User
};