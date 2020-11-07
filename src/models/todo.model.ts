import { ITodo } from '../types/todo'
import { model, Schema } from 'mongoose'

const todoSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
      default: '',
    },
    isComplete: {
      type: Boolean,
      default: false,
      required: false,
    },
    isImportant: {
      type: Boolean,
      required: false,
      default: false
    },
    isMyDate: {
      type: Boolean,
      required: false,
      default: false
    },
    expDate: {
      type: String,
      required: false,
    },
    remindTime: {
      type: String,
      required: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true

    }
  },
  { timestamps: true }
)

export default model<ITodo>('Todo', todoSchema)