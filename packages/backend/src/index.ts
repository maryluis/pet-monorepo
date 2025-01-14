import 'reflect-metadata';
import 'module-alias/register';

import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import { userRoutes, wishRoutes, followerRouters } from '@/routes';
import { swaggerUi, swaggerSpec } from '@/swagger';
dotenv.config();

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello from Ukraine!' });
});

app.use('', userRoutes);
app.use('', wishRoutes);
app.use('', followerRouters);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
