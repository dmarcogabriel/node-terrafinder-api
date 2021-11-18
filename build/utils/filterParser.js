"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPropertyFilter = exports.parseRangeFilter = void 0;
var lodash_1 = require("lodash");
var MAX_AMOUNT = 50000000;
var MAX_SIZE = 350;
var parseRangeFilter = function (queryValue) {
    var parsedValue = JSON.parse(queryValue);
    if (!(0, lodash_1.isArray)(parsedValue) || (0, lodash_1.isNil)(parsedValue))
        return null;
    var min = parsedValue[0], max = parsedValue[1];
    return { $gte: min, $lte: max };
};
exports.parseRangeFilter = parseRangeFilter;
var createPropertyFilter = function (query) {
    var filters = {};
    if (query.isActive)
        filters.isActive = { $eq: JSON.parse(query.isActive) };
    if (query.size) {
        var _a = JSON.parse(query.size), min = _a[0], max = _a[1];
        var size = { $gte: String(min) };
        if (max < MAX_SIZE)
            size.$lte = String(max);
        filters.size = size;
    }
    if (query.propertyKind)
        filters.propertyKind = { $eq: query.propertyKind };
    if (query.state)
        filters.state = { $eq: query.state };
    if (query.city)
        filters.nearbyCity = { $regex: new RegExp("" + query.city) };
    // todo: add code filter
    return (0, lodash_1.isNil)(filters) ? null : filters;
};
exports.createPropertyFilter = createPropertyFilter;
