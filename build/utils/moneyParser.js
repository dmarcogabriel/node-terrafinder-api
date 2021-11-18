"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseMoney = void 0;
var parseMoney = function (value) {
    if (typeof value === 'string') {
        var parsed = parseFloat(value.replace(/(\.)/g, '').replace(',', '.'));
        return parsed;
    }
    return value;
};
exports.parseMoney = parseMoney;
