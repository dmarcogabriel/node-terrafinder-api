"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_validator_1 = require("express-validator");
exports.default = {
    createPlanPolicy: (0, express_validator_1.checkSchema)({
        name: {
            notEmpty: true,
            isString: {
                errorMessage: 'Name must be a string',
            },
        },
        email: {
            notEmpty: true,
            isEmail: true,
            isString: {
                errorMessage: 'Email must be a string',
            },
        },
        phone: {
            notEmpty: true,
            isString: {
                errorMessage: 'Phone must be a string',
            },
        },
        message: {
            notEmpty: true,
            isString: {
                errorMessage: 'Message must be a string',
            },
        },
    }),
};
