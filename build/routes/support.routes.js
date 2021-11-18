"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var support_controller_1 = __importDefault(require("../controllers/support.controller"));
var support_policies_1 = __importDefault(require("../policies/support.policies"));
var middlewares_1 = require("../middlewares");
var router = (0, express_1.Router)();
router.post('/', support_policies_1.default.createPlanPolicy, middlewares_1.validate, support_controller_1.default.createSupport);
exports.default = router;
