const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: 5432,
  database: process.env.POSTGRES_DATABASE,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('> DB Ok');
  } catch (err) {
    console.log(`> DB Error: ${err}`);
  }
})();

module.exports = sequelize;