import app from './app';
import * as dbHelpers from './helpers/db';
import config from '../config';
import { createClient } from 'redis';

//cache service
// const client = createClient();

// client.on('error', (err: any) => console.log('Redis Client Error', err));

// await client.connect();
// await client.set('key', 'value');
// const value = await client.get('key');

//DB connection
dbHelpers.connect();

//PORT
const PORT = config.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// testing endpoint
app.get('/ping', (_req, res) => {
  console.log('hellooooooooo!!!!' + new Date().toLocaleDateString());

  res.send('pong');
});
