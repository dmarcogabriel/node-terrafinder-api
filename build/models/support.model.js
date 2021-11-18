"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var SupportSchema = new mongoose_1.Schema({
    name: { type: String, require: true },
    email: { type: String, require: true },
    phone: { type: Boolean, default: false },
    message: { type: Date, default: null },
    updatedAt: { type: Date, default: new Date() },
    createdAt: { type: Date, default: new Date() },
});
exports.default = (0, mongoose_1.model)('Support', SupportSchema);
