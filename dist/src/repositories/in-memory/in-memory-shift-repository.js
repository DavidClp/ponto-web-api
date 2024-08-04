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
exports.InMemoryShiftRepository = void 0;
class InMemoryShiftRepository {
    constructor() {
        this.shifts = []; // Simulação de um banco de dados
    }
    create(shift) {
        return __awaiter(this, void 0, void 0, function* () {
            this.shifts.push(shift);
        });
    }
    update(shift) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = this.shifts.findIndex(s => s.id === shift.id);
            console.log("AAAA", index > -1);
            if (index > -1) {
                this.shifts[index] = shift;
            }
            else {
                throw new Error("Turno não encontrado!");
            }
        });
    }
    findByCollaboratorCodeAndMonth(collaboratorCode, year, month) {
        return __awaiter(this, void 0, void 0, function* () {
            // Filtra os turnos pelo código do colaborador e pelo mês
            return this.shifts.filter(shift => shift.collaboratorCode === collaboratorCode &&
                shift.entry.getFullYear() === year &&
                shift.entry.getMonth() === month);
        });
    }
    findByCollaboratorCodeAndDate(collaboratorCode, date) {
        return __awaiter(this, void 0, void 0, function* () {
            // Filtra os turnos pelo código do colaborador e pelo mês
            return this.shifts.filter(shift => shift.collaboratorCode === collaboratorCode &&
                shift.entry.getFullYear() === date.getFullYear() &&
                shift.entry.getMonth() === date.getMonth() &&
                shift.entry.getDate() === date.getDate());
        });
    }
    getTotalDurationMsByCollaboratorCodeAndMonth(collaboratorCode, year, month) {
        // Filtra os turnos pelo código do colaborador e pelo mês
        const shifts = this.shifts.filter(shift => shift.collaboratorCode === collaboratorCode &&
            shift.entry.getFullYear() === year &&
            shift.entry.getMonth() === month);
        // Soma a duração total de todos os turnos
        const totalDurationMs = shifts.reduce((total, shift) => {
            return total + (shift.totalDurationMs || 0);
        }, 0);
        return Promise.resolve(totalDurationMs);
    }
}
exports.InMemoryShiftRepository = InMemoryShiftRepository;
