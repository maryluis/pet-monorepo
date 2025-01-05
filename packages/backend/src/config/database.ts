import { Sequelize } from 'sequelize';

const DATABASE_PASS = process.env.DATABASE_PASS;
const sequelize = new Sequelize(`postgres://MarriaHlam:${DATABASE_PASS}@localhost:5432/petTasks_db`,
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
