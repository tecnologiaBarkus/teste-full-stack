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
exports.TypesPokemonController = void 0;
var path_1 = require("path");
var TypesPokemonRepository_1 = require("../repository/TypesPokemonRepository");
var PokemonRepository_1 = require("../repository/PokemonRepository");
var SendMailService_1 = __importDefault(require("../services/SendMailService"));
var ScheduleRepository_1 = require("../repository/ScheduleRepository");
var TypesPokemonController = /** @class */ (function () {
    function TypesPokemonController() {
    }
    TypesPokemonController.prototype.search = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, type, emails, date, randomPokemons, scheduleDate, params, newSchedule, error_1, apiType, pokemons, items, item, apiPokemons, pokemon, error_2, error_3, path;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, type = _a.type, emails = _a.emails, date = _a.date;
                        randomPokemons = [];
                        if (!!isNaN(new Date(date).getTime())) return [3 /*break*/, 7];
                        scheduleDate = new Date(date);
                        if (!(scheduleDate >= new Date())) return [3 /*break*/, 5];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        params = {
                            type: type,
                            emails: emails,
                            date: date,
                            send: false
                        };
                        return [4 /*yield*/, ScheduleRepository_1.ScheduleRepository.create(params)];
                    case 2:
                        newSchedule = _b.sent();
                        return [2 /*return*/, res.status(201).send({ message: 'Scheduled email sending...', data: newSchedule })];
                    case 3:
                        error_1 = _b.sent();
                        res.status(500).send({ message: "Internal Server Error" });
                        return [3 /*break*/, 4];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        res.status(400).send({ message: "Date is not a valid " });
                        _b.label = 6;
                    case 6: return [3 /*break*/, 18];
                    case 7:
                        _b.trys.push([7, 15, , 16]);
                        return [4 /*yield*/, TypesPokemonRepository_1.TypesPokemonRepository.find(type)];
                    case 8:
                        apiType = _b.sent();
                        pokemons = {
                            pokemon: apiType.pokemon
                        };
                        items = pokemons.pokemon;
                        _b.label = 9;
                    case 9:
                        if (!(randomPokemons.length <= 4)) return [3 /*break*/, 14];
                        item = items[Math.floor(Math.random() * items.length)];
                        _b.label = 10;
                    case 10:
                        _b.trys.push([10, 12, , 13]);
                        return [4 /*yield*/, PokemonRepository_1.PokemonRepository.find(item.pokemon.name)];
                    case 11:
                        apiPokemons = _b.sent();
                        pokemon = {
                            id: apiPokemons.id,
                            types: apiPokemons.types,
                            photo: apiPokemons.sprites.front_default,
                            name: apiPokemons.name,
                            weight: apiPokemons.weight,
                            height: apiPokemons.height,
                            base_experience: apiPokemons.base_experience
                        };
                        randomPokemons.push(pokemon);
                        return [3 /*break*/, 13];
                    case 12:
                        error_2 = _b.sent();
                        res.status(500).send({ message: "Internal Server Error" });
                        return [3 /*break*/, 13];
                    case 13: return [3 /*break*/, 9];
                    case 14: return [3 /*break*/, 16];
                    case 15:
                        error_3 = _b.sent();
                        res.status(500).send({ message: "Internal Server Error" });
                        return [3 /*break*/, 16];
                    case 16:
                        path = path_1.resolve(__dirname, "..", "..", "src", "views", "emails", "layout.hbs");
                        return [4 /*yield*/, SendMailService_1.default.send(emails, type, { type: type, randomPokemons: randomPokemons }, path)];
                    case 17:
                        _b.sent();
                        return [2 /*return*/, res.json(randomPokemons)];
                    case 18: return [2 /*return*/];
                }
            });
        });
    };
    return TypesPokemonController;
}());
exports.TypesPokemonController = TypesPokemonController;
