import "./App.css";
import { useConnectWallet } from "@web3-onboard/react";
import { useEffect } from "react";

function App() {
  const [{ wallet }] = useConnectWallet();

    // validate in app.tsx
    // routing and re-routing in app.tsx

    //
    const validate = async(address: string) => {
      // check if the wallet validation is in zustand

      // if its in zustand, dont make an api call

      // if it is not call, validate and save in zustand
  }

  useEffect(() => {
    // check if is connected

    // call validate
  }, [])
}

export default App;
