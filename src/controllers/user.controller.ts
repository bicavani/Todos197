import { Request, Response } from 'express'
import User from '../models/user.model'
import { IUser } from '../types/user'
import {
  transporter,
  getPasswordResetURL,
  resetPasswordTemplate
} from '../modules/email'

const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

export const signupUser = async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    })
  }

  try {
    const {
      username,
      email,
      password
    } = req.body

    let user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({
        message: 'user allready exists'
      })
    }

    user = new User({
      username,
      email,
      password
    })

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt)

    const newUser = await user.save()

    res.status(201).json({
      message: 'register succeeded',
    })
  } catch (error) {
    console.error(error.message)
    res.status(500).send('error in saving')
  }
}

export const loginUser = async (req: Request, res: Response) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    })
  }

  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({
        message: 'user not exists'
      })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({
        message: 'incorrect password'
      })
    }

    const payload = {
      user: {
        id: user._id
      }
    }

    jwt.sign(
      payload,
      'secret',
      {
        expiresIn: 3600
      },
      (err: any, token: any) => {
        if (err) throw err
        res.status(200).json({ token })
      }
    )
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'server error'
    })
  }
}

export const loggedIn = async (req: any, res: Response) => {
  try {
    const user = await User.findById(req.user.id)
    res.json(user)
  } catch (error) {
    res.send({ message: 'error in fetching user' })
  }
}

export const usePasswordHashToMakeToken = (user: IUser) => {
  const { password, _id, createdAt } = user
  return jwt.sign(
    { user: { id: _id } },
    'secret',
    { expiresIn: 3600 }
  )
}

export const sendEmailToResetPassword = async (req: Request, res: Response) => {
  const { email } = req.body

  try {
    let user: IUser | null
    user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: 'No user with that email' })
    }

    const token = usePasswordHashToMakeToken(user)
    const url = getPasswordResetURL(user, token)
    const emailTemplate = resetPasswordTemplate(user, url)
    const sendEmail = () => {
      transporter.sendMail(emailTemplate, (err: any, info: any) => {
        if (err) {
          return res.status(500).json({ message: "Error sending email", err: err })
        }
        return res.status(200).json({
          message: "Send email succeeded",
          content: info.response
        })
      })
    }
    sendEmail()

  } catch (error) {
    console.error(error)
  }



}

export const updateNewPassword = async (req: any, res: Response) => {
  try {
    let { password, newPassword } = req.body
    const user = await User.findById(req.user.id)
    if (!user) return res.status(400).json({ message: 'user not exists' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({
        message: 'incorrect password'
      })
    }

    const salt = await bcrypt.genSalt(10)
    newPassword = await bcrypt.hash(newPassword, salt)

    const userUpdate = await User.findByIdAndUpdate(
      { _id: user.id },
      { password: newPassword }
    )

    res.status(200).json({ message: 'password updatted succefull', user: userUpdate })

  } catch (error) {
    throw error
  }
}

export const resetPassword = async (req: any, res: Response) => {
  try {
    let { newPassword } = req.body
    const salt = await bcrypt.genSalt(10)
    newPassword = await bcrypt.hash(newPassword, salt)

    await User.findByIdAndUpdate(
      { _id: req.user.id },
      { password: newPassword }
    )

    res.status(200).json({ message: 'password updatted succefull' })

  } catch (error) {
    throw error
  }
}
