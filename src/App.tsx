
import { WalletProvider } from '@suiet/wallet-kit';


import { UserProvider } from 'context/StateProvider';
import { Toaster } from 'react-hot-toast';
import MyRouter from "routers/index";

const App: React.FC = () => {
  return (
    <UserProvider >

      <WalletProvider>
        <Toaster />
        <div className="text-base text-neutral-900 dark:text-neutral-200 bg-dwarf">
          <MyRouter />
        </div>
      </WalletProvider>
    </UserProvider>

  );
}

export default App;
