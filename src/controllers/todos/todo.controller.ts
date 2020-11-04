import {Response, Request} from 'express'
import {ITodo} from '../../types/todo'
import Todo from '../../models/todo'

const getTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const todos: ITodo[] = await Todo.find()
    res.status(200).json({todos})
  } catch (error) {
    throw error
  }
}

const deleteAllTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const todos = await Todo.remove({})
    res
      .status(200)
      .json({
        message: "Todos deleted all",
        todos
      })
  } catch (error) {
    throw error
  }
}

const addTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<ITodo, "title" | "description" | "isComplete">

    const todo: ITodo = new Todo(body)

    const newTodo: ITodo = await todo.save()
    const allTodos: ITodo[] = await Todo.find()

    res
      .status(201)
      .json({ message: "Todo added", todo: newTodo, todos: allTodos })
  } catch (error) {
      throw error
  }
}


const updateTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const {body, params: {id}} = req
    const todoUpdate: ITodo | null = await Todo.findByIdAndUpdate(
      {_id: id},
      body
    )
    const allTodos: ITodo[] = await Todo.find()

    res
      .status(200)
      .json({
          message: 'todo updated',
          todo: todoUpdate,
          todos: allTodos,
      })
  } catch (error) {
    throw error
  }
}

const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const todoDelete: ITodo | null = await Todo.findByIdAndRemove({_id: req.params.id})
    const allTodos: ITodo[] = await Todo.find()

    res
      .status(200)
      .json({
        message: 'todo deleted',
        todos: allTodos,
      })
  } catch (error) {
    throw error
  }
}

export {getTodos, addTodo, updateTodo, deleteTodo, deleteAllTodos}