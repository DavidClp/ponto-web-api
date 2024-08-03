import { Shift } from "../../entities/shift/shift";
import { ShiftRepository } from "../../repositories/shift-repository";
import { converterDateToUTC } from "../../utils/converterDateToUTC";

export class UpdateShiftUserCase {
    constructor(private shiftRepository: ShiftRepository) {}

    async execute(shift: Shift): Promise<void> {
        shift.exit = converterDateToUTC(shift.exit);

        await this.shiftRepository.update(shift);
    }
}
