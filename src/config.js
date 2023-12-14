import dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT,
  env: process.env.ENV,
  db: {
    mongodbUri: process.env.MONGODB_URI,
  },
  jwtSecret: process.env.JWT_SECRET,
  cookeSecret: process.env.COOKE_SECRET,
  sessionSecret: process.env.SESSION_SECRET,
}