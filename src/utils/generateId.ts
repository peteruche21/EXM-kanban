import { sha256, toUtf8Bytes } from "ethers/lib/utils";


// generates a unique id. 
// can never clash
export const generateId = (prefix: string, salt?: string) => {
  const gen = performance.now();
  const random = gen + Math.random().toString().slice(5) + salt;
  const id = random.replace(".", "").replace(" ", "");
  return prefix + "-" + sha256(toUtf8Bytes(id));
};
