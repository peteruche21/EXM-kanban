import abi from "./abi.json";

export const pass = {
  // exm constants
  exmKey: import.meta.env.EXM_KEY,
  exmFnId: "JfvLmLk49HfOLqAFUzQgOgu7ncWDpstjOoj1wSd8_A8",
  exmFnSource:
    "https://arweave.net/JfvLmLk49HfOLqAFUzQgOgu7ncWDpstjOoj1wSd8_A8",
  exmFnUrl: "https://JfvLmLk49HfOLqAFUzQgOgu7ncWDpstjOoj1wSd8_A8.exm.run",

  // smart contract constants, same for every chain
  contractAddress: "0xAB395C5a16C6317f35bC88fE5fE2456ef9e0e708",
  contractAbi: abi,
  tokenUri: "ipfs://bafkreiaro56gcvug3vi6ovhqqrmozrez42v6a4mh2jno6vu5vdur4h5r3u",
  privKey: import.meta.env.VITE_PRIVATE_KEY,

  // whal3s contants
  nftValidationKey: "d2ef7786-e2a7-47f5-b42a-28fb4be5c379",
  whal3sApiKey: import.meta.env.WHAL3S_API_KEY,

  // web3onboard id
  dappId: import.meta.env.BLOCKNATIVE_API_KEY,
  namespace: "third board",
  // wallet connect
  wcProjectId: "41a6cd3849f68c343764b1d875029c86",
  uauthClientID: "2d14b025-cb94-44b9-85ac-ce2397e6f10b"
};
