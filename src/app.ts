import express from 'express';
import { userRouter } from './modules/user/infrastructure/http/users.routes';
import { ValidateAddressRouter } from './modules/validateAddressIsReal/infrastructure/http/addresValidated.routes';

//create express server
const app = express();

app.use(express.json()); // middleware que transforma la req.body a un json
app.use(express.urlencoded({ extended: true }));

//Routes

app.use('/user', userRouter);
app.use('/login', userRouter);
app.use('/register', userRouter);
app.use('/', ValidateAddressRouter)

export default app;
