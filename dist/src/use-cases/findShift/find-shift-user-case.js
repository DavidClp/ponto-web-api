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
exports.FindShiftUserCase = void 0;
class FindShiftUserCase {
    constructor(shiftRepository) {
        this.shiftRepository = shiftRepository;
    }
    findByCollaboratorCodeAndDate(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const collaboratorCode = data.collaboratorCode;
            const pointDate = data.pointDate;
            const shifts = yield this.shiftRepository.findByCollaboratorCodeAndDate(collaboratorCode, pointDate);
            return shifts;
        });
    }
    findByCollaboratorCodeAndMonth(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const collaboratorCode = data.collaboratorCode;
            const year = data.year || new Date().getFullYear();
            const month = data.month || new Date().getMonth() + 1;
            const shifts = yield this.shiftRepository.findByCollaboratorCodeAndMonth(collaboratorCode, year, month);
            shifts.map(shift => {
                shift.entry = new Date(shift.entry.toUTCString());
            });
            return shifts;
        });
    }
}
exports.FindShiftUserCase = FindShiftUserCase;
