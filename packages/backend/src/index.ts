import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { userRoutes } from './routes';
import 'module-alias/register';

dotenv.config();
const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello from Ukraine!' });
});

app.use('', userRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
