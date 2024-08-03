import { Shift } from "../../entities/shift/shift";
import { ShiftRepository } from "../../repositories/shift-repository";
import { convertDateToUTC } from "../../utils/convertDateToUTC";

export class UpdateShiftUserCase {
    constructor(private shiftRepository: ShiftRepository) {}

    async execute(shift: Shift): Promise<void> {
        shift.exit = convertDateToUTC(shift.exit);

        const diffInMilliseconds = shift.exit.getTime() - shift.entry.getTime();
        shift.totalDurationMs = diffInMilliseconds;

        await this.shiftRepository.update(shift);
    }
}
