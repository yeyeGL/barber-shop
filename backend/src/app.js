import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import userRoute from './routes/user.route.js';
import reserveRoute from './routes/reserve.route.js';
import userGetRoute from './routes/user.get.route.js';
import adminRoute from './routes/admin.route.js';

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/api/user', userRoute);
app.use('/api/reserve', reserveRoute);
app.use("/api/user/get", userGetRoute);
app.use("/api/admin", adminRoute);

export default app;