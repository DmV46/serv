require('dotenv').config();

const PORT = process.env.PORT || 3000;
const DATABASE_URL = 'mongodb://localhost:27017/mestodb';
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  PORT,
  DATABASE_URL,
  JWT_SECRET: isProduction ? process.env.JWT_SECRET : 'dev-secret',
};
