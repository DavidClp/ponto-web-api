import { Router } from "express";
import {
    createCollaboratorController,
    createShiftController,
    findShiftController,
    getTotalDurationMsController,
} from "./controllers";

const router = Router();

router.post("/collaborator", (request, response) => {
    return createCollaboratorController.handle(request, response);
});

router.post("/shift", (request, response) => {
    return createShiftController.handle(request, response);
});

router.get("/shift", (request, response) => {
    return findShiftController.handleFindByCollaboratorCodeAndMonth(request, response);
});

router.get("/total-hours", (request, response) => {
    return getTotalDurationMsController.handle(request, response);
});

export { router };
