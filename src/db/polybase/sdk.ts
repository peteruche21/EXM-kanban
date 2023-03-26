import { Polybase } from "@polybase/client";
import { ethPersonalSign } from "@polybase/eth";
import { toBuffer } from "ethereumjs-util";
import Wallet from "ethereumjs-wallet";
import { IProject, ITask } from "../../types";

export const ethWallet = Wallet.fromPrivateKey(
  toBuffer(import.meta.env.VITE_PRIVATE_KEY)
);


export class DbStore {
  private static instance: DbStore;
  private db: Polybase;

  private constructor() {
    this.db = new Polybase({
      defaultNamespace: "pk/0x2b92ed8e08e3ba4f1fa216b69ccef4554561c44771783fb759c2576219dcdad3d5658f4ec0c58720a1b3ba4d1505e020467bf2dfdb5e1025f99cc9eadd97b00d/third board",
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
    return await this.db.collection<ITask>("Tasks").get();
  }

  async getProjects() {
    const result = await this.db.collection<IProject>("Projects").get();
    console.log(result);
    return result
  }

  async newProject(data: IProject) {
    return await this.db.collection("Projects").create(Object.values(data));
  }

  async closeProject(key: string) {
    return await this.db.collection("Projects").record(key).call("close");
  }
}

const db = DbStore.getOrCreateDbStore();
export type DB = typeof db;
export default db;
