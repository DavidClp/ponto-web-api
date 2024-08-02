import { Collaborator } from "../entities/collabotator/collaborator";

export interface CollaboratorRepository {
    create(collaborator: Collaborator): Promise<void>;
}
