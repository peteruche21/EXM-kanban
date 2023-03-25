import { FC, PropsWithChildren } from "react";
import { Web3OnboardProvider } from "@web3-onboard/react";
import { web3Onboard } from "./wallet";
import QueryProvider from "./query";
import RootLayout from "../components/Layout/RootLayout";

const RootProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryProvider>
      <Web3OnboardProvider web3Onboard={web3Onboard}>
        <RootLayout>
          {children}
        </RootLayout>
      </Web3OnboardProvider>
    </QueryProvider>
  );
};

export default RootProvider;
