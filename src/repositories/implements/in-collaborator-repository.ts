import { prismaCliente } from "../../database/prismaClient";
import { Collaborator } from "../../entities/collaborator/collaborator";
import { CollaboratorRepository } from "../collaborator-repository";

export class InCollaboratorRepository implements CollaboratorRepository {
    async create(collaborator: Collaborator): Promise<Collaborator> {
        const collaboratorCreate = await prismaCliente.collaborator.create({
            data: {
                code: collaborator.code,
            },
        });

        return new Collaborator(collaboratorCreate.code, collaboratorCreate.id);
    }

    async findByCode(collaboratorcode: string): Promise<Collaborator> {
        const collaborator = await prismaCliente.collaborator.findUnique({
            where: {
                code: collaboratorcode,
            },
        });

        if (!collaborator) return null;

        return new Collaborator(collaborator.code, collaborator.id);
    }
}
