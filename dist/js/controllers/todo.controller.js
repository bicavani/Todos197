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
exports.deleteAllTodos = exports.deleteTodo = exports.updateTodo = exports.addTodo = exports.getTodos = void 0;
const express_validator_1 = require("express-validator");
const todo_model_1 = __importDefault(require("../models/todo.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ _id: req.user.id });
    if (!user) {
        return res.status(400).json({ message: 'user does not exist' });
    }
    try {
        const todos = yield todo_model_1.default.find({ user: user._id });
        res.status(200).json({ todos });
    }
    catch (error) {
        throw error;
    }
});
exports.getTodos = getTodos;
const deleteAllTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ _id: req.user.id });
    if (!user) {
        return res.status(400).json({ message: 'user does not exist' });
    }
    try {
        yield todo_model_1.default.remove({ user: user._id });
        res
            .status(200)
            .json({
            message: "Todos deleted all",
            todos: []
        });
    }
    catch (error) {
        throw error;
    }
});
exports.deleteAllTodos = deleteAllTodos;
const addTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    const user = yield user_model_1.default.findOne({ _id: req.user.id });
    if (!user) {
        return res.status(400).json({ message: 'user does not exist' });
    }
    try {
        const body = req.body;
        const { title } = body;
        const todo = new todo_model_1.default({
            title,
            user: user._id,
        });
        const newTodo = yield todo.save();
        const allTodos = yield todo_model_1.default.find();
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
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    const user = yield user_model_1.default.findOne({ _id: req.user.id });
    if (!user) {
        return res.status(400).json({ message: 'user does not exist' });
    }
    try {
        const { body, params: { id } } = req;
        const todoUpdate = yield todo_model_1.default.findByIdAndUpdate({ _id: id }, body);
        const allTodos = yield todo_model_1.default.find();
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
    const user = yield user_model_1.default.findOne({ _id: req.user.id });
    if (!user) {
        return res.status(400).json({ message: 'user does not exist' });
    }
    try {
        yield todo_model_1.default.findByIdAndRemove({ _id: req.params.id });
        const allTodos = yield todo_model_1.default.find();
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
