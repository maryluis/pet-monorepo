import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello from Ukraine!' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
