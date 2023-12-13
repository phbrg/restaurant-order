const { Sequelize } = require('sequelize');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL;

const sequelize = new Sequelize(connectionString, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
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
