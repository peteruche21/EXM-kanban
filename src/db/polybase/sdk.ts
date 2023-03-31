import { Polybase } from "@polybase/client";
import { ethPersonalSign } from "@polybase/eth";
import { toBuffer } from "ethereumjs-util";
import Wallet from "ethereumjs-wallet";
import { pass } from "../../constants";
import { IProject, ITask } from "../../types";
import schema from "./schema";

export const ethWallet = Wallet.fromPrivateKey(toBuffer(pass.privKey));

export class DbStore {
  private static instance: DbStore;
  private db: Polybase;

  private constructor() {
    this.db = new Polybase({
      defaultNamespace: pass.namespace,
    });
    this.db.signer((data) => {
      return {
        h: "eth-personal-sign",
        sig: ethPersonalSign(ethWallet.getPrivateKey(), data),
      };
    });
    // can be run only once
    this.init();
  }

  static getOrCreateDbStore(): DbStore {
    if (!DbStore.instance) {
      DbStore.instance = new DbStore();
    }
    return DbStore.instance;
  }

  private async init() {
    await this.db.applySchema(schema);
  }

  // working
  async create(data: ITask) {
    return await this.db.collection("Tasks").create(Object.values(data));
  }
  // working
  async remove(key: string) {
    return await this.db.collection("Tasks").record(key).call("del");
  }
  // working
  async update(key: string, data: ITask) {
    return await this.db
      .collection("Tasks")
      .record(key)
      .call("update", Object.values(data));
  }

  // working
  async changeStatus(key: string, status: string) {
    return await this.db
      .collection("Tasks")
      .record(key)
      .call("setStatus", [status]);
  }

  // working
  async get(projectId: string) {
    return await this.db
      .collection<ITask>("Tasks")
      .where("projectId", "==", projectId)
      .get();
  }

  // working
  async getProjects() {
    return await this.db.collection<IProject>("Projects").get();
  }

  // working
  async getProject(key: string) {
    return await this.db.collection<IProject>("Projects").record(key).get();
  }

  // working
  async newProject(data: IProject) {
    return await this.db.collection("Projects").create(Object.values(data));
  }

  // working
  async toggleProject(key: string) {
    return await this.db.collection("Projects").record(key).call("toggle");
  }
}

const db = DbStore.getOrCreateDbStore();
export type DB = typeof db;
export default db;
