import abi from "./abi.json";

export const pass = {
  // exm constants
  exmKey: import.meta.env.EXM_KEY,
  exmFnId: "JfvLmLk49HfOLqAFUzQgOgu7ncWDpstjOoj1wSd8_A8",
  exmFnSource:
    "https://arweave.net/JfvLmLk49HfOLqAFUzQgOgu7ncWDpstjOoj1wSd8_A8",
  exmFnUrl: "https://JfvLmLk49HfOLqAFUzQgOgu7ncWDpstjOoj1wSd8_A8.exm.run",

  // smart contract constants, same for every chain
  contractAddress: "0xf609c8Fe0E04492065fCF9e9aC015B43e69D219d",
  contractAbi: abi,
  tokenUri: "ipfs://bafkreiaro56gcvug3vi6ovhqqrmozrez42v6a4mh2jno6vu5vdur4h5r3u",
  privKey: import.meta.env.VITE_PRIVATE_KEY,

  // whal3s contants
  nftValidationKey: "e255a559-d9e9-4683-8a62-5d85e763212d",
  whal3sApiKey: import.meta.env.WHAL3S_API_KEY,

  // web3onboard id
  dappId: import.meta.env.BLOCKNATIVE_API_KEY,
  namespace: "third board",
  // wallet connect
  wcProjectId: "41a6cd3849f68c343764b1d875029c86",
  uauthClientID: "2d14b025-cb94-44b9-85ac-ce2397e6f10b"
};
