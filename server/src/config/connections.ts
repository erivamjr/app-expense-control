const pg = require('pg-promise')();
require('dotenv').config();

export const connection = pg({
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
  database: 'postgres',
});
