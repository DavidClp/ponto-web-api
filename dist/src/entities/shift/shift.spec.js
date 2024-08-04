"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const shift_1 = require("./shift");
const code = "4SXXFMf";
const entry = new Date(2024, 7, 1, 8, 0, 0, 0);
(0, vitest_1.test)("criando entidade Turno", () => {
    const shift = new shift_1.Shift(code, entry);
    (0, vitest_1.expect)(shift).toBeInstanceOf(shift_1.Shift);
});
(0, vitest_1.test)("não é possível marcar saida com data anterior à data de início", () => {
    const shift = new shift_1.Shift(code, entry);
    const exit = new Date(2024, 7, 1, 6, 0, 0, 0);
    (0, vitest_1.expect)(() => {
        return (shift.exit = exit);
    }).toThrow();
});
