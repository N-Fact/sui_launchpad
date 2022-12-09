import { FC } from "react";
import MainNav2Logged from "./MainNav2Logged";

export interface HeaderLoggedProps { }

const HeaderLogged: FC<HeaderLoggedProps> = () => {
  return (
    <div className="nc-Header2  w-full z-40 ">
      {/* NAV */}
      <MainNav2Logged />
    </div>
  );
};

export default HeaderLogged;
