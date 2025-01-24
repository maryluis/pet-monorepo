import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  logging: false,
});

sequelize.authenticate()
  .then(() => {
    console.log('Connected to PostgreSQL using Sequelize works!');
  })
  .catch((err) => {
    console.error('Connection error', err.stack);
  });

export default sequelize;
