"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collaborator = void 0;
class Collaborator {
    get id() {
        return this.collaborator.id;
    }
    get code() {
        return this.collaborator.code;
    }
    constructor(code, id = null) {
        this.collaborator = {
            id,
            code,
        };
    }
}
exports.Collaborator = Collaborator;
