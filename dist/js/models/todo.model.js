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
        default: '',
    },
    isComplete: {
        type: Boolean,
        default: false,
        required: false,
    },
    isImportant: {
        type: Boolean,
        required: false,
        default: false
    },
    isMyDate: {
        type: Boolean,
        required: false,
        default: false
    },
    expDate: {
        type: String,
        required: false,
    },
    remindTime: {
        type: String,
        required: false,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true
    }
}, { timestamps: true });
exports.default = mongoose_1.model('Todo', todoSchema);
