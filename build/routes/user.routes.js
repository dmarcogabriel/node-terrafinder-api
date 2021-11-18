"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_service_1 = __importDefault(require("../services/auth.service"));
var user_controller_1 = __importDefault(require("../controllers/user.controller"));
var policies_1 = require("../policies");
var middlewares_1 = require("../middlewares");
var router = (0, express_1.Router)();
router.post('/', policies_1.userPolicies.createUserPolicy, middlewares_1.validate, user_controller_1.default.post);
router.get('/', auth_service_1.default.authorize, user_controller_1.default.get);
router.get('/:id', auth_service_1.default.authorize, user_controller_1.default.getById);
router.put('/upload-photos/:id', auth_service_1.default.authorize, policies_1.userPolicies.uploadUserAvatarPolicy, middlewares_1.validate, user_controller_1.default.uploadFile);
exports.default = router;
