import { Shift } from "../../entities/shift/shift";
import { ShiftRepository } from "../../repositories/shift-repository";

interface findShiftByDateRequest {
    collaboratorCode: string;
    pointDate: Date;
}

interface findShiftByMonthRequest {
    collaboratorCode: string;
    year: number;
    month: number;
}

type FindSchiftResponse = Shift[];

export class FindShiftUserCase {
    constructor(private shiftRepository: ShiftRepository) {}

    async findByCollaboratorCodeAndDate(data: findShiftByDateRequest): Promise<FindSchiftResponse> {
        const collaboratorCode = data.collaboratorCode;
        const pointDate = data.pointDate;

        const shifts = await this.shiftRepository.findByCollaboratorCodeAndDate(collaboratorCode, pointDate);

        return shifts;
    }

    async findByCollaboratorCodeAndMonth(data: findShiftByMonthRequest): Promise<FindSchiftResponse> {
        const collaboratorCode = data.collaboratorCode;
        const year = data.year || new Date().getFullYear();
        const month = data.month || new Date().getMonth() + 1;

        const shifts = await this.shiftRepository.findByCollaboratorCodeAndMonth(collaboratorCode, year, month);

        shifts.map(shift => {
            shift.entry = new Date(shift.entry.toUTCString());
        });

        return shifts;
    }
}
