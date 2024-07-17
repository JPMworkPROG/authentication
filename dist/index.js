"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const databaseConfig_impl_1 = __importDefault(require("./config/database/databaseConfig.impl"));
const app = (0, express_1.default)();
const port = 3000;
databaseConfig_impl_1.default.connect();
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
