"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const in_memory_collaborator_repository_1 = require("../../repositories/in-memory/in-memory-collaborator-repository");
const create_collaborator_user_case_1 = require("./create-collaborator-user-case");
const collaborator_1 = require("../../entities/collaborator/collaborator");
(0, vitest_1.describe)("Create collaborator", () => {
    (0, vitest_1.it)("deveria ser possivel criar um colaborador", () => {
        const code = "4SXXFMf";
        const collaboratorRepository = new in_memory_collaborator_repository_1.InMemoryCollaboratorRepository();
        const createCollaboratorUserCase = new create_collaborator_user_case_1.CreateCollaboratorUserCase(collaboratorRepository);
        (0, vitest_1.expect)(createCollaboratorUserCase.execute({
            code,
        })).resolves.toBeInstanceOf(collaborator_1.Collaborator);
    });
});
