"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const todo_controller_1 = require("../controllers/todo.controller");
const router = express_1.Router();
router.get('/', todo_controller_1.getTodos);
router.post('/add-todo', [
    express_validator_1.check('title', 'invalid title')
        .not()
        .isEmpty()
], todo_controller_1.addTodo);
router.delete('/delete-todo/:id', todo_controller_1.deleteTodo);
router.put('/edit-todo/:id', [
    express_validator_1.check('title', 'invalid title')
        .not()
        .isEmpty()
], todo_controller_1.updateTodo);
router.delete('/delete-allTodos', todo_controller_1.deleteAllTodos);
exports.default = router;
