import { Router } from "express";
import { createCollaboratorController, createShiftController } from "./controllers";

const router = Router();

router.post("/collaborator", (request, response) => {
    return createCollaboratorController.handle(request, response);
});

router.post("/shift", (request, response) => {
    return createShiftController.handle(request, response);
});

export { router };
