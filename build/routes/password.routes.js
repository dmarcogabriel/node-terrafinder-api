"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var forgotPassword_controller_1 = __importDefault(require("../controllers/forgotPassword.controller"));
var router = (0, express_1.Router)();
router.post('/forgot', forgotPassword_controller_1.default.sendForgotPasswordEmail);
router.post('/reset/:id', forgotPassword_controller_1.default.resetPassword);
exports.default = router;
