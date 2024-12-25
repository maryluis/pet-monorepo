import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('postgres://MarriaHlam:rusofob@localhost:5432/petTasks_db', // використовуємо змінну середовища або безпосередньо URL підключення
  {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    logging: false,
  });

sequelize.authenticate()
  .then(() => {
    console.log('Connected to PostgreSQL using Sequelize!');
  })
  .catch((err) => {
    console.error('Connection error', err.stack);
  });

export default sequelize;
