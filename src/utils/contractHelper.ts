import { ethers, Wallet } from "ethers";
import { pass } from "../constants";

const provider = new ethers.providers.JsonRpcProvider(
  import.meta.env.VITE_GOERLI_RPC_URL
);

const contract = new ethers.Contract(
  pass.contractAddress,
  pass.contractAbi,
  // replace with window.ethereum or wallet onboard provider
  new Wallet(pass.privKey).connect(provider)
);

export default contract;
