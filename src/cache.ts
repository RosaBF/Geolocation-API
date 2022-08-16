import { response, Router } from 'express';
import { validateAddressRouter } from './modules/validateAddressIsReal/infrastructure/http/addresValidated.routes';
import { Error } from 'mongoose';
import redis from 'redis';
import { createClient, RedisClientOptions, RedisModules } from 'redis';

import * as config from '../config';

const router = Router();


  const client = redis.createClient({
    host: '127.0.0.1',
    port: 6379,
  });

