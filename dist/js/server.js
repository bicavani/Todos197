"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const todo_route_1 = __importDefault(require("./routes/todo.route"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const auth_middleware_1 = require("./middleware/auth.middleware");
const path_1 = __importDefault(require("path"));
const app = express_1.default();
require('./db');
const PORT = process.env.PORT || 8080;
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(cors_1.default());
app.use('/todos', auth_middleware_1.auth, todo_route_1.default);
app.use('/user', user_route_1.default);
if (process.env.NODE_ENV === "production") {
    app.use(express_1.default.static(path_1.default.join(__dirname, '../../client/build')));
    app.get("*", (req, res) => {
        res.sendFile(path_1.default.join(__dirname, '../../client/build', "index.html"));
    });
}
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
