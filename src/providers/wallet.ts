import icon from "../assets/vector/default.svg?raw";
import logo from "../assets/vector/default-monochrome.svg?raw";

import { init } from "@web3-onboard/react";
import injectedModule from "@web3-onboard/injected-wallets";
import ledgerModule from "@web3-onboard/ledger";
import walletConnectModule from "@web3-onboard/walletconnect";
import coinbaseModule from "@web3-onboard/coinbase";
import torusModule from "@web3-onboard/torus";
import gnosisModule from "@web3-onboard/gnosis";
import sequenceModule from "@web3-onboard/sequence";
import mewWalletModule from "@web3-onboard/mew-wallet";
import uauthModule from "@web3-onboard/uauth";
import enrkypt from "@web3-onboard/enkrypt";

import { chains } from "./chains";
import { pass } from "../constants";

const uauthOptions = {
  clientID: pass.uauthClientID,
  redirectUri: window.location.href,
  scope:
    "openid wallet email:optional humanity_check:optional profile:optional social:optional",
};

const injected = injectedModule();
const coinbase = coinbaseModule();
const walletConnect = walletConnectModule({
  projectId: pass.wcProjectId,
  version: 2,
});
const torus = torusModule();
const ledger = ledgerModule();
const gnosis = gnosisModule();
const sequence = sequenceModule();
const enrkyptModule = enrkypt();
const uauth = uauthModule(uauthOptions);
const mewWallet = mewWalletModule();

const wallets = [
  injected,
  coinbase,
  walletConnect,
  ledger,
  uauth,
  mewWallet,
  gnosis,
  torus,
  sequence,
  enrkyptModule,
];

const options = {
  connect: {
    autoConnectLastWallet: true,
    showSidebar: false,
  },
  wallets,
  chains,
  appMetadata: {
    name: "Third Board",
    icon,
    logo,
    description:
      "Self Hosted, chain agnostic and lightweight project management for teams",
    recommendedInjectedWallets: [
      { name: "Coinbase", url: "https://wallet.coinbase.com/" },
      { name: "MetaMask", url: "https://metamask.io" },
    ],
  },
  accountCenter: {
    desktop: {
      position: "topRight",
      enabled: true,
      minimal: true,
    },
    mobile: {
      position: "topRight",
      enabled: true,
      minimal: true,
    },
  },
  theme: "dark",
};

export const web3Onboard = init(options as any);
