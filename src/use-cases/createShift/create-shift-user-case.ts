import { Shift } from "../../entities/shift/shift";
import { ShiftRepository } from "../../repositories/shift-repository";
import { convertDateToUTC, convertDateToUTC } from "../../utils/convertDateToUTC";

interface CreateShiftRequest {
    collaboratorCode: string;
    entry: Date;
}

export class CreateShiftUserCase {
    constructor(private shiftRepository: ShiftRepository) {}

    async execute({ collaboratorCode, entry }: CreateShiftRequest): Promise<void> {
        const entryUTC = convertDateToUTC(entry);
        const shift = new Shift(collaboratorCode, entryUTC);

        await this.shiftRepository.create(shift);
    }
}
