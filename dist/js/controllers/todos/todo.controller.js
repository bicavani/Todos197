"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.addTodo = exports.getTodos = void 0;
const todo_1 = __importDefault(require("../../models/todo"));
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield todo_1.default.find();
        res.status(200).json({ todos });
    }
    catch (error) {
        throw error;
    }
});
exports.getTodos = getTodos;
const addTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const todo = new todo_1.default(body);
        const newTodo = yield todo.save();
        const allTodos = yield todo_1.default.find();
        res
            .status(201)
            .json({ message: "Todo added", todo: newTodo, todos: allTodos });
    }
    catch (error) {
        throw error;
    }
});
exports.addTodo = addTodo;
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body, params: { id } } = req;
        const todoUpdate = yield todo_1.default.findByIdAndUpdate({ _id: id }, body);
        const allTodos = yield todo_1.default.find();
        res
            .status(200)
            .json({
            message: 'todo updated',
            todo: todoUpdate,
            todos: allTodos,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.updateTodo = updateTodo;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todoDelete = yield todo_1.default.findByIdAndRemove({ _id: req.params.id });
        const allTodos = yield todo_1.default.find();
        res
            .status(200)
            .json({
            message: 'todo deleted',
            todos: allTodos,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.deleteTodo = deleteTodo;