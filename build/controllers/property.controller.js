"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var property_repository_1 = __importDefault(require("../repositories/property/property.repository"));
var post = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var property, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, property_repository_1.default.create(req.body)];
            case 1:
                property = _a.sent();
                res.status(201)
                    .json({ message: 'Anúncio criado com sucesso!', data: { property: property } });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error(error_1);
                res.status(500).json({
                    message: '[Error] failed to save property',
                    data: { error: error_1 },
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var getAll = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, properties, total, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                return [4 /*yield*/, property_repository_1.default.getProperties(req.query)];
            case 1:
                _a = _b.sent(), properties = _a.properties, total = _a.total;
                res.status(200).json({
                    message: 'ok',
                    data: { properties: properties, total: total },
                });
                return [3 /*break*/, 3];
            case 2:
                err_1 = _b.sent();
                console.error(err_1);
                res.send(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var getById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, property, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, property_repository_1.default.getById(id)];
            case 2:
                property = _a.sent();
                if (!property) {
                    res.status(400).json({
                        message: 'Propriedade não encontrada',
                    });
                }
                else {
                    res.status(200).json({ message: 'ok', data: { property: property } });
                }
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                res.status(500).json({
                    message: '[Error] Malformed id',
                    data: { error: error_2 },
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var getAllByUserId = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, properties, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.params.userId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, property_repository_1.default.getByUserId(userId)];
            case 2:
                properties = _a.sent();
                if (!properties.length) {
                    res.status(404).json({
                        message: 'Propriedade não encontrada',
                    });
                }
                else {
                    res.status(200).json({ message: 'ok', data: { properties: properties } });
                }
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                res.status(500).json({
                    message: '[Error] Malformed id',
                    data: { error: error_3 },
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var updatePropertyPhotos = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var files, params, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.files) {
                    res.status(400).json({ message: 'Nenhuma imagem foi selecionada' });
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                files = req.files, params = req.params;
                if (!files)
                    throw new Error('files field is missing');
                return [4 /*yield*/, property_repository_1.default.updatePhotos(files, params.id)];
            case 2:
                _a.sent();
                res.status(201).json({
                    message: 'Imagem adicionada com sucesso',
                });
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                res.status(500).json({
                    message: 'Ocorreu um erro ao fazer upload',
                    data: { error: error_4 },
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var deleteProperty = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.params.id) {
                    res.status(400).json({ message: 'Falta o parametro ID' });
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, property_repository_1.default.deleteProperty(req.params.id)];
            case 2:
                _a.sent();
                res.status(201).json({
                    message: 'Deletado com sucesso',
                });
                return [3 /*break*/, 4];
            case 3:
                error_5 = _a.sent();
                res.status(500).json({
                    message: 'Ocorreu um erro ao deletar',
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.default = {
    getAll: getAll,
    getById: getById,
    getAllByUserId: getAllByUserId,
    post: post,
    deleteProperty: deleteProperty,
    updatePropertyPhotos: updatePropertyPhotos,
    updateProperty: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var property, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, property_repository_1.default.updateProperty(req.params.id, req.body)];
                case 1:
                    property = _a.sent();
                    res.status(200).json({
                        message: 'Anúncio de propriedade atualizado com sucesso!',
                        data: { property: property },
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_6 = _a.sent();
                    console.error('property.controller > updateProperty', error_6);
                    res.status(500).json({
                        message: 'Erro ao ativar anúncio da propriedade',
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    getPropertyFilters: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var filters, error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, property_repository_1.default.getFilters(req.query)];
                case 1:
                    filters = _a.sent();
                    console.log('[RETURN]', { filters: filters });
                    res.status(200).json({ filters: filters });
                    return [3 /*break*/, 3];
                case 2:
                    error_7 = _a.sent();
                    console.error('property.controller > getPropertyFilters', error_7);
                    res.status(500).json({
                        message: 'Erro ao buscar filtros',
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); },
};
