export interface ShiftProps {
    id: number | null;
    collaboratorCode: string;
    entry: Date;
    exit: Date | null;
}

export class Shift {
    private props: ShiftProps;

    get id() {
        return this.props.id;
    }

    get collaboratorCode() {
        return this.props.collaboratorCode;
    }

    get entry() {
        return this.props.entry;
    }

    get exit() {
        return this.props.exit;
    }

    set exit(newExit: Date | null) {
        if (newExit && newExit < this.props.entry) {
            throw new Error("O horário de saída não pode ser anterior ao horário de entrada!");
        }

        this.props.exit = newExit;
    }

    constructor(collaboratorCode: string, entry: Date, id: number | null = null, exit: Date | null = null) {
        this.props = {
            id,
            collaboratorCode: collaboratorCode,
            entry: entry,
            exit,
        };
    }
}
