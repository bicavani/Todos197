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
exports.loggedIn = exports.loginUser = exports.signupUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
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
        jwt.sign(payload, 'randomString', {
            expiresIn: 31556926
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
