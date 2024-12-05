import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'MarriaHlam',
  password: 'rusofob',
  database: 'petTasks_db',
});

pool
  .connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch((err) => console.error('Connection error', err.stack));

const createTable = async () => {
  const query = `
   CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nickName VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    tasks JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
    `;

  try {
    await pool.query(query);
    console.log('Table "users" created successfully!');
  } catch (err) {
    console.error('Error creating table:', err);
  }
};

createTable();

export default pool;
