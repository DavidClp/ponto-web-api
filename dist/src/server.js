"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = require("express");
const routes_1 = require("./routes");
const cors_1 = require("cors");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
}));
app.use(express_1.default.json());
app.use(routes_1.router);
app.listen(8888, () => console.log("Server is running"));
