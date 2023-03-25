import "./App.css";

import { useConnectWallet } from "@web3-onboard/react";

function App() {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();

  return (
    <div className="App">
      <>hello from app:inner</>
    </div>
  );
}

export default App;
