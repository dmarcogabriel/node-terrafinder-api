"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userPolicies = exports.planPolicies = exports.propertyPolicies = void 0;
var property_policies_1 = __importDefault(require("./property.policies"));
exports.propertyPolicies = property_policies_1.default;
var plan_policies_1 = __importDefault(require("./plan.policies"));
exports.planPolicies = plan_policies_1.default;
var user_policies_1 = __importDefault(require("./user.policies"));
exports.userPolicies = user_policies_1.default;
