"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = require("chalk");
var date_fns_1 = require("date-fns");
var fs_extra_1 = __importDefault(require("fs-extra"));
var path_1 = __importDefault(require("path"));
var error = console.error, info = console.info, log = console.log;
var timestamp = function () { return (0, date_fns_1.format)(new Date(), 'PPpp'); };
var registerLog = function (logObject) {
    /**
     * ! Don't call any console.log methods here, because it will enter in
     * ! an eternal loop.
     *
     * * This function will register a single log in a log file,
     * * the log file is generated each day
     */
    if (process.env.NODE_ENV !== 'production')
        return;
    var filename = "log-" + (0, date_fns_1.format)(new Date(), 'dd-MM-yy') + ".log";
    var pathToLogFile = path_1.default.join(__dirname, '..', 'logs', filename);
    var logData = JSON.stringify(logObject)
        .replace(/\\u([0-9]{3}b)/g, '')
        .replace(/\[([0-9]{2}m)/g, ''); // * These 2 'replaces' removes the colors characteres
    fs_extra_1.default.appendFileSync(pathToLogFile, logData + "\n");
    // todo: we can connect with grafana in the future
};
console.error = function () {
    var data = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        data[_i] = arguments[_i];
    }
    registerLog({ error: { timestamp: timestamp(), data: data } });
    error((0, chalk_1.redBright)('[error] | ', timestamp(), data));
};
console.info = function (name) {
    var data = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        data[_i - 1] = arguments[_i];
    }
    registerLog({ info: { timestamp: timestamp(), data: data } });
    info.apply(void 0, __spreadArray(["[" + (0, chalk_1.blueBright)(name.toLowerCase()) + "] | " + timestamp() + " > "], data, false));
};
console.log = function () {
    var data = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        data[_i] = arguments[_i];
    }
    registerLog({ log: { timestamp: timestamp(), data: data } });
    log.apply(void 0, __spreadArray(["[" + (0, chalk_1.blueBright)('log') + "] |"], data, false));
};
