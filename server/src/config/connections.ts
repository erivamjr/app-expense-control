import { Pool } from 'pg';
require('dotenv').config();

const pool = new Pool({
  connectionString: `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}/postgres`,
});

export const client = pool.connect();