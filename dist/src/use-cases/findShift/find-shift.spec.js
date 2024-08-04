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
const find_shift_user_case_1 = require("./find-shift-user-case");
const create_shift_user_case_1 = require("../createShift/create-shift-user-case");
const in_memory_shift_repository_1 = require("../../repositories/in-memory/in-memory-shift-repository");
(0, vitest_1.describe)("find Shift by CollaboratorCode And by Date", () => {
    (0, vitest_1.it)("deveria ser possível buscar os turnos existentes do dia", () => __awaiter(void 0, void 0, void 0, function* () {
        const collaboratorCode = "4SXXFMf";
        const entry = new Date("2024-08-02T14:00:00Z");
        const shiftRepository = new in_memory_shift_repository_1.InMemoryShiftRepository();
        const findShiftUserCase = new find_shift_user_case_1.FindShiftUserCase(shiftRepository);
        const createShiftUserCase = new create_shift_user_case_1.CreateShiftUserCase(shiftRepository);
        yield createShiftUserCase.execute({
            collaboratorCode,
            entry,
        });
        const shifts = yield findShiftUserCase.findByCollaboratorCodeAndDate({
            collaboratorCode,
            pointDate: entry,
        });
        (0, vitest_1.expect)(shifts).not.toHaveLength(0);
        (0, vitest_1.expect)(shifts[0]).toMatchObject({
            collaboratorCode,
            entry: entry,
            exit: null,
            totalDurationMs: null,
        });
    }));
});
(0, vitest_1.describe)("find Shift by CollaboratorCode And by Month", () => {
    (0, vitest_1.it)("deveria ser possível buscar os turnos existentes do mes", () => __awaiter(void 0, void 0, void 0, function* () {
        const collaboratorCode = "4SXXFMf";
        const entry = new Date("2024-08-02T14:00:00Z");
        const shiftRepository = new in_memory_shift_repository_1.InMemoryShiftRepository();
        const findShiftUserCase = new find_shift_user_case_1.FindShiftUserCase(shiftRepository);
        const createShiftUserCase = new create_shift_user_case_1.CreateShiftUserCase(shiftRepository);
        yield createShiftUserCase.execute({
            collaboratorCode,
            entry,
        });
        const shifts = yield findShiftUserCase.findByCollaboratorCodeAndMonth({
            collaboratorCode,
            year: entry.getFullYear(),
            month: entry.getMonth(),
        });
        (0, vitest_1.expect)(shifts).not.toHaveLength(0);
        (0, vitest_1.expect)(shifts[0]).toMatchObject({
            collaboratorCode,
            entry: entry,
            exit: null,
        });
    }));
});
