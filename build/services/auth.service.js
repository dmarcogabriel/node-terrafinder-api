"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var SECRET_HASH = process.env.SECRET;
var authorize = function (req, res, next) {
    var token = String(req.headers['x-access-token']);
    if (!token) {
        res.status(401).json({
            data: { auth: false },
            message: 'Acesso restrito',
        });
        console.error('auth.service > authorize > Acesso restrito');
    }
    else {
        jsonwebtoken_1.default.verify(token, SECRET_HASH || '', function (error) {
            if (error) {
                res.status(401).json({
                    data: { auth: false },
                    message: 'Token inválido',
                });
                console.error('auth.service > authorize > Token inválido');
            }
            else
                next();
        });
    }
};
exports.default = { authorize: authorize };
