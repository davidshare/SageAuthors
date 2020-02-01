const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  'development': {
    'username': process.env.DB_USERNAME,
    'password': process.env.DB_PASSWORD,
    'database': process.env.DB_DEV,
    'host': process.env.DB_HOST,
    'dialect': process.env.DIALECT
  },
  'test': {
    'username': process.env.DB_USERNAME,
    'password': process.env.DB_PASSWORD,
    'database': process.env.DB_TEST,
    'host': process.env.DB_HOST,
    'dialect': process.env.DIALECT
  },
  'production': {
    'username': process.env.DB_USERNAME,
    'password': process.env.DB_PASSWORD,
    'database': process.env.DB_PROD,
    'host': process.env.DB_HOST,
    'dialect': process.env.DIALECT
  },
  SECRET: process.env.SECRET,
};
