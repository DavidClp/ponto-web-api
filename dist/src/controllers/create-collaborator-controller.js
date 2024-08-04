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
exports.CreateCollaboratorController = void 0;
class CreateCollaboratorController {
    constructor(createdCollaboratorUserCase) {
        this.createdCollaboratorUserCase = createdCollaboratorUserCase;
    }
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { code } = req.body;
            try {
                const collaborator = yield this.createdCollaboratorUserCase.execute({ code });
                return res.status(201).json(collaborator);
            }
            catch (error) {
                const status = error.status || 500;
                const message = error.message || "Internal Server Error";
                return res.status(status).json({ error: message });
            }
        });
    }
}
exports.CreateCollaboratorController = CreateCollaboratorController;
