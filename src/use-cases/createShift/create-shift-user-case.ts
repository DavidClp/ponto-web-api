import { Shift } from "../../entities/shift/shift";
import { ShiftRepository } from "../../repositories/shift-repository";

interface CreateShiftRequest {
    collaboratorCode: string;
    entry: Date;
}

type CreateShiftResponse = Shift;

export class CreateShiftUserCase {
    constructor(private shiftRepository: ShiftRepository) {}

    async execute({ collaboratorCode, entry }: CreateShiftRequest): Promise<CreateShiftResponse> {
        const shift = new Shift(collaboratorCode, entry);

        await this.shiftRepository.create(shift);

        return shift;
    }
}
