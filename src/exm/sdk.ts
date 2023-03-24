import { Exm } from "@execution-machine/sdk";
import { pass } from "../constants";
import { z } from "zod";

const walletAddr = z.string().startsWith("0x").length(42);

export interface ITask {
  projectId: number;
  status?: "TODO" | "DOING" | "DONE";
  title?: string;
  description?: string;
  duration?: number[];
  assignee?: z.infer<typeof walletAddr>;
  PR?: string;
  priority?: "LOW" | "MEDIUM" | "HIGH";
  comments?: string[];
}

export interface IProject {
  name: string;
  owner: z.infer<typeof walletAddr>;
  open: boolean;
}

export interface IInput {
  fn:
    | "TODO"
    | "DOING"
    | "DONE"
    | "ARCHIVE"
    | "UPDATE"
    | "REMOVE"
    | "COMMENT"
    | "CREATE"
    | "CREATE_PROJECT"
    | "TOGGLE_PROJECT";
  index?: number;
  data?: ITask;
}

export class EXMStore {
  private static instance: EXMStore;
  private exm: Exm;

  private constructor() {
    this.exm = new Exm({ token: pass.exmKey });
  }

  static getOrCreateEXMStore(): EXMStore {
    if (!EXMStore.instance) {
      EXMStore.instance = new EXMStore();
    }
    return EXMStore.instance;
  }

  async create(data: ITask) {
    return await this.exm.functions.write<IInput>(pass.exmFnId, {
      fn: "CREATE",
      data,
    });
  }

  async update(fn: string, index: number, data: ITask) {
    return await this.exm.functions.write<IInput>(pass.exmFnId, {
      fn,
      index,
      data,
    });
  }

  async remove(index: number) {
    return await this.exm.functions.write<IInput>(pass.exmFnId, {
      fn: "REMOVE",
      index,
    });
  }

  async archive(index: number) {
    return await this.exm.functions.write<IInput>(pass.exmFnId, {
      fn: "ARCHIVE",
      index,
    });
  }

  async comment(index: string, comment: string) {
    return await this.exm.functions.write<IInput>(pass.exmFnId, {
      fn: "COMMENT",
      index,
      data: { comment },
    });
  }

  async get() {
    await this.exm.functions.read(pass.exmFnId);
  }

  async newProject(data: IProject) {
    return await this.exm.functions.write<IProject>(pass.exmFnId, {
      fn: "CREATE_PROJECT",
      data,
    });
  }

  async toggleProject(index: number) {
    return await this.exm.functions.write<IProject>(pass.exmFnId, {
      fn: "TOGGLE_PROJECT",
      index,
    });
  }
}

const sdk = EXMStore.getOrCreateEXMStore();
export type SDK = typeof sdk;
export default sdk;
