import express, { Express } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import todoRoutes from './routes/todo.route';
import userRoutes from './routes/user.route';
import { auth } from './middleware/auth.middleware';
import path from 'path'

const app: Express = express();

require('./db')

const PORT: string | number = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.use('/todos', auth, todoRoutes);
app.use('/user', userRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, '../../client/build')));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/build', "index.html"));
  });
}

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


