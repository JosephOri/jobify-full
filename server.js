import express from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import jobRouter from './routers/jobRouter.js';
import mongoose from 'mongoose';

const app = express();

dotenv.config();
app.use(express.json());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/jobs', jobRouter);

app.get('/api/v1', (req, res) => {
  res.send('Hello World');
});

app.use('*', (req, res) => {
  res.status(404).json({ msg: 'route not found' });
});

const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGO_URL);

  app.listen(port, () => {
    console.log(`server running on PORT ${port}....`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
