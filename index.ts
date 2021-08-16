import express, { Application } from 'express';
require('dotenv').config({ path: __dirname+'/.env.development' });

// Crear el server de express
const app: Application = express();

// Lectura y parse del body
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));

// Directorio público
app.use(express.static('public'));



// Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});