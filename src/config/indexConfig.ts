import dotenv from 'dotenv';
dotenv.config();

const config = {
  port: process.env.PORT,
  environment: process.env.NODE_ENV,
  databaseURL: process.env.DATABASE_URI,
  jwtSecret: process.env.JWT_SECRET
};

export default config;