"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const in_memory_shift_repository_1 = require("../../repositories/in-memory/in-memory-shift-repository");
const create_shift_user_case_1 = require("../createShift/create-shift-user-case");
const shift_1 = require("../../entities/shift/shift");
const update_shift_user_case_1 = require("../updateShift/update-shift-user-case");
const get_total_duration_ms_1 = require("./get-total-duration-ms");
(0, vitest_1.describe)("Create Shift", () => {
    (0, vitest_1.it)("deveria ser possível buscar total horas trabalhadas", () => __awaiter(void 0, void 0, void 0, function* () {
        const collaboratorCode = "4SXXFMf";
        const entry = new Date("2024-08-02T14:00:00Z");
        const exit = new Date("2024-08-02T18:00:00Z");
        const totalDurationMs = 14400000;
        const shift = new shift_1.Shift(collaboratorCode, entry);
        const shiftRepository = new in_memory_shift_repository_1.InMemoryShiftRepository();
        const createShiftUserCase = new create_shift_user_case_1.CreateShiftUserCase(shiftRepository);
        const updateShiftUserCase = new update_shift_user_case_1.UpdateShiftUserCase(shiftRepository);
        const getTotalDurationMsUserCase = new get_total_duration_ms_1.GetTotalDurationMsUserCase(shiftRepository);
        yield createShiftUserCase.execute({
            collaboratorCode,
            entry,
        });
        shift.exit = exit;
        yield updateShiftUserCase.execute(shift);
        const totalMs = yield getTotalDurationMsUserCase.execute({ collaboratorCode, year: 2024, month: 7 });
        (0, vitest_1.expect)(totalMs).toEqual(totalDurationMs);
    }));
});
