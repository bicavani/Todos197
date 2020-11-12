import express, { Express } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import todoRoutes from './routes/todo.route';
import userRoutes from './routes/user.route';
import { auth } from './middleware/auth.middleware';
import path from 'path'

const app: Express = express();

const PORT: string | number = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.use('/todos', auth, todoRoutes);
app.use('/user', userRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

const url = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.0odm4.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

const connectionParams = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};
mongoose.set('useFindAndModify', true);
mongoose.connect(url, connectionParams)
  .then(() => {
    console.log('Connected to database ');
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });
