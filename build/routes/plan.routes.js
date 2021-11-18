"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_service_1 = __importDefault(require("../services/auth.service"));
var plan_controller_1 = __importDefault(require("../controllers/plan.controller"));
var middlewares_1 = require("../middlewares");
var policies_1 = require("../policies");
var router = (0, express_1.Router)();
router.post('/', auth_service_1.default.authorize, policies_1.planPolicies.createPlanPolicy, middlewares_1.validate, plan_controller_1.default.createPlan);
router.get('/:propertyId', auth_service_1.default.authorize, plan_controller_1.default.getByPropertyId);
router.put('/activate/:id', auth_service_1.default.authorize, policies_1.planPolicies.isPropertyPlan, middlewares_1.validate, plan_controller_1.default.activatePlan);
router.put('/:id', auth_service_1.default.authorize, policies_1.planPolicies.isPlanStringValid, policies_1.planPolicies.isPropertyPlan, middlewares_1.validate, plan_controller_1.default.updatePlan);
exports.default = router;
