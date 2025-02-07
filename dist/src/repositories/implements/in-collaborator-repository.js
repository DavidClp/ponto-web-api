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
exports.InCollaboratorRepository = void 0;
const prismaClient_1 = require("../../database/prismaClient");
const collaborator_1 = require("../../entities/collaborator/collaborator");
class InCollaboratorRepository {
    create(collaborator) {
        return __awaiter(this, void 0, void 0, function* () {
            const collaboratorCreate = yield prismaClient_1.prismaCliente.collaborator.create({
                data: {
                    code: collaborator.code,
                },
            });
            return new collaborator_1.Collaborator(collaboratorCreate.code, collaboratorCreate.id);
        });
    }
    findByCode(collaboratorcode) {
        return __awaiter(this, void 0, void 0, function* () {
            const collaborator = yield prismaClient_1.prismaCliente.collaborator.findUnique({
                where: {
                    code: collaboratorcode,
                },
            });
            if (!collaborator)
                return null;
            return new collaborator_1.Collaborator(collaborator.code, collaborator.id);
        });
    }
}
exports.InCollaboratorRepository = InCollaboratorRepository;
