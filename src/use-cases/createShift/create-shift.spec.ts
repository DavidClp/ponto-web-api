import { expect, describe, it } from "vitest";
import { InMemoryShiftRepository } from "../../repositories/in-memory/in-memory-shift-repository";
import { CreateShiftUserCase } from "./create-shift-user-case";
import { convertDateToUTC } from "../../utils/convertDateToUTC";

describe("Create Shift", () => {
    it("deveria ser possível criar um turno", async () => {
        const collaboratorCode = "4SXXFMf";
        const entry = new Date("2024-08-02T14:00:00Z");

        const shiftRepository = new InMemoryShiftRepository();
        const createShiftUserCase = new CreateShiftUserCase(shiftRepository);

        await createShiftUserCase.execute({
            collaboratorCode,
            entry,
        });

        const shifts = shiftRepository.shifts;

        expect(shifts).toHaveLength(1);
        expect(shifts[0]).toMatchObject({
            collaboratorCode,
            entry: convertDateToUTC(entry),
            exit: null,
            totalDurationMs: null,
        });
    });
});
