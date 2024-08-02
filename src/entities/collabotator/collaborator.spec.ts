import { test, expect } from "vitest";
import { Collaborator } from "./collaborator";

test("criando entidade Colaborador", () => {
  const code = "4SXXFMf";

  const collaborator = new Collaborator({ code });

  expect(collaborator).toBeInstanceOf(Collaborator);
  expect(collaborator.code).toEqual(code);
});
