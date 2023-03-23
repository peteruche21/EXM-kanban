import { Exm } from "@execution-machine/sdk";
import { pass } from "../constants";
import { z } from "zod";

const walletAddr = z.string().startsWith("0x").length(42);

export interface ITask {
  status?: "TODO" | "DOING" | "DONE";
  title?: string;
  description?: string;
  duration?: number[];
  assignee?: z.infer<typeof walletAddr>;
  PR?: string;
  priority?: "LOW" | "MEDIUM" | "HIGH";
  comments?: string[];
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
    | "CREATE";
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
}

const sdk = EXMStore.getOrCreateEXMStore();

export type SDK = typeof sdk;
export default sdk;
