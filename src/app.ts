import express from 'express';
import { userRouter } from './modules/users/infrastructure/http/users.routes';
import { validateAddressRouter } from './modules/validateAddressIsReal/infrastructure/http/addresValidated.routes';
import { weatherRoute } from './modules/weatherAndGeolocation/infrastructure/http/weather.routes';

//create express server
const app = express();

app.use(express.json()); // middleware que transforma la req.body a un json
app.use(express.urlencoded({ extended: true }));

//Routes

app.use('/users', userRouter);
app.use('/address', validateAddressRouter);
app.use('/weather', weatherRoute);

// app.get('/oiyoiy', (_req, res) => {
//   console.log('hellooooooooo!!!!' + new Date().toLocaleDateString());

//   res.send('pong');
// });

export default app;
