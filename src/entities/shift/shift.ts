export interface ShiftProps {
    id: number | null;
    collaboratorCode: string;
    entry: Date;
    exit: Date | null;
    totalDurationMs: number | null;
}

export class Shift {
    private shift: ShiftProps;

    get id() {
        return this.shift.id;
    }

    get collaboratorCode() {
        return this.shift.collaboratorCode;
    }

    get entry() {
        return this.shift.entry;
    }

    set entry(newEntry: Date) {
        this.shift.entry = newEntry;
    }

    get exit() {
        return this.shift.exit;
    }

    set exit(newExit: Date | null) {
        if (newExit && newExit < this.shift.entry) {
            throw new Error("O horário de saída não pode ser anterior ao horário de entrada!");
        }

        this.shift.exit = newExit;
    }

    set totalDurationMs(newTotalDurationMs: number | null) {
        this.shift.totalDurationMs = newTotalDurationMs;
    }

    get totalDurationMs() {
        return this.shift.totalDurationMs;
    }

    constructor(
        collaboratorCode: string,
        entry: Date,
        id: number | null = null,
        exit: Date | null = null,
        totalDurationMs: number | null = null
    ) {
        this.shift = {
            id,
            collaboratorCode,
            entry,
            exit,
            totalDurationMs,
        };
    }
}
