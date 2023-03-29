const schema = `
@public
collection Tasks {
    id: string;
    projectId: string;
    status: string;
    title: string;
    description: string;
    duration?: number[];
    assignee?: string;
    PR?: string;
    priority?: string;
    comments?: string[];
    creator: PublicKey;

    constructor (
      id: string,
      projectId: string, 
      status: string, 
      title: string, 
      description: string,
      duration?: number[],
      assignee?: string,
      PR?: string,
      priority?: string
      ) {
      this.id = id;
      this.projectId = projectId;
      this.status = status;
      this.title = title;
      this.description = description;
      this.duration = duration;
      this.assignee = assignee;
      this.PR = PR;
      this.priority = priority;
      if (ctx.publicKey)
        this.creator = ctx.publicKey;
    }
 
    update (
      title: string, 
      description: string,
      duration?: number[],
      assignee?: string,
      PR?: string,
      priority?: string
    )  {
      if (this.creator != ctx.publicKey) {
        throw error('invalid public key');
      }
      this.title = title;
      this.description = description;
      this.duration = duration;
      this.assignee = assignee;
      this.PR = PR;
      this.priority = priority;
    }

    setStatus(status: string) {
      if (this.creator != ctx.publicKey) {
        throw error('invalid public key');
      }
      this.status = status;
    }

    comment(comment: string) {
      this.comments.push(comment);
    }

    del() {
      if (this.creator != ctx.publicKey) {
          throw error('invalid public key');
        }
      selfdestruct();
    }

  }

  @public
  collection Projects {
    id: string;
    name: string;
    owner: string;
    open: boolean;
    creator: PublicKey;

    constructor (
      id: string,
      name: string, 
      owner: string, 
      open: boolean
      ) {
      this.id = id;
      this.name = name;
      this.owner = owner;
      this.open = true;
      if (ctx.publicKey)
        this.creator = ctx.publicKey;
    }

    toggle() {
      if (this.creator != ctx.publicKey) {
        throw error('invalid public key');
      }
      this.open = !this.open;
    }
  }`;

export default schema;
