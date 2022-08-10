import express from 'express';
import { userRouter } from './modules/user/infrastructure/http/users.routes';
import { validateAddressRouter } from './modules/validateAddressIsReal/infrastructure/http/addresValidated.routes';

//create express server
const app = express();

app.use(express.json()); // middleware que transforma la req.body a un json
app.use(express.urlencoded({ extended: true }));

//Routes

app.use('/user', userRouter);
app.use('/login', userRouter);
app.use('/register', userRouter);
app.use('/', validateAddressRouter)
app.use('/weather, weatherRouter')

export default app;
