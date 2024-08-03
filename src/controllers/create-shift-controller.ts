import { Request, Response } from "express";
import { Shift } from "../entities/shift/shift";
import { CreateShiftUserCase } from "../use-cases/createShift/create-shift-user-case";
import { FindShiftUserCase } from "../use-cases/findShift/find-shift-user-case";
import { UpdateShiftUserCase } from "../use-cases/updateShift/update-shift-user-case";

export class CreateShiftController {
    constructor(
        private createdShiftUserCase: CreateShiftUserCase,
        private updateShiftUserCase: UpdateShiftUserCase,
        private findShiftUserCase: FindShiftUserCase
    ) {}

    async handle(req: Request, res: Response) {
        try {
            const { collaboratorCode, point } = req.body;
            const pointDate = new Date(point);

            const shiftToUpdate = await this.getShiftToUpdate(collaboratorCode, pointDate);

            if (shiftToUpdate) {
                shiftToUpdate.exit = pointDate;
                await this.updateShiftUserCase.execute(shiftToUpdate);
                return res.status(200).json({ message: "Turno Atualizado" });
            }

            const newShift = new Shift(collaboratorCode, pointDate);
            await this.createdShiftUserCase.execute(newShift);
            return res.status(201).json({ message: "Turno Criado" });
        } catch (error) {
            const status = error.status || 500;
            const message = error.message || "Internal Server Error";
            return res.status(status).json({ error: message });
        }
    }

    private async getShiftToUpdate(collaboratorCode: string, pointDate: Date): Promise<Shift> {
        const shiftsForDay = await this.findShiftUserCase.findByCollaboratorCodeAndDate({
            collaboratorCode,
            pointDate,
        });

        const sortedShifts = shiftsForDay.sort((a, b) => a.entry.getTime() - b.entry.getTime());

        const shiftToUpdate = sortedShifts.find(shift => !shift.exit);

        return shiftToUpdate;
    }
}
