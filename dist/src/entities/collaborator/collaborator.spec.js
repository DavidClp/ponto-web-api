"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const collaborator_1 = require("./collaborator");
(0, vitest_1.test)("criando entidade Colaborador", () => {
    const code = "4SXXFMf";
    const collaborator = new collaborator_1.Collaborator(code);
    (0, vitest_1.expect)(collaborator).toBeInstanceOf(collaborator_1.Collaborator);
    (0, vitest_1.expect)(collaborator.code).toEqual(code);
});
