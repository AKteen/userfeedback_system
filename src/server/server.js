import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

import connectDB from './db.js';
import userRoutes from './routes/userRoutes.js';
import templateRoutes from './routes/templateRoutes.js';
import responseRoutes from './routes/responseRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(helmet());


connectDB();


app.use('/', userRoutes);
app.use('/template', templateRoutes);
app.use('/response', responseRoutes);

app.listen(PORT, ()=>{
    console.log(`Server Live on port ${PORT}`);
})