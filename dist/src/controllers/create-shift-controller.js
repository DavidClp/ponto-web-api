"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateShiftController = void 0;
const shift_1 = require("../entities/shift/shift");
class CreateShiftController {
    constructor(createdShiftUserCase, updateShiftUserCase, findShiftUserCase) {
        this.createdShiftUserCase = createdShiftUserCase;
        this.updateShiftUserCase = updateShiftUserCase;
        this.findShiftUserCase = findShiftUserCase;
    }
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { collaboratorCode, point } = req.body;
                const pointDate = new Date(point);
                const shiftToUpdate = yield this.getShiftToUpdate(collaboratorCode, pointDate);
                if (shiftToUpdate) {
                    shiftToUpdate.exit = pointDate;
                    yield this.updateShiftUserCase.execute(shiftToUpdate);
                    return res.status(200).json({ message: "Turno Atualizado" });
                }
                const newShift = new shift_1.Shift(collaboratorCode, pointDate);
                yield this.createdShiftUserCase.execute(newShift);
                return res.status(201).json({ message: "Turno Criado" });
            }
            catch (error) {
                const status = error.status || 500;
                const message = error.message || "Internal Server Error";
                return res.status(status).json({ error: message });
            }
        });
    }
    getShiftToUpdate(collaboratorCode, pointDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const shiftsForDay = yield this.findShiftUserCase.findByCollaboratorCodeAndDate({
                collaboratorCode,
                pointDate,
            });
            const sortedShifts = shiftsForDay.sort((a, b) => a.entry.getTime() - b.entry.getTime());
            const shiftToUpdate = sortedShifts.find(shift => !shift.exit);
            return shiftToUpdate;
        });
    }
}
exports.CreateShiftController = CreateShiftController;
