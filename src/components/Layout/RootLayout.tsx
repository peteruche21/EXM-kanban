import { ReactComponent as Logo } from "../../assets/vector/default-monochrome.svg";
import { FC, PropsWithChildren } from "react";
import Footer from "./Footer";

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <div className="navbar bg-base-100">
        <a className="btn btn-ghost normal-case text-xl" href="/">
          <Logo className="btn-xs" />
        </a>
      </div>
      {children}
      <Footer />
    </div>
  );
};

export default RootLayout;
