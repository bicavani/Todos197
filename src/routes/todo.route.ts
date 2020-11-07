import { Router } from "express";
import { check } from "express-validator";
import { addTodo, deleteTodo, getTodos, updateTodo, deleteAllTodos } from "../controllers/todo.controller";

const router: Router = Router()

router.get('/', getTodos)

router.post(
  '/add-todo',
  [
    check('title', 'invalid title')
      .not()
      .isEmpty()
  ],
  addTodo
)

router.delete('/delete-todo/:id', deleteTodo)

router.put(
  '/edit-todo/:id',
  [
    check('title', 'invalid title')
      .not()
      .isEmpty()
  ],
  updateTodo
)

router.delete('/delete-allTodos', deleteAllTodos)

export default router