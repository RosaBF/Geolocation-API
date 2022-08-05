import dotenv from 'dotenv';
import app from './app';
import * as dbHelpers from './helpers/db';
import config from '../config';

const PORT = config.PORT || 3000;

dbHelpers.connect();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// testing endpoint
app.get('/ping', (_req, res) => {
  console.log('hellooooooooo!!!!' + new Date().toLocaleDateString());

  res.send('pong');
});
