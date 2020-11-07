"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jwt = require('jsonwebtoken');
exports.auth = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token)
        return res.status(401).json({ message: 'auth error' });
    try {
        const decoded = jwt.verify(token, 'randomString');
        req.user = decoded.user;
        next();
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ message: 'invalid token' });
    }
};
