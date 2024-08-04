import { expect, describe, it } from "vitest";
import { InMemoryShiftRepository } from "../../repositories/in-memory/in-memory-shift-repository";
import { UpdateShiftUserCase } from "./update-shift-user-case";
import { CreateShiftUserCase } from "../createShift/create-shift-user-case";
import { Shift } from "../../entities/shift/shift";

describe("Create Shift", () => {
    it("deveria ser possível atualizar um turno", async () => {
        const collaboratorCode = "4SXXFMf";
        const entry = new Date("2024-08-02T14:00:00Z");
        const exit = new Date("2024-08-02T18:00:00Z");
        const totalDurationMs = 14400000;

        const shift = new Shift(collaboratorCode, entry);

        const shiftRepository = new InMemoryShiftRepository();
        const createShiftUserCase = new CreateShiftUserCase(shiftRepository);
        const updateShiftUserCase = new UpdateShiftUserCase(shiftRepository);

        await createShiftUserCase.execute({
            collaboratorCode,
            entry,
        });

        shift.exit = exit;
        await updateShiftUserCase.execute(shift);

        const shifts = shiftRepository.shifts;

        expect(shifts).toHaveLength(1);
        expect(shifts[0]).toMatchObject({
            collaboratorCode,
            entry: entry,
            exit: exit,
            totalDurationMs: totalDurationMs,
        });
    });
});
