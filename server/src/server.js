import express from 'express';
import { json, urlencoded } from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import { config } from 'dotenv';
import { connect } from './utils/db';
import { signup, signin } from './utils/auth';

export const app = express();
config();

const port = process.env.PORT || 3000;

app.disable('x-powered-by');

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/signup', (req, res) => {
  res.status(200).send({ message: 'test' });
});
app.post('/signup', signup);
app.post('/signin', signin);

export const start = async () => {
  try {
    await connect();
    app.listen(port, () => {
      console.log(`REST API on http://localhost:${port}`);
    });
  } catch (e) {
    console.error(e);
  }
};
