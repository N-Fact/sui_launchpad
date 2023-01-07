import { useWallet } from "@suiet/wallet-kit";
import axios from "axios";
import AccountPage from "containers/AccountPage/AccountPage";
import NftDetailPage from "containers/NftDetailPage/NftDetailPages";
import Page404 from "containers/Page404/Page404";
import PageHome from "containers/PageHome/PageHome";
import PageHome2 from "containers/PageHome/PageHome2";
import SiteHeader from "containers/SiteHeader";
import StateProvider from "context/StateProvider";
import { useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "shared/Footer/Footer";
import ScrollToTop from "./ScrollToTop";
import { Page } from "./types";


export const pages: Page[] = [
  { path: "*", component: Page404 },
  { path: "/", component: PageHome },
  { path: "/#", component: PageHome },
  { path: "/nft-detail/:slug", component: NftDetailPage },
  { path: "/account", component: AccountPage },
  { path: "/bazaar", component: PageHome2 },
  // { path: "/home-header-2", component: PageHome },
  // { path: "/page-collection", component: PageCollection },
  // { path: "/page-search", component: PageSearch },
  // { path: "/page-author", component: AuthorPage },
  // { path: "/page-upload-item", component: PageUploadItem },
  // { path: "/connect-wallet", component: PageConnectWallet },
  // { path: "/blog", component: BlogPage },
  // { path: "/blog-single", component: BlogSingle },
  // { path: "/contact", component: PageContact },
  // { path: "/about", component: PageAbout },
  // { path: "/signup", component: PageSignUp },
  // { path: "/login", component: PageLogin },
  // { path: "/subscription", component: PageSubcription },
];

const MyRoutes = () => {
  const { connected, account, disconnect, status } = useWallet();


  const { user, setUser } = useContext(StateProvider);

  useEffect(() => {

    async function checkWallet() {
      const currentWallet = await axios.post("https://suilaunchpad.novemyazilim.com/api/v1/user/login", {
        "wallet_address": account?.address,
      });
      if (currentWallet.data.status === "false") {
        const Random = Math.floor(100000 + Math.random() * 900000);

        const createWallet = await axios.post("https://suilaunchpad.novemyazilim.com/api/v1/user", {
          "wallet_address": account?.address,
          "public_key": "account?.publicKey",
          "wallet_name": "SUI",
          "name": "dktools-" + Random,
        });
        if (createWallet.status == 200) {
          setUser(createWallet.data.data);
        } else {
          disconnect();
        }
      } else {
        setUser(currentWallet.data.data);
      }
    }

    async function checkUser() {
      const user = await axios.post("https://suilaunchpad.novemyazilim.com/api/v1/user/login", {
        "wallet_address": account?.address,
      });
      if (user.data.status == "true") {
        setUser(user.data.data);
      } else {
        disconnect();
      }
    }

    if (connected) {
      // axios post
      checkWallet();
    }
    if (user == null && connected) {
      checkUser();
    }
  }, [connected, account]);

  return (
    <BrowserRouter
      basename={process.env.NODE_ENV === "production" ? "" : ""}
    >
      <ScrollToTop />
      <SiteHeader connected={connected}/>
      <Routes>
        {pages.map(({ component, path }) => {
          const Component = component;
          return <Route key={path} element={<Component />} path={path} />;
        })}
        <Route element={<Page404 />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default MyRoutes;
