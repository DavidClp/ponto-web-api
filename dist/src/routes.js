"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const controllers_1 = require("./controllers");
const router = (0, express_1.Router)();
exports.router = router;
router.post("/collaborator", (request, response) => {
    return controllers_1.createCollaboratorController.handle(request, response);
});
router.post("/shift", (request, response) => {
    return controllers_1.createShiftController.handle(request, response);
});
router.get("/shift", (request, response) => {
    return controllers_1.findShiftController.handleFindByCollaboratorCodeAndMonth(request, response);
});
router.get("/total-hours", (request, response) => {
    return controllers_1.getTotalDurationMsController.handle(request, response);
});
