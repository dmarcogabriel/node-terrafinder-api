"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_validator_1 = require("express-validator");
var lodash_1 = require("lodash");
var plan_repository_1 = require("../repositories/plan.repository");
var isPropertyPlan = function (propertyId, _a) {
    var req = _a.req;
    return __awaiter(void 0, void 0, void 0, function () {
        var plan;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!(req.params && req.params.id)) return [3 /*break*/, 2];
                    return [4 /*yield*/, (0, plan_repository_1.getPlanById)(req.params.id)];
                case 1:
                    plan = _b.sent();
                    if (plan && plan.property.toString() === propertyId)
                        return [2 /*return*/, true];
                    throw new Error('Plan does not belong to given property.');
                case 2: throw new Error('propertyId param is missing');
            }
        });
    });
};
var isPlanStringValid = function (plan) {
    if (plan === 'free-plan' || plan === 'premium-plan' || plan === 'pro-plan')
        return true;
    throw new Error('Invalid value for plan, expected: \'free-plan\', \'premium-plan\' or \'pro-plan\'');
};
exports.default = {
    createPlanPolicy: (0, express_validator_1.checkSchema)({
        type: {
            notEmpty: true,
            isString: {
                errorMessage: 'Type must be a string',
            },
            custom: {
                options: isPlanStringValid,
            },
        },
        property: {
            notEmpty: true,
            isString: {
                errorMessage: 'property must be a string',
            },
            custom: {
                options: function (propertyId) { return __awaiter(void 0, void 0, void 0, function () {
                    var plan;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, (0, plan_repository_1.getPropertyPlan)(propertyId)];
                            case 1:
                                plan = _a.sent();
                                if (!(0, lodash_1.isNil)(plan))
                                    throw new Error('property has already an existing plan.');
                                return [2 /*return*/];
                        }
                    });
                }); },
            },
        },
        isActive: {
            optional: { options: { nullable: true } },
            isBoolean: true,
        },
        activationDate: {
            optional: { options: { nullable: true } },
            isDate: true,
        },
    }),
    isPropertyPlan: (0, express_validator_1.body)('propertyId').notEmpty().custom(isPropertyPlan),
    isPlanStringValid: (0, express_validator_1.body)('type').notEmpty().custom(isPlanStringValid),
};
