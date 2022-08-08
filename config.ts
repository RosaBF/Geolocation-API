import dotenv from 'dotenv';

dotenv.config();

const config = {
  PORT: process.env.PORT || 3000,
  tokenKey: process.env.TOKENKEY || 'tokenkey',
  tokenKeyGenerated:
    process.env.TOKENGENERATED ||
    '1dd8a7c682a987c1e3a48e21293d58442937f7a9f647ef8643eeab030bbafbc453ed23605242cd88d3be079cfffc037a3ae2f11a29ab259a1e488de1cc33ef4e',
  DB: process.env.DATABASE_URI,
  NOMINATIN_URL:
    process.env.NOMINATIN_URL || 'https://nominatim.openstreetmap.org/search?',
  WEATHER_URL:
    process.env.TIMER_WEATHER_BASE_URL || 'http://www.7timer.info/bin/api.pl?',
};

export default config;
