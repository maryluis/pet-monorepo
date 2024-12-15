import pool from '../../db';

export const getUserById = async (id) => {
  const result = await pool.query('SELECT id, nickName AS "nickName" FROM users WHERE id = $1', [id]);
  return result.rows[0];
};
