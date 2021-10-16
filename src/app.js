import express, { application } from 'express'
import morgan from 'morgan'
import pkg from '../package.json'

import {createRoles, createSuperAdmin, createTasks} from './libs/initialSetup'

import productsRoutes from './routes/products.routes'
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import vetRoutes from './routes/vet.routes';
// import taskRoutes from './routes/'
import cors from 'cors';

const app = express();

// const whitelist = ['http://192.168.0.2:8080/']

const corsOptions = {
    origin: '*'
}

app.use(cors(corsOptions))  

createTasks()
    .then(() => createRoles())
    .then(() => createSuperAdmin())
    .catch(() => console.log("Se inicializo mal configuraciones iniciales"))

app.set('pkg', pkg);

app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        name: app.get('pkg').name,
        author: app.get('pkg').author,
        description: app.get('pkg').description,
        version: app.get('pkg').version,
    })
})
 
app.use('/api/products', productsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/vets',  vetRoutes);
// app.use('/api/tasks', )User

export default app;


