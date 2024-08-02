import { expect, describe, it } from "vitest";
import { InMemoryCollaboratorRepository } from "../../repositories/in-memory/in-memory-collaborator-repository copy";
import { CreateCollaboratorUserCase } from "./create-collaborator-user-case";
import { Collaborator } from "../../entities/collaborator/collaborator";

describe("Create collaborator", () => {
    it("deveria ser possivel criar um colaborador", () => {
        const code = "4SXXFMf";

        const appointmentsRepository = new InMemoryCollaboratorRepository();
        const createCollaboratorUserCase = new CreateCollaboratorUserCase(appointmentsRepository);

        expect(
            createCollaboratorUserCase.execute({
                code,
            })
        ).resolves.toBeInstanceOf(Collaborator);
    });
});
