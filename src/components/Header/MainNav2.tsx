import { ConnectButton } from '@suiet/wallet-kit';
import { FC } from "react";
import { Link,useLocation } from "react-router-dom";
import Logo from "shared/Logo/Logo";
import MenuBar from "shared/MenuBar/MenuBar";
export interface MainNav2Props { }



const MainNav2: FC<MainNav2Props> = () => {
  const location = useLocation();
  return (

    <div className={`nc-MainNav2 relative z-10 ${"onTop "}`}>

      <div className="container py-5 relative flex justify-between items-center space-x-4 xl:space-x-8">
        <div className="flex justify-start flex-grow items-center space-x-3 sm:space-x-5 lg:space-x-5">
          <Logo />
          <Link to="/" className="logo-text lg:text-3xl sm:text-2-1 text-xl">
            {location.pathname.includes('/bazaar')?("BAZAAR"):("CATAPULT")}
            
          </Link>

        </div>
        <div className="flex-shrink-0 flex items-center justify-end text-neutral-700 dark:text-neutral-100 space-x-1">
          <div className="hidden items-center xl:flex space-x-2">

            <ConnectButton className='connect-wallet-btn'>
              Connect Wallet
            </ConnectButton>
          </div>
          <div className="flex items-center space-x-1.5 xl:hidden">
            <MenuBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNav2;
