import express from 'express';
const app = express();
import api from './routers/indexRouter';
import config from './config/indexConfig';
import connectDB from './models/indexModel';
import { morganMiddleware } from './middlewares/morganMiddleware';

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Add the morgan middleware
app.use(morganMiddleware);
app.use("/api", api);

app.listen(config.port, () => {
  console.log(`Server listening on port ${config.port}`);
});