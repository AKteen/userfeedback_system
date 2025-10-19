import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import connectDB from './db.js';

import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import templateRoutes from './routes/templateRoutes.js';
import responseRoutes from './routes/responseRoutes.js';


const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());


connectDB();


app.use('/', userRoutes);
app.use('/template', templateRoutes);
app.use('/response', responseRoutes);

app.listen(5000, ()=>{
    console.log("Server Live on port 5000");
})