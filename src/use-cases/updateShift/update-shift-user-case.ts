import { Shift } from "../../entities/shift/shift";
import { ShiftRepository } from "../../repositories/shift-repository";

export class UpdateShiftUserCase {
    constructor(private shiftRepository: ShiftRepository) {}

    async execute(shift: Shift): Promise<void> {
        const diffInMilliseconds = shift.exit.getTime() - shift.entry.getTime();
        shift.totalDurationMs = diffInMilliseconds;

        await this.shiftRepository.update(shift);
    }
}
