"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var ApiController_1 = require("./controller/ApiController");
var router = express_1.Router();
exports.router = router;
var apiController = new ApiController_1.ApiController();
router.get("/pokemon", apiController.start);
