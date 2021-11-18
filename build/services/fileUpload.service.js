"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFileFromStorage = exports.saveFileOnStorage = void 0;
var fs_extra_1 = __importDefault(require("fs-extra"));
var path_1 = __importDefault(require("path"));
var _storageDir = path_1.default.join(__dirname, '..', 'storage');
var _setFileName = function (fileName) {
    var extension = fileName.substr(fileName.lastIndexOf('.')); // > .png
    return "" + new Date().getTime() + extension; // > 1246548321.png
};
var saveFileOnStorage = function (file) {
    var fileName = _setFileName(file.name);
    file.mv(path_1.default.join(_storageDir, fileName));
    return fileName;
};
exports.saveFileOnStorage = saveFileOnStorage;
var deleteFileFromStorage = function (fileName) {
    try {
        fs_extra_1.default.unlinkSync(path_1.default.join(_storageDir, fileName));
        console.log("File " + fileName + " deleted!");
        return true;
    }
    catch (error) {
        console.error("Failed to delete file: " + fileName);
        if (error)
            console.log(error);
        return false;
    }
};
exports.deleteFileFromStorage = deleteFileFromStorage;
