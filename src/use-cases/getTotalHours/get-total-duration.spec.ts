import { expect, describe, it } from "vitest";
import { InMemoryShiftRepository } from "../../repositories/in-memory/in-memory-shift-repository";
import { CreateShiftUserCase } from "../createShift/create-shift-user-case";
import { Shift } from "../../entities/shift/shift";
import { UpdateShiftUserCase } from "../updateShift/update-shift-user-case";
import { GetTotalDurationMsUserCase } from "./get-total-duration-ms";

describe("Create Shift", () => {
    it("deveria ser possível buscar total horas trabalhadas", async () => {
        const collaboratorCode = "4SXXFMf";
        const entry = new Date("2024-08-02T14:00:00Z");
        const exit = new Date("2024-08-02T18:00:00Z");
        const totalDurationMs = 14400000;

        const shift = new Shift(collaboratorCode, entry);

        const shiftRepository = new InMemoryShiftRepository();
        const createShiftUserCase = new CreateShiftUserCase(shiftRepository);
        const updateShiftUserCase = new UpdateShiftUserCase(shiftRepository);
        const getTotalDurationMsUserCase = new GetTotalDurationMsUserCase(shiftRepository);

        await createShiftUserCase.execute({
            collaboratorCode,
            entry,
        });

        shift.exit = exit;
        await updateShiftUserCase.execute(shift);

        const totalMs = await getTotalDurationMsUserCase.execute({ collaboratorCode, year: 2024, month: 7 });

        expect(totalMs).toEqual(totalDurationMs);
    });
});
