"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const todoSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    isComplete: {
        type: Boolean,
        required: true,
    },
    isImportant: {
        type: Boolean,
        required: false,
    },
    isMyDate: {
        type: Boolean,
        required: false,
    },
}, { timestamps: true });
exports.default = mongoose_1.model('Todo', todoSchema);
