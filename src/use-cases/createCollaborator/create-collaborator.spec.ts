import { expect, describe, it } from "vitest";
import { InMemoryCollaboratorRepository } from "../../repositories/in-memory/in-memory-collaborator-repository";
import { CreateCollaboratorUserCase } from "./create-collaborator-user-case";
import { Collaborator } from "../../entities/collaborator/collaborator";

describe("Create collaborator", () => {
    it("deveria ser possivel criar um colaborador", () => {
        const code = "4SXXFMf";

        const collaboratorRepository = new InMemoryCollaboratorRepository();
        const createCollaboratorUserCase = new CreateCollaboratorUserCase(collaboratorRepository);

        expect(
            createCollaboratorUserCase.execute({
                code,
            })
        ).resolves.toBeInstanceOf(Collaborator);
    });
});
