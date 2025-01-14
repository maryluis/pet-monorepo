import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(`postgres://MarriaHlam:${process.env.DATABASE_PASS}@localhost:5432/petTasks_db`,
  {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
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
