"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todo_controller_1 = require("../controllers/todos/todo.controller");
const router = express_1.Router();
router.get('/todos', todo_controller_1.getTodos);
router.post('/add-todo', todo_controller_1.addTodo);
router.delete('/delete-todo/:id', todo_controller_1.deleteTodo);
router.put('/edit-todo/:id', todo_controller_1.updateTodo);
exports.default = router;
