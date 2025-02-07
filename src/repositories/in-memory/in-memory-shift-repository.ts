import { Shift } from "../../entities/shift/shift";
import { ShiftRepository } from "../shift-repository";

export class InMemoryShiftRepository implements ShiftRepository {
    public shifts: Shift[] = []; // Simulação de um banco de dados

    async create(shift: Shift): Promise<void> {
        this.shifts.push(shift);
    }

    async update(shift: Shift): Promise<void> {
        const index = this.shifts.findIndex(s => s.id === shift.id);
        if (index > -1) {
            this.shifts[index] = shift;
        } else {
            throw new Error("Turno não encontrado!");
        }
    }

    async findByCollaboratorCodeAndMonth(collaboratorCode: string, year: number, month: number): Promise<Shift[]> {
        // Filtra os turnos pelo código do colaborador e pelo mês
        return this.shifts.filter(
            shift =>
                shift.collaboratorCode === collaboratorCode &&
                shift.entry.getFullYear() === year &&
                shift.entry.getMonth() === month
        );
    }

    async findByCollaboratorCodeAndDate(collaboratorCode: string, date: Date): Promise<Shift[]> {
        // Filtra os turnos pelo código do colaborador e pelo mês
        return this.shifts.filter(
            shift =>
                shift.collaboratorCode === collaboratorCode &&
                shift.entry.getFullYear() === date.getFullYear() &&
                shift.entry.getMonth() === date.getMonth() &&
                shift.entry.getDate() === date.getDate()
        );
    }

    getTotalDurationMsByCollaboratorCodeAndMonth(
        collaboratorCode: string,
        year: number,
        month: number
    ): Promise<number> {
        // Filtra os turnos pelo código do colaborador e pelo mês
        const shifts = this.shifts.filter(
            shift =>
                shift.collaboratorCode === collaboratorCode &&
                shift.entry.getFullYear() === year &&
                shift.entry.getMonth() === month
        );

        // Soma a duração total de todos os turnos
        const totalDurationMs = shifts.reduce((total, shift) => {
            return total + (shift.totalDurationMs || 0);
        }, 0);

        return Promise.resolve(totalDurationMs);
    }
}
