import { Router } from "express";
import { addTodo, deleteTodo, getTodos, updateTodo, deleteAllTodos } from "../controllers/todos/todo.controller";

const router: Router = Router()

router.get('/todos', getTodos)

router.post('/add-todo', addTodo)

router.delete('/delete-todo/:id', deleteTodo)

router.put('/edit-todo/:id', updateTodo)

router.delete('/delete-allTodos', deleteAllTodos)

export default router