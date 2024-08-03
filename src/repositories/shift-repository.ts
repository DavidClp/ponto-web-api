import { Shift } from "../entities/shift/shift";

export interface ShiftRepository {
    create(shift: Shift): Promise<void>;

    update(shift: Shift): Promise<void>;

    findByCollaboratorCodeAndMonth(collaboratorCode: string, year: number, month: number): Promise<Shift[]>;

    findByCollaboratorCodeAndDate(collaboratorCode: string, date: Date): Promise<Shift[]>;

    getTotalDurationMsByCollaboratorCodeAndMonth(
        collaboratorCode: string,
        year: number,
        month: number
    ): Promise<number>;
}
