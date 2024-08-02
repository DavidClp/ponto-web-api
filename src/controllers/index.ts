import { InCollaboratorRepository } from "../repositories/implements/in-collaborator-repository";
import { CreateCollaboratorUserCase } from "../use-cases/createCollaborator/create-collaborator-user-case";
import { CreateCollaboratorController } from "./create-collaborator-controller";

const collaboratorRepository = new InCollaboratorRepository();

const createCollaboratorUserCase = new CreateCollaboratorUserCase(collaboratorRepository);

const createCollaborator = new CreateCollaboratorController(createCollaboratorUserCase);

export { createCollaborator };
