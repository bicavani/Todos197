"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const todo_route_1 = __importDefault(require("./routes/todo.route"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = express_1.default();
const PORT = process.env.PORT || 4000;
app.use(express_1.default.json()); // for parsing application/json
app.use(express_1.default.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors_1.default());
app.use(todo_route_1.default);
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
const url = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.0odm4.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
const connectionParams = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
};
mongoose_1.default.set('useFindAndModify', true);
mongoose_1.default.connect(url, connectionParams)
    .then(() => {
    console.log('Connected to database ');
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
})
    .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
});
