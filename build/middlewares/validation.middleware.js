"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
var express_validator_1 = require("express-validator");
var chalk_1 = require("chalk");
var validate = function (req, res, next) {
    var errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        console.error("[" + (0, chalk_1.greenBright)('Validation Errors') + "]: ", errors.array());
        res.status(400).json({ message: 'Validation Error', data: errors.array() });
    }
    else {
        next();
    }
};
exports.validate = validate;
