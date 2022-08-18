import dotenv from 'dotenv';

dotenv.config();

const config = {
  PORT: process.env.PORT || 3000,
  tokenKey: process.env.TOKENKEY || 'tokenkey',
  tokenKeyGenerated:
    process.env.TOKENGENERATED ||
    'c9060cdaf3e71e89420b5d847293ab4277dc2e5480184b51f6454e90e189c0e4dcce13a73329d0a15562d1e574da653c54b6d195fa4f0ac5ad96e0c44ab2659c',
  DB: process.env.DATABASE_URI,
  NOMINATIN_URL:
    process.env.NOMINATIN_URL || 'https://nominatim.openstreetmap.org/search?',
  WEATHER_URL:
    process.env.TIMER_WEATHER_BASE_URL || 'http://www.7timer.info/bin/api.pl?',
  USER_CREDENTIALS: process.env.USER_CREDENTIALS || 'userCredentials',
  REDIS_CACHE: {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || 6379,
  },
};

export default config;
