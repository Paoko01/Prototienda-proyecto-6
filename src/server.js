import express from 'express';
import cors from 'cors';
import { envs } from './config/envs.config.js';
import { dbConnect } from './config/db.config.js';
import { errorHandler } from './middlewares/error.handler.js';


const app = express();
import apiRouter from './routers/index.router.js';

dbConnect({ updateDocs: true });

//Middlewares de CORS
app.use(cors());


//Middlewares para parsear el body a JSON
app.use(express.json());
app.use(express.urlencoded( { extended: true}));

//Middlewares de rutas
app.use('/api/v1', apiRouter);

//Middlewares de errores
app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('¡Hola desde el backend de tu Tienda de proyecto 6! El servidor está funcionando.');
});

const PORT = process.env.PORT || envs.port;

app.listen(PORT, () => {
    console.log(`Servidor corriendo de pana en el puerto ${envs.port} 👻`) 
});