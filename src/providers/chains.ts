export const chains = [
  {
    id: "0x1",
    token: "ETH",
    label: "Mainnnet",
    rpcUrl: "https://rpc.ankr.com/eth",
  },
  {
    id: "0x5",
    token: "ETH",
    label: "Goerli",
    rpcUrl: "https://rpc.ankr.com/eth_goerli",
  },
  {
    id: "0x13881",
    token: "MATIC",
    label: "Polygon - Mumbai",
    rpcUrl: "https://matic-mumbai.chainstacklabs.com	",
  },
  {
    id: "0x38",
    token: "BNB",
    label: "Binance",
    rpcUrl: "https://bsc-dataseed.binance.org/",
  },
  {
    id: "0x89",
    token: "MATIC",
    label: "Polygon",
    rpcUrl: "https://matic-mainnet.chainstacklabs.com",
  },
  {
    id: "0xfa",
    token: "FTM",
    label: "Fantom",
    rpcUrl: "https://rpc.ftm.tools/",
  },
  {
    id: 10,
    token: "OETH",
    label: "Optimism",
    rpcUrl: "https://mainnet.optimism.io",
  },
  {
    id: 42161,
    token: "ARB-ETH",
    label: "Arbitrum",
    rpcUrl: "https://rpc.ankr.com/arbitrum",
  },
  {
    id: 84531,
    token: "ETH",
    label: "Base Goerli",
    rpcUrl: "https://goerli.base.org",
  },
  {
    id: 167004,
    token: "ETH",
    label: "Taiko",
    rpcUrl: "https://rpc.a2.taiko.xyz",
  },
  {
    id: 534353,
    token: "ETH",
    label: "Scroll",
    rpcUrl: "https://alpha-rpc.scroll.io/l2",
  },
  {
    id: 10200,
    token: "xDai",
    label: "Chiado",
    rpcUrl: "https://rpc.chiadochain.net",
  },
  {
    id: 5001,
    token: "BIT",
    label: "Mantle",
    rpcUrl: "https://rpc.testnet.mantle.xyz/",
  },
];

export const networkEnum = Object.freeze({
  "0x1": "Ethereum Main",
  "0x38": "BSC",
  "0x89": "Polygon",
  "0xfa": "Fantom",
  localhost: "localhost",
});
