"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shift = void 0;
class Shift {
    get id() {
        return this.shift.id;
    }
    get collaboratorCode() {
        return this.shift.collaboratorCode;
    }
    get entry() {
        return this.shift.entry;
    }
    set entry(newEntry) {
        this.shift.entry = newEntry;
    }
    get exit() {
        return this.shift.exit;
    }
    set exit(newExit) {
        if (newExit && newExit < this.shift.entry) {
            throw new Error("O horário de saída não pode ser anterior ao horário de entrada!");
        }
        this.shift.exit = newExit;
    }
    set totalDurationMs(newTotalDurationMs) {
        this.shift.totalDurationMs = newTotalDurationMs;
    }
    get totalDurationMs() {
        return this.shift.totalDurationMs;
    }
    constructor(collaboratorCode, entry, id = null, exit = null, totalDurationMs = null) {
        this.shift = {
            id,
            collaboratorCode,
            entry,
            exit,
            totalDurationMs,
        };
    }
}
exports.Shift = Shift;
