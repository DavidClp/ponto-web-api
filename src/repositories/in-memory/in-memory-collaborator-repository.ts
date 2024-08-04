import { Collaborator } from "../../entities/collaborator/collaborator";
import { CollaboratorRepository } from "../collaborator-repository";

export class InMemoryCollaboratorRepository implements CollaboratorRepository {
    private collaborator: Collaborator = null; // Simulação de um banco de dados

    async create(collaborator: Collaborator): Promise<Collaborator> {
        this.collaborator = collaborator;

        return this.collaborator;
    }

    findByCode(collaboratorCode: string): Promise<Collaborator> {
        console.log("AAAAAAAAAAAAAAAAAA", collaboratorCode);

        if (!this.collaborator) return null;

        if (this.collaborator.code === collaboratorCode) {
            return Promise.resolve(this.collaborator);
        } else {
            return null;
        }
    }
}
