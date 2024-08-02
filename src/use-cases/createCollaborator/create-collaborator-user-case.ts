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

        const collaborator = new Collaborator(code);

        const collaboratorCreate = await this.collaboratorRepository.create(collaborator);

        return collaboratorCreate;
    }
}
