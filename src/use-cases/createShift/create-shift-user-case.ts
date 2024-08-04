import { Shift } from "../../entities/shift/shift";
import { ShiftRepository } from "../../repositories/shift-repository";

interface CreateShiftRequest {
    collaboratorCode: string;
    entry: Date;
}

export class CreateShiftUserCase {
    constructor(private shiftRepository: ShiftRepository) {}

    async execute({ collaboratorCode, entry }: CreateShiftRequest): Promise<void> {
        const shift = new Shift(collaboratorCode, entry);

        await this.shiftRepository.create(shift);
    }
}
