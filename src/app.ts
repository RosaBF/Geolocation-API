import express from 'express';
import { userRouter } from './modules/user/infrastructure/http/users.routes';

//create express server
const app = express();

app.use(express.json()); // middleware que transforma la req.body a un json
app.use(express.urlencoded({ extended: true }));

//Routes

app.use('/', userRouter);
app.use('login', userRouter);

export default app;
