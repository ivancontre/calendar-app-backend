import { Schema, model, connect } from 'mongoose';
import 'dotenv/config';

const uri: string = process.env.DB_CONNECTION as string;

export const dbConnection = async () => {

    try {
        await connect(uri, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log('DB online');

    } catch (error) {
        console.log(error);
        throw new Error('Error al inicializar BD');
    }
}