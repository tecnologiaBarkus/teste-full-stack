"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var TypesPokemonController_1 = require("./controller/TypesPokemonController");
var router = express_1.Router();
exports.router = router;
var typesPokemonController = new TypesPokemonController_1.TypesPokemonController();
router.get("/type", typesPokemonController.search);
