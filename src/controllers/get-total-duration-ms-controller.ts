import { Request, Response } from "express";
import { GetTotalDurationMsUserCase } from "../use-cases/getTotalHours/get-total-duration-ms";

export class GetTotalDurationMsController {
    constructor(private getTotalDurationMsUserCase: GetTotalDurationMsUserCase) {}

    async handle(req: Request, res: Response) {
        const { collaboratorCode, year, month } = req.query;
        try {
            const totalDurationMs = await this.getTotalDurationMsUserCase.execute({
                collaboratorCode: collaboratorCode.toString(),
                year: Number(year),
                month: Number(month),
            });
            return res.status(200).json(totalDurationMs);
        } catch (error) {
            const status = error.status || 500;
            const message = error.message || "Internal Server Error";
            return res.status(status).json({ error: message });
        }
    }
}
