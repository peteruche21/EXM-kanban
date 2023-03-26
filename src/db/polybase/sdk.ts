require("dotenv").config();
import { Polybase } from "@polybase/client";
import { ethPersonalSign } from "@polybase/eth";
import { toBuffer } from "ethereumjs-util";
import Wallet from "ethereumjs-wallet";
import { IProject, ITask } from "../../types";
import schema from "./schema";

export const ethWallet = Wallet.fromPrivateKey(
  toBuffer(process.env.PRIVATE_KEY)
);

console.log(process.env.PRIVATE_KEY);

export class DbStore {
  private static instance: DbStore;
  private db: Polybase;

  private constructor() {
    this.db = new Polybase({
      defaultNamespace: "paymasters-io",
    });
    this.db.signer((data) => {
      return {
        h: "eth-personal-sign",
        sig: ethPersonalSign(ethWallet.getPrivateKey(), data),
      };
    });
  }

  static getOrCreateDbStore(): DbStore {
    if (!DbStore.instance) {
      DbStore.instance = new DbStore();
    }
    return DbStore.instance;
  }

    async init() {
    await this.db.applySchema(schema);
  }

  async create(data: ITask) {
    return await this.db.collection("Tasks").create(Object.values(data));
  }

  async update(key: string, data: ITask) {
    return await this.db
      .collection("Tasks")
      .record(key)
      .call("update", Object.values(data));
  }

  async get() {
    return await this.db.collection("Tasks").get();
  }

  async getProjects() {
    return await this.db.collection("Projects").get();
  }

  async newProject(data: IProject) {
    return await this.db.collection("Projects").create(Object.values(data));
  }

  async closeProject(key: string) {
    return await this.db.collection("Projects").record(key).call("close");
  }
}

const db = DbStore.getOrCreateDbStore();
void db.init()
export type DB = typeof db;
export default db;
