import { Schema, model } from 'mongoose';
import { User } from './types';

const schema = new Schema<User>({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true,
        unique: true
    },
    password: { 
        type: String, 
        required: true 
    }
});

export const UserModel = model<User>('User', schema);