import express from 'express';
import { errorHandler } from './middlewares/errorHandler.midd';
import routes from './routes';

const app = express();
app.use(express.json());

app.use(routes);

app.get('/');

app.use(errorHandler);

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});