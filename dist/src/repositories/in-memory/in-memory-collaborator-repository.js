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
exports.InMemoryCollaboratorRepository = void 0;
class InMemoryCollaboratorRepository {
    constructor() {
        this.collaborator = null; // Simulação de um banco de dados
    }
    create(collaborator) {
        return __awaiter(this, void 0, void 0, function* () {
            this.collaborator = collaborator;
            return this.collaborator;
        });
    }
    findByCode(collaboratorCode) {
        if (!this.collaborator)
            return null;
        if (this.collaborator.code === collaboratorCode) {
            return Promise.resolve(this.collaborator);
        }
        else {
            return null;
        }
    }
}
exports.InMemoryCollaboratorRepository = InMemoryCollaboratorRepository;
