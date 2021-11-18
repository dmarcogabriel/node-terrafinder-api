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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_validator_1 = require("express-validator");
var lodash_1 = require("lodash");
var User_1 = __importDefault(require("../models/User"));
var isEmailUnique = function (email) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, User_1.default.where('email', email)];
            case 1:
                users = _a.sent();
                if (!(0, lodash_1.isEmpty)(users))
                    throw new Error('Email already registered');
                return [2 /*return*/, true];
        }
    });
}); };
exports.default = {
    createUserPolicy: (0, express_validator_1.checkSchema)({
        firstName: {
            notEmpty: true,
            isString: {
                errorMessage: 'firstName must be a string',
            },
        },
        lastName: {
            notEmpty: true,
            isString: {
                errorMessage: 'lastName must be a string',
            },
        },
        phone: {
            notEmpty: true,
            isString: {
                errorMessage: 'lastName must be a string',
            },
            // todo: add custom and customSanitization
        },
        cpf: {
            notEmpty: true,
            isString: {
                errorMessage: 'lastName must be a string',
            },
            // todo: add custom and customSanitization
        },
        email: {
            notEmpty: true,
            isEmail: true,
            isString: {
                errorMessage: 'email must be a string',
            },
            custom: {
                options: isEmailUnique,
            },
        },
        password: {
            optional: { options: { nullable: true } },
            isString: {
                errorMessage: 'password must be a string',
            },
        },
        avatar: {
            optional: { options: { nullable: true } },
            isString: {
                errorMessage: 'avatar path must be a string',
            },
        },
        plan: {
            optional: { options: { nullable: true } },
            isString: {
                errorMessage: 'plan must be a string',
            },
        },
    }),
    uploadUserAvatarPolicy: (0, express_validator_1.checkSchema)({
        email: {
            optional: { options: { nullable: true } },
            isEmail: true,
            isString: {
                errorMessage: 'email must be a string',
            },
            custom: {
                options: isEmailUnique,
            },
        },
        avatar: {
            optional: { options: { nullable: true } },
            isString: {
                errorMessage: 'avatar path must be a string',
            },
        },
    }),
    updateUserPolicy: (0, express_validator_1.checkSchema)({
        firstName: {
            optional: { options: { nullable: true } },
            isString: {
                errorMessage: 'firstName must be a string',
            },
        },
        lastName: {
            optional: { options: { nullable: true } },
            isString: {
                errorMessage: 'lastName must be a string',
            },
        },
        phone: {
            optional: { options: { nullable: true } },
            isString: {
                errorMessage: 'lastName must be a string',
            },
            // todo: add custom and customSanitization
        },
        cpf: {
            optional: { options: { nullable: true } },
            isString: {
                errorMessage: 'lastName must be a string',
            },
            // todo: add custom and customSanitization
        },
        email: {
            optional: { options: { nullable: true } },
            isEmail: true,
            isString: {
                errorMessage: 'email must be a string',
            },
            custom: {
                options: isEmailUnique,
            },
        },
        password: {
            optional: { options: { nullable: true } },
            isString: {
                errorMessage: 'password must be a string',
            },
        },
        plan: {
            optional: { options: { nullable: true } },
            isString: {
                errorMessage: 'plan must be a string',
            },
        },
    }),
};
