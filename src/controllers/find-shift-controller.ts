import { Request, Response } from "express";
import { FindShiftUserCase } from "../use-cases/findShift/find-shift-user-case";

export class FindShiftController {
    constructor(private findShiftUserCase: FindShiftUserCase) {}

    async handleFindByCollaboratorCodeAndMonth(req: Request, res: Response) {
        const { collaboratorCode, year, month } = req.query;
        try {
            const shiftsForDay = await this.findShiftUserCase.findByCollaboratorCodeAndMonth({
                collaboratorCode: collaboratorCode.toString(),
                year: Number(year),
                month: Number(month),
            });
            return res.status(200).json(shiftsForDay);
        } catch (error) {
            const status = error.status || 500;
            const message = error.message || "Internal Server Error";
            return res.status(status).json({ error: message });
        }
    }

    async handleFindByCollaboratorCodeAndDate(req: Request, res: Response) {
        const { collaboratorCode, point } = req.body;
        const pointDate = new Date(point);

        try {
            const shiftsForDay = await this.findShiftUserCase.findByCollaboratorCodeAndDate({
                collaboratorCode,
                pointDate,
            });
            return res.status(201).json(shiftsForDay);
        } catch (error) {
            const status = error.status || 500;
            const message = error.message || "Internal Server Error";
            return res.status(status).json({ error: message });
        }
    }
}
