import { prismaCliente } from "../../database/prismaClient";
import { Shift } from "../../entities/shift/shift";
import { convertDateToUTC } from "../../utils/convertDateToUTC";
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
        await prismaCliente.shift.update({
            data: {
                collaboratorCode: shift.collaboratorCode,
                entry: shift.entry,
                exit: shift.exit,
                totalDurationMs: shift.totalDurationMs,
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
            orderBy: {
                entry: "asc",
            },
        });

        return shifts.map(this.mapToShift);
    }

    async findByCollaboratorCodeAndDate(collaboratorCode: string, date: Date): Promise<Shift[]> {
        const startDate = new Date(convertDateToUTC(date).setHours(0, 0, 0, 0));
        const endDate = new Date(convertDateToUTC(date).setHours(23, 59, 59, 999));

        const shifts = await prismaCliente.shift.findMany({
            where: {
                collaboratorCode: collaboratorCode,
                entry: {
                    gte: startDate,
                    lt: endDate,
                },
            },
            orderBy: {
                entry: "desc",
            },
        });

        return shifts.map(this.mapToShift);
    }

    async getTotalDurationMsByCollaboratorCodeAndMonth(
        collaboratorCode: string,
        year: number,
        month: number
    ): Promise<number> {
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 1);

        const result = await prismaCliente.shift.aggregate({
            _sum: {
                totalDurationMs: true,
            },
            where: {
                collaboratorCode: collaboratorCode,
                entry: {
                    gte: startDate,
                    lt: endDate,
                },
            },
        });

        const totalDurationMs = result._sum.totalDurationMs || 0;

        return totalDurationMs;
    }

    private mapToShift(shift: Shift): Shift {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return {
            collaboratorCode: shift.collaboratorCode,
            entry: shift.entry,
            id: shift.id,
            exit: shift.exit,
            totalDurationMs: shift.totalDurationMs,
        };
    }
}
