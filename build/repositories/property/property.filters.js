"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterProperties = void 0;
var moneyParser_1 = require("../../utils/moneyParser");
var MAX_AMOUNT = 50000000.00;
var MAX_SIZE = 350;
var filterProperties = function (properties, filters) { return properties
    .filter(function (property) {
    if (filters.isActive) {
        if (property.plan && property.plan.isActive) {
            return property.plan.isActive === JSON.parse(filters.isActive);
        }
        return false;
    }
    return true;
})
    .filter(function (property) {
    if (filters.propertyKind) {
        return filters.propertyKind === property.propertyKind;
    }
    return true;
})
    .filter(function (property) {
    if (filters.state) {
        return filters.state === property.state;
    }
    return true;
})
    .filter(function (property) {
    if (filters.nearbyCity) {
        return property.nearbyCity.includes(filters.nearbyCity);
    }
    return true;
})
    .filter(function (property) {
    if (filters.amountMin) {
        return property.amount > (0, moneyParser_1.parseMoney)(filters.amountMin);
    }
    return true;
})
    .filter(function (property) {
    if (filters.amountMax && (0, moneyParser_1.parseMoney)(filters.amountMax) < MAX_AMOUNT) {
        return property.amount < (0, moneyParser_1.parseMoney)(filters.amountMax);
    }
    return true;
})
    .filter(function (property) {
    if (filters.sizeMin) {
        return property.size > filters.sizeMin;
    }
    return true;
})
    .filter(function (property) {
    if (filters.sizeMax && filters.sizeMax < MAX_SIZE) {
        return property.size < filters.sizeMax;
    }
    return true;
}); };
exports.filterProperties = filterProperties;
