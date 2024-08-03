import { InCollaboratorRepository } from "../repositories/implements/in-collaborator-repository";
import { InShiftRepository } from "../repositories/implements/in-shift-repository";
import { CreateCollaboratorUserCase } from "../use-cases/createCollaborator/create-collaborator-user-case";
import { CreateShiftUserCase } from "../use-cases/createShift/create-shift-user-case";
import { FindShiftUserCase } from "../use-cases/findShift/find-shift-user-case";
import { UpdateShiftUserCase } from "../use-cases/updateShift/update-shift-user-case";
import { CreateCollaboratorController } from "./create-collaborator-controller";
import { CreateShiftController } from "./create-shift-controller";

const collaboratorRepository = new InCollaboratorRepository();
const createCollaboratorUserCase = new CreateCollaboratorUserCase(collaboratorRepository);
const createCollaboratorController = new CreateCollaboratorController(createCollaboratorUserCase);

const shiftRepository = new InShiftRepository();

const createShiftUserCase = new CreateShiftUserCase(shiftRepository);
const updateShiftUserCase = new UpdateShiftUserCase(shiftRepository);
const findShiftUserCase = new FindShiftUserCase(shiftRepository);

const createShiftController = new CreateShiftController(createShiftUserCase, updateShiftUserCase, findShiftUserCase);

export { createCollaboratorController, createShiftController };
