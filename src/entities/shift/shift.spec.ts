import { test, expect } from "vitest";
import { Shift } from "./shift";

const code = "4SXXFMf";
const entry = new Date(2024, 7, 1, 8, 0, 0, 0);

test("criando entidade Turno", () => {
    const shift = new Shift(code, entry);

    expect(shift).toBeInstanceOf(Shift);
});

test("não é possível marcar saida com data anterior à data de início", () => {
    const shift = new Shift(code, entry);

    const exit = new Date(2024, 7, 1, 6, 0, 0, 0);

    expect(() => {
        return (shift.exit = exit);
    }).toThrow();
});
