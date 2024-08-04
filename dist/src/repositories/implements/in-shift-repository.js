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
exports.InShiftRepository = void 0;
const prismaClient_1 = require("../../database/prismaClient");
const convertDateToUTC_1 = require("../../utils/convertDateToUTC");
class InShiftRepository {
    create(shift) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prismaClient_1.prismaCliente.shift.create({
                data: {
                    collaboratorCode: shift.collaboratorCode,
                    entry: shift.entry,
                },
            });
        });
    }
    update(shift) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prismaClient_1.prismaCliente.shift.update({
                data: {
                    collaboratorCode: shift.collaboratorCode,
                    entry: shift.entry,
                    exit: shift.exit,
                    totalDurationMs: shift.totalDurationMs,
                },
                where: {
                    id: shift.id,
                    collaboratorCode: shift.collaboratorCode,
                },
            });
        });
    }
    findByCollaboratorCodeAndMonth(collaboratorCode, year, month) {
        return __awaiter(this, void 0, void 0, function* () {
            const startDate = new Date(year, month - 1, 1);
            const endDate = new Date(year, month, 1);
            const shifts = yield prismaClient_1.prismaCliente.shift.findMany({
                where: {
                    collaboratorCode: collaboratorCode,
                    entry: {
                        gte: startDate,
                        lt: endDate,
                    },
                },
                orderBy: {
                    entry: "asc",
                },
            });
            return shifts.map(this.mapToShift);
        });
    }
    findByCollaboratorCodeAndDate(collaboratorCode, date) {
        return __awaiter(this, void 0, void 0, function* () {
            const startDate = new Date((0, convertDateToUTC_1.convertDateToUTC)(date).setHours(0, 0, 0, 0));
            const endDate = new Date((0, convertDateToUTC_1.convertDateToUTC)(date).setHours(23, 59, 59, 999));
            const shifts = yield prismaClient_1.prismaCliente.shift.findMany({
                where: {
                    collaboratorCode: collaboratorCode,
                    entry: {
                        gte: startDate,
                        lt: endDate,
                    },
                },
                orderBy: {
                    entry: "desc",
                },
            });
            return shifts.map(this.mapToShift);
        });
    }
    getTotalDurationMsByCollaboratorCodeAndMonth(collaboratorCode, year, month) {
        return __awaiter(this, void 0, void 0, function* () {
            const startDate = new Date(year, month - 1, 1);
            const endDate = new Date(year, month, 1);
            const result = yield prismaClient_1.prismaCliente.shift.aggregate({
                _sum: {
                    totalDurationMs: true,
                },
                where: {
                    collaboratorCode: collaboratorCode,
                    entry: {
                        gte: startDate,
                        lt: endDate,
                    },
                },
            });
            const totalDurationMs = result._sum.totalDurationMs || 0;
            return totalDurationMs;
        });
    }
    mapToShift(shift) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return {
            collaboratorCode: shift.collaboratorCode,
            entry: shift.entry,
            id: shift.id,
            exit: shift.exit,
            totalDurationMs: shift.totalDurationMs,
        };
    }
}
exports.InShiftRepository = InShiftRepository;
