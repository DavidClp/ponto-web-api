export interface CollaboratorProps {
    id: number | null;
    code: string;
}

export class Collaborator {
    private props: CollaboratorProps;

    get id() {
        return this.props.id;
    }

    get code() {
        return this.props.code;
    }

    constructor(code: string, id: number | null = null) {
        this.props = {
            id,
            code,
        };
    }
}
