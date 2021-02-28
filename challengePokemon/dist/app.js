"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = __importDefault(require("express"));
var routes_1 = require("./routes");
var mongoose_1 = __importDefault(require("mongoose"));
var dotenv_1 = require("dotenv");
dotenv_1.config();
var app = express_1.default();
exports.app = app;
app.use(express_1.default.json());
app.use(routes_1.router);
mongoose_1.default.connect("mongodb+srv://" + process.env.MONGO_USER + ":" + process.env.MONGO_PASS +
    ("@" + process.env.MONGO_CLUSTER + "/" + process.env.MONGO_DB + "?retryWrites=true&w=majority"), {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function (err) {
    if (!err) {
        console.log('connected to database!');
    }
    else {
        console.log('mongo error', err);
        console.log('user', process.env.MONGO_USER);
    }
});
