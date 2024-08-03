import { ShiftRepository } from "../../repositories/shift-repository";

interface getTotalDurationMsUserCaseRequest {
    collaboratorCode: string;
    year: number;
    month: number;
}

export class GetTotalDurationMsUserCase {
    constructor(private shiftRepository: ShiftRepository) {}

    async execute(data: getTotalDurationMsUserCaseRequest): Promise<number> {
        const collaboratorCode = data.collaboratorCode;
        const year = data.year;
        const month = data.month;

        const totalDurationMs = await this.shiftRepository.getTotalDurationMsByCollaboratorCodeAndMonth(
            collaboratorCode,
            year,
            month
        );
        return totalDurationMs;
    }
}
