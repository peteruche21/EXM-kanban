import "./App.css";
import { useConnectWallet } from "@web3-onboard/react";
import { useEffect } from "react";
import { useDappStore } from "./store";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { validateWithWhal3s } from "./utils/gate";
import { RouteProvider } from "./providers/router";

function App() {
  const [{ wallet }] = useConnectWallet();
  const location = useLocation();
  const navigate = useNavigate();
  const { isError, data, refetch, isSuccess } = useQuery({
    queryKey: ["pass-gate"],
    queryFn: async () => await validateWithWhal3s(wallet?.accounts[0].address),
    retry: 5,
    enabled: false,
  });
  const [valid, setValid] = useDappStore((state) => [
    state.valid,
    state.setValid,
  ]);

  const reRoute = (to: string) => {
    switch (to) {
      case "/projects":
        if (location.pathname !== "/" && location.pathname === "/login") navigate(to);
        break;
      default:
        if (location.pathname !== "/" && location.pathname !== to) navigate(to);
        break;
    }
  };

  const validate = async () => {
    switch (valid) {
      case true:
        if (wallet) {
          reRoute("/projects");
          break;
        }
      default:
        if (wallet) {
          (!isSuccess || isError) && (await refetch());
          if (isSuccess) {
            setValid(data?.valid);
            data?.valid && reRoute("/projects");
          }
          break;
        }
        reRoute("/login");
        break;
    }
  };

  useEffect(() => {
    validate();
  }, [wallet, isSuccess, isError, location]);

  return <RouteProvider />;
}

export default App;
