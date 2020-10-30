import express, {Express} from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import todoRoutes from './routes/todo.route'
import bodyParser from 'body-parser'

const app: Express = express()

const PORT: string | number = process.env.PORT || 4000

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"))
app.use(todoRoutes)

app.get("/", function (req, res) {
    res.send("<h1>Hello World!</h1>")
  })

app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`))

const url = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.0odm4.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true ,
}
mongoose.set('useFindAndModify', true);
mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })


