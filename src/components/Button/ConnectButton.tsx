import { ReactComponent as ETHLogo } from "../../assets/vector/ethereum-eth-logo.svg";
import { useConnectWallet } from "@web3-onboard/react";

const ConnectButton = () => {
  const [{ connecting, wallet }, connect] = useConnectWallet();

  const login = async () => {
    await connect();
  };

  return (
    <div>
      {connecting ? (
        <button className="btn btn-square loading" />
      ) : (
        <button
          className="btn btn-wide glass"
          onClick={login}
          disabled={wallet ? true : false}
        >
          <span>
            <ETHLogo className="btn-xs" />
          </span>{" "}
          {wallet ? "Connected" : "Connect Wallet"}
        </button>
      )}
    </div>
  );
};

export default ConnectButton;
