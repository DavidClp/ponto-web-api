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
            const status = error.status || 500; // Defina um status padrão se não existir
            const message = error.message || "Internal Server Error"; // Defina uma mensagem padrão se não existir
            return res.status(status).json({ error: message });
        }
    }
}
