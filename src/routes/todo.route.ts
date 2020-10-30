import { Router } from "express";
import { addTodo, deleteTodo, getTodos, updateTodo } from "../controllers/todos/todo.controller";

const router: Router = Router()

router.get('/todos', getTodos)

router.post('/add-todo', addTodo)

router.delete('/delete-todo/:id', deleteTodo)

router.put('/edit-todo/:id', updateTodo)

export default router