"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLogger = void 0;
var date_fns_1 = require("date-fns");
var chalk_1 = require("chalk");
var requestLogger = function () { return function (req, _, next) {
    console.log("[" + (0, chalk_1.blueBright)('REQUEST') + "] | " + (0, date_fns_1.format)(new Date(), 'PPpp'));
    console.log("[" + (0, chalk_1.blueBright)('URL') + "] " + (0, chalk_1.yellow)(req.url) + " | [" + (0, chalk_1.blueBright)('METHOD') + "] " + (0, chalk_1.yellow)(req.method));
    console.log("[" + (0, chalk_1.blueBright)('HEADERS') + "]", req.headers);
    console.log("[" + (0, chalk_1.blueBright)('PARAMS') + "]", req.params);
    console.log("[" + (0, chalk_1.blueBright)('QUERY') + "]", req.query);
    console.log("[" + (0, chalk_1.blueBright)('BODY') + "]", req.body);
    next();
}; };
exports.requestLogger = requestLogger;
