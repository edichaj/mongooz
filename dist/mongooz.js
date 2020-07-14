"use strict";
/**
 * Mongooz
 * A simple js library that fascilitates CRUD operations with MongoDB
 * Purely asynchronous
 * @author Edicha Joshua (for Aptsoft)
 */
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
exports.__esModule = true;
exports.Mongooz = void 0;
var connection_1 = require("./connection");
var crud_1 = require("./crud");
/**
 * Mongooz
 * @description wrapper class
 */
var Mongooz = /** @class */ (function () {
    function Mongooz(url) {
        this._url = url;
    }
    Mongooz.prototype.insertMany = function (documents, lookUpOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var response, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.updateAndValidateLookupOptions(lookUpOptions);
                        return [4 /*yield*/, this.ensureConnectionIsEstablishedAndOpen()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 6]);
                        return [4 /*yield*/, this._connection.use({ db: this._dbName, collection: this._collectionName })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, crud_1.Inserter.insertMany(this._connection.collection(), documents)];
                    case 4:
                        response = _a.sent();
                        return [2 /*return*/, response];
                    case 5:
                        err_1 = _a.sent();
                        throw err_1;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Mongooz.prototype.findAll = function (query, lookUpOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, err_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.updateAndValidateLookupOptions(lookUpOptions);
                        return [4 /*yield*/, this.ensureConnectionIsEstablishedAndOpen()];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 6, , 7]);
                        return [4 /*yield*/, this._connection.use({ db: this._dbName, collection: this._collectionName })];
                    case 3:
                        _b.sent();
                        _a = this;
                        return [4 /*yield*/, crud_1.Finder.findAll(this._connection.collection(), query)];
                    case 4: return [4 /*yield*/, (_b.sent())];
                    case 5:
                        _a._lastRead = _b.sent();
                        return [2 /*return*/, this._lastRead];
                    case 6:
                        err_2 = _b.sent();
                        throw err_2;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    Mongooz.prototype.updateMany = function (filter, updateQuery, lookUpOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.updateAndValidateLookupOptions(lookUpOptions);
                        return [4 /*yield*/, this.ensureConnectionIsEstablishedAndOpen()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 6]);
                        return [4 /*yield*/, this._connection.use({ db: this._dbName, collection: this._collectionName })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, crud_1.Updater.updateMany(this._connection.collection(), filter, updateQuery)];
                    case 4: return [2 /*return*/, _a.sent()];
                    case 5:
                        err_3 = _a.sent();
                        throw err_3;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Mongooz.prototype.deleteMany = function (filter, lookUpOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.updateAndValidateLookupOptions(lookUpOptions)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.ensureConnectionIsEstablishedAndOpen()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 6, , 7]);
                        return [4 /*yield*/, this._connection.use({ db: this._dbName, collection: this._collectionName })];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, crud_1.Deleter.deleteMany(this._connection.collection(), filter)];
                    case 5: return [2 /*return*/, _a.sent()];
                    case 6:
                        err_4 = _a.sent();
                        throw err_4;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    Mongooz.prototype.openConnection = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, err_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        _a = !this._connection || this._connection.notInitialized();
                        if (_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._connection.isClosed()];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        if (!_a) return [3 /*break*/, 4];
                        this._connection = new connection_1.MongoozConnection();
                        return [4 /*yield*/, this._connection.open(this._url)];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        err_5 = _b.sent();
                        throw err_5;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Mongooz.prototype.closeConnection = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._connection.isOpen()) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._connection.close()];
                    case 1:
                        _a.sent();
                        this._connection = new connection_1.MongoozConnection();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    Mongooz.prototype.updateAndValidateLookupOptions = function (lookUpOptions) {
        if (lookUpOptions) {
            this._dbName = lookUpOptions.db || this._dbName;
            this._collectionName = lookUpOptions.collection || this._collectionName;
        }
        if (!this._dbName || !this._collectionName) {
            throw (new Error("lookUpOptions can only be omitted if there is already cached values for it"));
        }
    };
    Mongooz.prototype.ensureConnectionIsEstablishedAndOpen = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this._connection.notInitialized();
                        if (_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._connection.isClosed()];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        if (_a) {
                            throw (new Error("ensure connection is open before performing any operation"));
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return Mongooz;
}());
exports.Mongooz = Mongooz;
