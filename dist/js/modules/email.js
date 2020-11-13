"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordTemplate = exports.getPasswordResetURL = exports.transporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
require('dotenv').config();
exports.transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_LOGIN,
        pass: process.env.EMAIL_PASSWORD
    }
});
exports.getPasswordResetURL = (user, token) => `http://localhost:3000/user/reset-password/${token}`;
exports.resetPasswordTemplate = (user, url) => {
    const from = process.env.EMAIL_LOGIN;
    const to = user.email;
    const subject = "🌻 Backwoods Password Reset 🌻";
    const html = `
  <p>Hey ${user.displayName || user.email},</p>
  <p>We heard that you lost your Backwoods password. Sorry about that!</p>
  <p>But don’t worry! You can use the following link to reset your password:</p>
  <a href=${url}>${url}</a>
  <p>If you don’t use this link within 1 hour, it will expire.</p>
  <p>Do something outside today! </p>
  <p>–Your friends at Backwoods</p>
  `;
    return { from, to, subject, html };
};
