import ConnectButton from "../components/Button/ConnectButton";
import { useConnectWallet } from "@web3-onboard/react";
import { useDappStore } from "../store";

const Login = () => {
  const [{ wallet }] = useConnectWallet();
  const valid = useDappStore((state) => state.valid);
  return (
    <div className="flex flex-col justify-around px-4 h-[90vh] pt-[15vh] pb-[35vh]">
      <div className="m-auto">
        <h1 className="text-4xl font-semibold text-secondary">
          Welcome friend.
        </h1>
        <h1 className="text-4xl font-semibold">We're happy you're here.</h1>
        {wallet ? (
          valid ? (
            <h2 className="uppercase font-medium text-sm my-3 text-gray-400">
              you are connected
            </h2>
          ) : valid == null ? (
            <h2 className="font-medium text-sm my-3 mt-8 text-accent max-w-md">
              authenticating ...
            </h2>
          ) : (
            <h2 className="font-medium text-sm my-3 mt-8 text-accent max-w-md">
              Unfortunately, you can not access this application, because you do
              not own a pass NFT required to access this space. if it's an
              error, please contact your project manager.{" "}
              <a href={`/${wallet.accounts[0].address}`} className="link">
                or mint from here
              </a>
            </h2>
          )
        ) : (
          <h2 className="uppercase font-medium text-sm my-3 text-gray-400">
            sign in with your wallet
          </h2>
        )}
      </div>
      <ConnectButton />
    </div>
  );
};

export default Login;
