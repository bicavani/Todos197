import { Request, Response } from 'express'
import User from '../models/user.model'

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
      'randomString',
      {
        expiresIn: 31556926
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
