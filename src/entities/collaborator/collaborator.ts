export interface CollaboratorProps {
    id: number | null;
    code: string;
}

export class Collaborator {
    private collaborator: CollaboratorProps;

    get id() {
        return this.collaborator.id;
    }

    get code() {
        return this.collaborator.code;
    }

    constructor(code: string, id: number | null = null) {
        this.collaborator = {
            id,
            code,
        };
    }
}
