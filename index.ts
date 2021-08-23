import express, { Application } from 'express';
import cors from 'cors';
import { dbConnection } from './database/config';
import 'dotenv/config';

// Crear el server de express
const app: Application = express();

// Database
dbConnection();

//CORS
app.use(cors());

// Lectura y parse del body
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));

app.use('/api/calendar-event', require('./routes/calendarEvent'));

app.use('/api/user', require('./routes/user'));

// Directorio público
app.use(express.static('public'));



// Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});