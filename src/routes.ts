import { Router } from "express";
import { createCollaborator } from "./controllers";

const router = Router();

router.post("/collaborator", (request, response) => {
    return createCollaborator.handle(request, response);
});

export { router };
