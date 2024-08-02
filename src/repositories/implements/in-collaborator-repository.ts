import { prismaCliente } from "../../database/prismaClient";
import { Collaborator } from "../../entities/collaborator/collaborator";

export class InCollaboratorRepository implements InCollaboratorRepository {
    async create(collaborator: Collaborator): Promise<Collaborator> {
        const collaboratorCreate = await prismaCliente.collaborator.create({
            data: {
                code: collaborator.code,
            },
        });

        return new Collaborator(collaboratorCreate.code, collaborator.id);
    }
}
