"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moneyParser_1 = require("../moneyParser");
describe('utils/moneyParser', function () {
    describe('parseMoney', function () {
        it('should format correctly', function () {
            expect((0, moneyParser_1.parseMoney)('1.444,33')).toEqual(1444.33);
        });
        it('should format correctly high value', function () {
            expect((0, moneyParser_1.parseMoney)('999.991.444,33')).toEqual(999991444.33);
        });
        it('should format correctly low value', function () {
            expect((0, moneyParser_1.parseMoney)('3,33')).toEqual(3.33);
        });
    });
});
