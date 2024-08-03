import { Request, Response } from "express";
import { CreateCollaboratorUserCase } from "../use-cases/createCollaborator/create-collaborator-user-case";

export class CreateCollaboratorController {
    constructor(private createdCollaboratorUserCase: CreateCollaboratorUserCase) {}

    async handle(req: Request, res: Response) {
        const { code } = req.body;

        try {
            const collaborator = await this.createdCollaboratorUserCase.execute({ code });
            return res.status(201).json(collaborator);
        } catch (error) {
            const status = error.status || 500;
            const message = error.message || "Internal Server Error";
            return res.status(status).json({ error: message });
        }
    }
}
