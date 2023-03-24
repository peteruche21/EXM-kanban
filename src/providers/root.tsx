import { FC, PropsWithChildren } from "react";
import {
  Web3OnboardProvider,
} from "@web3-onboard/react";
import { web3Onboard } from "./wallet";

const RootProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Web3OnboardProvider web3Onboard={web3Onboard}>
      {children}
    </Web3OnboardProvider>
  );
};

export default RootProvider;
