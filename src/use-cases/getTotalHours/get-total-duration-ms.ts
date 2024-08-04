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
        const year = data.year || new Date().getFullYear();
        const month = data.month || new Date().getMonth() + 1;

        const totalDurationMs = await this.shiftRepository.getTotalDurationMsByCollaboratorCodeAndMonth(
            collaboratorCode,
            year,
            month
        );
        return totalDurationMs;
    }
}
