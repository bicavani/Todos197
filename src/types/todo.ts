import {Document} from 'mongoose'

export interface ITodo extends Document {
  title: string
  description: string
  isComplete: boolean
  isImportant: boolean
  isMyDate: boolean
  expDate: string
  notification: boolean
}




