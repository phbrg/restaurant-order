import { Sequelize } from 'sequelize';
import { config } from 'dotenv';
import pg from 'pg';

export const conn: Sequelize = new Sequelize({
  host: process.env.POSTGRES_HOST,
  port: 5432,
  database: process.env.POSTGRES_DATABASE,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  dialect: 'postgres',
  dialectModule: pg
});

(async (): Promise<void> => {
  try {
    await conn.authenticate();
    console.log('> db ok...');
  } catch (err: any) {
    console.log(`> db connection error: ${err}`);
  }
})();
