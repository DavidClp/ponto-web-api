import { expect, describe, it } from "vitest";
import { FindShiftUserCase } from "./find-shift-user-case";
import { CreateShiftUserCase } from "../createShift/create-shift-user-case";
import { InMemoryShiftRepository } from "../../repositories/in-memory/in-memory-shift-repository";
import { convertDateToUTC } from "../../utils/convertDateToUTC";

describe("find Shift by CollaboratorCode And by Date", () => {
    it("deveria ser possível buscar os turnos existentes do dia", async () => {
        const collaboratorCode = "4SXXFMf";
        const entry = new Date("2024-08-02T14:00:00Z");

        const shiftRepository = new InMemoryShiftRepository();
        const findShiftUserCase = new FindShiftUserCase(shiftRepository);
        const createShiftUserCase = new CreateShiftUserCase(shiftRepository);

        await createShiftUserCase.execute({
            collaboratorCode,
            entry,
        });

        const shifts = await findShiftUserCase.findByCollaboratorCodeAndDate({
            collaboratorCode,
            pointDate: entry,
        });

        expect(shifts).not.toHaveLength(0);
        expect(shifts[0]).toMatchObject({
            collaboratorCode,
            entry: convertDateToUTC(entry),
            exit: null,
            totalDurationMs: null,
        });
    });
});

describe("find Shift by CollaboratorCode And by Month", () => {
    it("deveria ser possível buscar os turnos existentes do mes", async () => {
        const collaboratorCode = "4SXXFMf";
        const entry = new Date("2024-08-02T14:00:00Z");

        const shiftRepository = new InMemoryShiftRepository();
        const findShiftUserCase = new FindShiftUserCase(shiftRepository);
        const createShiftUserCase = new CreateShiftUserCase(shiftRepository);

        await createShiftUserCase.execute({
            collaboratorCode,
            entry,
        });

        const shifts = await findShiftUserCase.findByCollaboratorCodeAndMonth({
            collaboratorCode,
            year: entry.getFullYear(),
            month: entry.getMonth(),
        });

        expect(shifts).not.toHaveLength(0);
        expect(shifts[0]).toMatchObject({
            collaboratorCode,
            entry: convertDateToUTC(entry),
            exit: null,
        });
    });
});
