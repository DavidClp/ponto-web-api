import { prismaCliente } from "../../database/prismaClient";
import { Shift } from "../../entities/shift/shift";
import { converterDateToUTC } from "../../utils/converterDateToUTC";
import { ShiftRepository } from "../shift-repository";

export class InShiftRepository implements ShiftRepository {
    async create(shift: Shift): Promise<void> {
        await prismaCliente.shift.create({
            data: {
                collaboratorCode: shift.collaboratorCode,
                entry: shift.entry,
            },
        });
    }

    async update(shift: Shift): Promise<void> {
        console.log("REPOSITORIESEEEEEEE", shift);
        await prismaCliente.shift.update({
            data: {
                collaboratorCode: shift.collaboratorCode,
                entry: shift.entry,
                exit: shift.exit,
            },
            where: {
                id: shift.id,
                collaboratorCode: shift.collaboratorCode,
            },
        });
    }

    async findByCollaboratorCodeAndMonth(collaboratorCode: string, year: number, month: number): Promise<Shift[]> {
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 1);

        const shifts = await prismaCliente.shift.findMany({
            where: {
                collaboratorCode: collaboratorCode,
                entry: {
                    gte: startDate,
                    lt: endDate,
                },
            },
        });

        return shifts.map(shift => new Shift(shift.collaboratorCode, shift.entry, shift.id, shift.exit));
    }

    async findByCollaboratorCodeAndDate(collaboratorCode: string, date: Date): Promise<Shift[]> {
        const startDate = new Date(converterDateToUTC(date).setHours(0, 0, 0, 0));
        const endDate = new Date(converterDateToUTC(date).setHours(23, 59, 59, 999));

        const shifts = await prismaCliente.shift.findMany({
            where: {
                collaboratorCode: collaboratorCode,
                entry: {
                    gte: startDate,
                    lt: endDate,
                },
            },
        });

        return shifts.map(this.mapToShift);
    }

    private mapToShift(shift: Shift): Shift {
        return new Shift(shift.collaboratorCode, shift.entry, shift.id, shift.exit);
    }
}
