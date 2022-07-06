
const config = {
  PORT: process.env.PORT || 3000,
  tokenKey: process.env.TOKENKEY || 'tokenkey',
  DB: process.env.DATABASE_URI,
};

export default config;
