import { CollaboratorRepository } from "../../repositories/collaborator-repository";
import { Collaborator } from "../../entities/collaborator/collaborator";

interface CreateCollaboratorRequest {
    code: string;
}

type CreateCollaboratorResponse = Collaborator;

export class CreateCollaboratorUserCase {
    constructor(private collaboratorRepository: CollaboratorRepository) {}

    async execute(data: CreateCollaboratorRequest): Promise<CreateCollaboratorResponse> {
        const code = data.code;

        const collaborator = await this.collaboratorRepository.findByCode(code);
        if (collaborator) {
            return collaborator;
        }

        const newCollaborator = new Collaborator(code);

        const collaboratorCreate = await this.collaboratorRepository.create(newCollaborator);

        return collaboratorCreate;
    }
}
