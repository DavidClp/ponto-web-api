import { Shift } from "../../entities/shift/shift";
import { ShiftRepository } from "../../repositories/shift-repository";
import { converterDateToUTC } from "../../utils/converterDateToUTC";

interface CreateShiftRequest {
    collaboratorCode: string;
    entry: Date;
}

export class CreateShiftUserCase {
    constructor(private shiftRepository: ShiftRepository) {}

    async execute({ collaboratorCode, entry }: CreateShiftRequest): Promise<void> {
        const entryUTC = converterDateToUTC(entry);
        const shift = new Shift(collaboratorCode, entryUTC);

        await this.shiftRepository.create(shift);
    }
}
