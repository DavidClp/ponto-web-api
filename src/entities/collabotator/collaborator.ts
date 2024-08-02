export interface CollaboratorProps {
  code: string;
}

export class Collaborator {
  private props: CollaboratorProps;

  get code() {
    return this.props.code;
  }

  constructor(props: CollaboratorProps) {
    this.props = props;
  }
}
