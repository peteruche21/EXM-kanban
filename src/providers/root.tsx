import { FC, PropsWithChildren } from "react";
import { Web3OnboardProvider } from "@web3-onboard/react";
import { web3Onboard } from "./wallet";
import QueryProvider from "./query";
import { RouteProvider } from "./router";

const RootProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryProvider>
      <RouteProvider />
      <Web3OnboardProvider web3Onboard={web3Onboard}>
        {children}
      </Web3OnboardProvider>
    </QueryProvider>
  );
};

export default RootProvider;
