import Header2 from "components/Header/Header2";
import HeaderLogged from "components/Header/HeaderLogged";
import StateProvider from "context/StateProvider";
import { FC, useContext } from "react";
import { useLocation } from "react-router-dom";

export interface SiteHeaderProps {
  connected: boolean;
}

const SiteHeader: FC<SiteHeaderProps> = (connected) => {
  let location = useLocation();
  const { user, setUser } = useContext(StateProvider);
  if (connected.connected && user != null) {
    // console.log(user);

    return <HeaderLogged />
  } else {
    return <Header2 />
  }
  // return <Header2 />
};

export default SiteHeader;
