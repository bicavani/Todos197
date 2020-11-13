import { Router } from 'express';
import {
  loggedIn,
  loginUser,
  signupUser,
  updateNewPassword, sendEmailToResetPassword,
  resetPassword
} from '../controllers/user.controller';
import { auth } from '../middleware/auth.middleware';

const { check } = require('express-validator');

const router: Router = Router();

router.get('/me', auth, loggedIn);

router.put('/edit-password', auth, updateNewPassword)

router.post('/get-emailreset', sendEmailToResetPassword)

router.put('/reset-password/:token', auth, resetPassword)

router.post(
  '/signup',
  [
    check('username', 'Please Enter a Valid Username')
      .not()
      .isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check("password", "invalid password")
      .isLength({ min: 6 })
      .custom((value: any, { req }: { req: any }) => {
        if (value !== req.body.confirmPassword) {
          // trow error if passwords do not match
          throw new Error("Passwords don't match");
        } else {
          return value;
        }
      })
  ],
  signupUser,
);

router.post(
  '/login',
  [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter a valid password').isLength({
      min: 6,
    }),
  ],
  loginUser,
);

export default router;
