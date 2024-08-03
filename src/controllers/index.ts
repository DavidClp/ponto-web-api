import { InCollaboratorRepository } from "../repositories/implements/in-collaborator-repository";
import { InShiftRepository } from "../repositories/implements/in-shift-repository";
import { CreateCollaboratorUserCase } from "../use-cases/createCollaborator/create-collaborator-user-case";
import { CreateShiftUserCase } from "../use-cases/createShift/create-shift-user-case";
import { FindShiftUserCase } from "../use-cases/findShift/find-shift-user-case";
import { GetTotalDurationMsUserCase } from "../use-cases/getTotalHours/get-total-duration-ms";
import { UpdateShiftUserCase } from "../use-cases/updateShift/update-shift-user-case";
import { CreateCollaboratorController } from "./create-collaborator-controller";
import { CreateShiftController } from "./create-shift-controller";
import { FindShiftController } from "./find-shift-controller";
import { GetTotalDurationMsController } from "./get-total-duration-ms-controller";

const collaboratorRepository = new InCollaboratorRepository();
const createCollaboratorUserCase = new CreateCollaboratorUserCase(collaboratorRepository);
const createCollaboratorController = new CreateCollaboratorController(createCollaboratorUserCase);

const shiftRepository = new InShiftRepository();

const createShiftUserCase = new CreateShiftUserCase(shiftRepository);
const updateShiftUserCase = new UpdateShiftUserCase(shiftRepository);
const findShiftUserCase = new FindShiftUserCase(shiftRepository);
const getTotalDurationMsUserCase = new GetTotalDurationMsUserCase(shiftRepository);

const createShiftController = new CreateShiftController(createShiftUserCase, updateShiftUserCase, findShiftUserCase);
const findShiftController = new FindShiftController(findShiftUserCase);
const getTotalDurationMsController = new GetTotalDurationMsController(getTotalDurationMsUserCase);

export { createCollaboratorController, createShiftController, findShiftController, getTotalDurationMsController };
