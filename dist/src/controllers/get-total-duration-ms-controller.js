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
exports.GetTotalDurationMsController = void 0;
class GetTotalDurationMsController {
    constructor(getTotalDurationMsUserCase) {
        this.getTotalDurationMsUserCase = getTotalDurationMsUserCase;
    }
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { collaboratorCode, year, month } = req.query;
            try {
                const totalDurationMs = yield this.getTotalDurationMsUserCase.execute({
                    collaboratorCode: collaboratorCode.toString(),
                    year: Number(year),
                    month: Number(month),
                });
                return res.status(200).json(totalDurationMs);
            }
            catch (error) {
                const status = error.status || 500;
                const message = error.message || "Internal Server Error";
                return res.status(status).json({ error: message });
            }
        });
    }
}
exports.GetTotalDurationMsController = GetTotalDurationMsController;
