"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.putMethod = void 0;
var putMethod = function () { return function (req, _, next) {
    if (req.method === 'PUT')
        req.body = __assign(__assign({}, req.body), { updatedAt: new Date() });
    next();
}; };
exports.putMethod = putMethod;
