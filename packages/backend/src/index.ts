import 'reflect-metadata';
import * as path from 'path';
import moduleAlias from 'module-alias';

moduleAlias.addAliases({
  '@shared': path.resolve(__dirname, '.../../'),
  '@': path.resolve(__dirname, './packages/backend/src'),
});

import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import { swaggerUi, swaggerSpec } from './swagger';
import { userRoutes, wishRoutes, followerRouters } from '@/routes';
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
