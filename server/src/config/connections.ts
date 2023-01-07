import { Pool } from 'pg';
require('dotenv').config();

const pool = new Pool({
  connectionString: `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}/${process.env.POSTGRES_DB}`,
});

export const client = pool.connect();

// const pgp = require('pg-promise')();
// export const db = pgp({
//   user: process.env.POSTGRES_USER,
//   password: process.env.POSTGRES_PASSWORD,
//   host: process.env.POSTGRES_HOST,
//   database: process.env.POSTGRES_DB,
//   port: process.env.POSTGRES_PORT,
// });
// -------------------
// import { Client } from 'pg';
// require('dotenv').config();

// const clientConect = new Client({
//   connectionString: `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}/${process.env.POSTGRES_DB}`,
// });

// export const client = clientConect;