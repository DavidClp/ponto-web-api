import { Collaborator } from "../entities/collaborator/collaborator";

export interface CollaboratorRepository {
    create(collaborator: Collaborator): Promise<Collaborator>;

    findByCode(collaboratorcode: string): Promise<Collaborator>;
}
