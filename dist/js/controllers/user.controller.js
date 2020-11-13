"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.updateNewPassword = exports.sendEmailToResetPassword = exports.usePasswordHashToMakeToken = exports.loggedIn = exports.loginUser = exports.signupUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const email_1 = require("../modules/email");
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
exports.signupUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    try {
        const { username, email, password } = req.body;
        let user = yield user_model_1.default.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: 'user allready exists'
            });
        }
        user = new user_model_1.default({
            username,
            email,
            password
        });
        const salt = yield bcrypt.genSalt(10);
        user.password = yield bcrypt.hash(password, salt);
        const newUser = yield user.save();
        res.status(201).json({
            message: 'register succeeded',
        });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send('error in saving');
    }
});
exports.loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    const { email, password } = req.body;
    try {
        const user = yield user_model_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: 'user not exists'
            });
        }
        const isMatch = yield bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: 'incorrect password'
            });
        }
        const payload = {
            user: {
                id: user._id
            }
        };
        jwt.sign(payload, 'secret', {
            expiresIn: 3600
        }, (err, token) => {
            if (err)
                throw err;
            res.status(200).json({ token });
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'server error'
        });
    }
});
exports.loggedIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findById(req.user.id);
        res.json(user);
    }
    catch (error) {
        res.send({ message: 'error in fetching user' });
    }
});
exports.usePasswordHashToMakeToken = (user) => {
    const { password, _id, createdAt } = user;
    return jwt.sign({ user: { id: _id } }, 'secret', { expiresIn: 3600 });
};
exports.sendEmailToResetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        let user;
        user = yield user_model_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'No user with that email' });
        }
        const token = exports.usePasswordHashToMakeToken(user);
        const url = email_1.getPasswordResetURL(user, token);
        const emailTemplate = email_1.resetPasswordTemplate(user, url);
        const sendEmail = () => {
            email_1.transporter.sendMail(emailTemplate, (err, info) => {
                if (err) {
                    return res.status(500).json({ message: "Error sending email", err: err });
                }
                return res.status(200).json({
                    message: "Send email succeeded",
                    content: info.response
                });
            });
        };
        sendEmail();
    }
    catch (error) {
        console.error(error);
    }
});
exports.updateNewPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { password, newPassword } = req.body;
        const user = yield user_model_1.default.findById(req.user.id);
        if (!user)
            return res.status(400).json({ message: 'user not exists' });
        const isMatch = yield bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: 'incorrect password'
            });
        }
        const salt = yield bcrypt.genSalt(10);
        newPassword = yield bcrypt.hash(newPassword, salt);
        const userUpdate = yield user_model_1.default.findByIdAndUpdate({ _id: user.id }, { password: newPassword });
        res.status(200).json({ message: 'password updatted succefull', user: userUpdate });
    }
    catch (error) {
        throw error;
    }
});
exports.resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { newPassword } = req.body;
        const salt = yield bcrypt.genSalt(10);
        newPassword = yield bcrypt.hash(newPassword, salt);
        yield user_model_1.default.findByIdAndUpdate({ _id: req.user.id }, { password: newPassword });
        res.status(200).json({ message: 'password updatted succefull' });
    }
    catch (error) {
        throw error;
    }
});
