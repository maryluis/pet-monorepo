import express, { Request, Response } from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import bodyParser from 'body-parser';
import { v4 as uuid4 } from 'uuid';
import pool from '../db';

import { IUserRegistration, IUser } from '@../../types';

const app = express();
const port = 3001;

const users = [];

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello from Ukraine!' });
});

app.post('/create-user', async(req, res: { body: IUserRegistration}) => {
  const { nickName, password, confirmPassword } = req.body;

  if (!nickName || !password || !confirmPassword) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const id = uuid4();
    const result = await pool.query('INSERT INTO users(id, nickName, password) VALUES($1, $2, $3) RETURNING *',
      [id, nickName, hashedPassword]);
    const newUser: IUser = { ...result.rows[0], tasks: [] } ;

    users.push(newUser);
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
