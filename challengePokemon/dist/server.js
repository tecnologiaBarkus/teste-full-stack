"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
var dotenv_1 = require("dotenv");
dotenv_1.config();
app_1.app.listen((_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000, function () { return console.log("Server is running 📡"); });
