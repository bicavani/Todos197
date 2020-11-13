"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const { check } = require('express-validator');
const router = express_1.Router();
router.get('/me', auth_middleware_1.auth, user_controller_1.loggedIn);
router.put('/edit-password', auth_middleware_1.auth, user_controller_1.updateNewPassword);
router.post('/get-emailreset', user_controller_1.sendEmailToResetPassword);
router.put('/reset-password/:token', auth_middleware_1.auth, user_controller_1.resetPassword);
router.post('/signup', [
    check('username', 'Please Enter a Valid Username')
        .not()
        .isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check("password", "invalid password")
        .isLength({ min: 6 })
        .custom((value, { req }) => {
        if (value !== req.body.confirmPassword) {
            // trow error if passwords do not match
            throw new Error("Passwords don't match");
        }
        else {
            return value;
        }
    })
], user_controller_1.signupUser);
router.post('/login', [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter a valid password').isLength({
        min: 6,
    }),
], user_controller_1.loginUser);
exports.default = router;
