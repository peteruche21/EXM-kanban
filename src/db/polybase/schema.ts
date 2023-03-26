const schema = `
@public
collection Tasks {
    id: number
    projectId: number
    status: string
    title: string
    description: string
    duration?: number[]
    assignee?: string
    PR?: string
    priority?: string
    comments?: string[]
    creator: PublicKey;

    constructor (
      id: string,
      pid: number, 
      status: string, 
      title: string, 
      description: string,
      duration?: number[],
      assignee?: string,
      PR?: string,
      priority?: string,
      ) {
      this.id = id;
      this.projectId = pid;
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
      status: string, 
      title: string, 
      description: string,
      duration?: number[],
      assignee?: string,
      PR?: string,
      priority?: string,
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

  }

  @public
  collection Projects {
    id: string
    name: string
    owner: string
    open: boolean

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
    }

    close() {
      this.open = false;
    }

  }`;

export default schema;
