import {ITodo} from '../types/todo'
import {model, Schema} from 'mongoose'

const todoSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true, 
    },
    description: {
      type: String,
      required: false, 
    },
    isComplete: {
      type: Boolean,
      required: true, 
    },
    isImportant: {
      type: Boolean,
      required: false,
    },
    isMyDate: {
      type: Boolean,
      required: false,
    },
  },
  {timestamps: true}
)

export default model<ITodo>('Todo', todoSchema)