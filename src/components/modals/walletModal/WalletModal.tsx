import { AptosWalletName, MartianWalletName, useWallet } from '@manahippo/aptos-wallet-adapter';
import martian from "images/icons/martian.svg";
import petra from "images/icons/petra.png";
import toast from 'react-hot-toast';

const WalletModal = () => {
  const { wallet, disconnecting, autoConnect, select, connect, ...rest } = useWallet();

  function connectMartian() {
    connect(MartianWalletName).then((e) => {
      toast.success("Connected to Martian Wallet",
        {
          duration: 3000,
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        }
      );
      sessionStorage.setItem('firstConnected', "true");

    });
  }

  function connectPontem() {
    connect(AptosWalletName).then((e) => {
      toast.success("Connected to Pontem Wallet",
        {
          duration: 3000,
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        }
      );
      sessionStorage.setItem('firstConnected', "true");

    });
  }

  return (
    <div >
      <p className="text-sm font-normal text-gray-800 dark:text-gray-400">Connect with one of our available wallet providers or create a new one.</p>
      <ul className="my-4 space-y-2">
        <li>
          <button onClick={connectMartian} className="flex w-full items-center p-3 text-base font-bold text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 group hover:shadow dark:bg-neutral-900 dark:hover:bg-zinc-900 shadow-md dark:text-white">
            <img width={40} src={martian} />
            <span className="flex-1 inline-flex ml-3 whitespace-nowrap">Martian Wallet</span>
            {/* <span className="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-gray-800 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">Popular</span> */}
          </button>
        </li>
        <li>
          <a href='#' onClick={connectPontem} className="flex w-full items-center p-3 text-base font-bold text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 group hover:shadow dark:bg-neutral-900 dark:hover:bg-zinc-900 shadow-md dark:text-white">
            <img width={40} src={petra} />
            <span className="flex-1 ml-3 inline-flex whitespace-nowrap">Petra Wallet</span>
          </a>
        </li>

      </ul>
      <div>
        {/* <a href="#" className="inline-flex items-center text-xs font-normal text-gray-800 hover:underline dark:text-gray-400">
      
          Why do I need to connect with my wallet?</a> */}
      </div>
    </div>


  );
};

export default WalletModal;
