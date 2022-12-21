import { useWallet } from "@suiet/wallet-kit";
import StateProvider from "context/StateProvider";
import { FC, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Avatar from "shared/Avatar/Avatar";
import Button from "shared/Button/Button";
import NcImage from "shared/NcImage/NcImage";
import TimeCountDown from "./TimeCountDown";


export interface CardLarge2Props {
  className?: string;
  project: any;
}


const NftDetailCard2: FC<CardLarge2Props> = ({
  className = "",
  project = null,
}) => {
  let noData;
  const [MintCount, setMintCount] = useState(0);
  const [mintPercent, setMintPercent] = useState(0);
  const [mintEnded, setMintEnded] = useState(false);
  const { imageUrl } = useContext(StateProvider);
  const wallet = useWallet();
  async function sendMintTransaction() {
    if (wallet.connected) {
      try {

        const resData = await wallet.signAndExecuteTransaction({
          transaction: {
            kind: 'moveCall',
            data: {
              packageObjectId: project?.contract_address,
              module: 'test_catapult',
              function: 'mint',
              typeArguments: [],
              arguments: [project?.resource_address],
              gasBudget: 10000,
            }
          }
        });
        toast.success("Nft minted successfully!",
          {
            duration: 3000,
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
            },
          }
        );

      } catch (e) {
        toast.error("Nft mint failed",
          {
            duration: 3000,
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
            },
          }
        );
      }
    } else {
      toast.error("Please connect your wallet",
        {
          duration: 3000,
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        }
      );
    }

  }


  async function getCounter() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      "method": "sui_getObject",
      "jsonrpc": "2.0",
      "params": [
        project?.resource_address
      ],
      "id": "bd415700-a034-4904-8901-cc634f0f364a"
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    await fetch("https://fullnode.devnet.sui.io/", requestOptions as any)
      .then(response => response.text())
      .then(result => {
        let data = JSON.parse(result);
        let counter = data.result.details.data.fields.value;
        setMintCount(counter);
        setMintPercent(((counter / project?.total_supply) * 100))
        if (counter == project?.total_supply) {
          setMintEnded(true);
        }
      }
      )
      .catch(error => console.log('error', error));
  }




  useEffect(() => {
    console.log(project?.contract_address);
    // console.log(project);
    if (project?.contract_address) {
      getCounter();
    }

  }, [project]);

  useEffect(() => {

    const interval = setInterval(() => {
      if (project?.contract_address) {
        getCounter();

      }

    }, 2000);
    return () => clearInterval(interval);
  });

  if (project?.rounds?.length == 0) {
    noData = (
      <div className="rounded-2xl gap-6 flex flex-col shadow-md border border-neutral-50 dark:border-neutral-800 hover:bg-zinc-900 duration-500 p-2 lg:p-3 items-start">
        <div className="flex w-full justify-center">
          <h2 className="text-2xl ">  There are no rounds</h2>
          <div style={{ width: "150px" }}></div>
        </div>
      </div>
    );
  }
  return (
    <div
      className={`nc-CardLarge2  ${className}`}
      data-nc-id="CardLarge2"

    >

      {/* HEADER */}
      <div className="w-full">
        <div className=" bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 p-5 lg:p-8 rounded-[15px] shadow-xl flex flex-col md:flex-row lg:items-center">
          <div className="flex flex-grow flex-col sm:flex-row md:block sm:items-start sm:justify-between">
            <div className="">
              <NcImage
                src={imageUrl + project?.image}
                containerClassName="aspect-w-1 aspect-h-1 rounded-[15px] overflow-hidden" />
              <div className="mt-4">
                <div className="flex ">
                  <span className="opacity-75 text-sm">Total minted</span>
                  <span className=" text-sm text-white ml-auto mr-2 font-semibold">{/* mintPercent.toFixed(2) %*/}</span><span className="opacity-75 text-sm">{MintCount} </span>
                </div>
                <div className="mt-1 w-full h-2 bg-red-400 bg-opacity-60 rounded-full ">
                  <div className="h-2 bg-red-400 rounded-full transition-all duration-1000" style={{ width: mintPercent + "%" }}></div>
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center sm:justify-center space-x-3">
              <div className="flex space-x-1.5 text-neutral-700 dark:text-neutral-300">
                <a target="_blank"
                  href={project?.website}
                  className="w-8 h-8 md:w-10 md:h-10 flex items-center  justify-center rounded-full bg-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700 dark:bg-neutral-800 cursor-pointer"
                >
                  <i className="las la-globe text-base sm:text-xl"></i>
                </a>
                <a target="_blank"
                  href={project?.discord}
                  className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700 dark:bg-neutral-800 cursor-pointer"
                >
                  <i className="text-base sm:text-xl lab la-discord"></i>
                </a>
                <a target="_blank"
                  href={project?.twitter}
                  className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700 dark:bg-neutral-800 cursor-pointer"
                >

                  <i className="text-base sm:text-xl lab la-twitter"></i>
                </a>
              </div>

            </div>
          </div>

          <div className="mt-5 md:mt-0 md:ml-8 xl:ml-14">

            <div className="max-w-screen-sm">
              <h2 className="inline-block text-2xl sm:text-3xl lg:text-5xl font-semibold mb-2">
                {project?.title}
              </h2>
              <p className=" text-base mb-6">
                {project?.description}
              </p>
              {/* AUTHOR AND COLLECTION */}
              <div className="flex justify-between items-center sm:flex-row space-y-3 sm:space-y-0 sm:space-x-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <Avatar imgUrl={project?.user?.avatar != null ? imageUrl + project?.user?.avatar : imageUrl + "uploads/blank.png"} sizeClass="w-10 h-10" />
                  </div>
                  <div className="ml-3">
                    <div className="text-xs dark:text-neutral-400">Creator</div>
                    <div className="text-sm font-semibold flex items-center">
                      <span>{project?.user?.name}</span>
                    </div>
                  </div>
                </div>
                <span className=" border-solid  border px-2 py-2 text-xs shadow-md dark:border-neutral-800 rounded-full flex items-center justify-center">
                  {/* TOTAL ITEMS : {project?.total_supply} */}
                </span>
              </div>
              <div className="mt-6 xl:mt-8 gap-4 flex flex-col">
                {noData}
                {
                  project?.rounds?.map((round: any, index: number) => {
                    if (round.status == 0) {
                      // ENDED
                      return (
                        <div key={index} className="rounded-2xl gap-6 flex flex-col shadow-md border border-neutral-50 dark:border-neutral-800 hover:bg-zinc-900 duration-500 p-2 lg:p-3 items-start">
                          <div className="flex w-full">
                            <span className="text-xs text-white rounded-full shadow-md bg-slate-800 py-1 px-2 capitalize">
                              {round.name}
                            </span>
                            <span className="text-xs text-white rounded-full shadow-md bg-slate-800 py-1 px-2 ml-2">
                              Items : {round.item_count}
                            </span>
                            {round.total_ended_supply > 0 ? <span className="text-xs text-white rounded-full shadow-md bg-slate-800 py-1 px-2 ml-2">
                              Total minted : {round.total_ended_supply}
                            </span> : ""}
                            <span className="text-red-400  ml-auto ">
                              ENDED
                            </span>
                            <div style={{ width: "150px" }}></div>
                          </div>
                          <div className="flex justify-between w-full items-end">
                            <span className="font-sm text-base rounded">
                              {/*{round.mintbywallet} Mint per wallet   */}<br /><b> Price: <span className="text-green-600">{round.price} $SUI</span></b>
                            </span>
                            <div style={{ width: "150px" }}></div>
                          </div>
                        </div>
                      )
                    } else if (round.status == 1) {
                      // LIVE
                      if (!mintEnded) {
                        return (
                          <div key={index} className="rounded-2xl gap-6 flex flex-col shadow-md border border-neutral-50 dark:border-neutral-800 hover:bg-zinc-900 duration-500 p-2 lg:p-3 items-start">
                            <div className="flex w-full">
                              {/* <span className="text-xs shadow-md text-white rounded-full bg-slate-800 py-1 px-2 capitalize">
                                {round.name}
                              </span> */}
                              {/* <span className="text-xs shadow-md text-white rounded-full bg-slate-800 py-1 px-2 ml-2">
                                Items : {round.item_count}
                              </span> */}
                              <span className="text-green-400 ml-auto">
                                LIVE
                              </span>
                            </div>
                            <div className="flex justify-between w-full items-end">
                              <span className="font-sm text-base rounded">
                                {/*{round.mintbywallet} Mint per wallet   */}<br /><b> Price: <span className="text-green-600">{round.price} $SUI</span></b>

                              </span>
                              <div style={{ width: "150px" }}></div>
                              <Button className="bg-blue-600 hover:bg-green-700 duration-500 font-semibold rounded-md space" sizeClass="px-6 py-2 " onClick={async () => {
                                await sendMintTransaction();
                              }}  >MINT</Button>

                            </div>
                          </div>
                        )
                      } else {
                        return (
                          <div key={index} className="rounded-2xl gap-6 flex flex-col shadow-md border border-neutral-50 dark:border-neutral-800 hover:bg-zinc-900 duration-500 p-2 lg:p-3 items-start">
                            <div className="flex w-full">
                              {/* <span className="text-xs text-white rounded-full shadow-md bg-slate-800 py-1 px-2 capitalize">
                                {round.name}
                              </span>
                              <span className="text-xs text-white rounded-full shadow-md bg-slate-800 py-1 px-2 ml-2">
                                Items : {round.item_count}
                              </span> */}
                              {/* {round.total_ended_supply > 0 ? <span className="text-xs text-white rounded-full shadow-md bg-slate-800 py-1 px-2 ml-2">
                                Total minted : {round.total_ended_supply}
                              </span> : ""} */}
                              <span className="text-red-400  ml-auto ">
                                ENDED
                              </span>
                            </div>
                            <div className="flex justify-between w-full items-end">
                              <span className="font-sm text-base rounded">
                                {/*{round.mintbywallet} Mint per wallet   */}<br /><b> Price: <span className="text-green-600">{round.price} $SUI</span></b>
                              </span>
                              <div style={{ width: "150px" }}></div>
                            </div>
                          </div>
                        )
                      }
                    } else if (round.status == 2) {
                      // UPCOMING Not Started
                      return (
                        <div key={index} className="rounded-2xl gap-6 flex flex-col shadow-md border border-neutral-50 dark:border-neutral-800 hover:bg-zinc-900 duration-500 p-2 lg:p-3 items-start">
                          <div className="flex w-full">
                            {/* <span className="text-xs shadow-md text-white rounded-full bg-slate-800 py-1 px-2 capitalize">
                              {round.name}
                            </span>
                            <span className="text-xs shadow-md text-white rounded-full bg-slate-800 py-1 px-2 ml-2">
                              Items : {round.item_count}
                            </span> */}
                            <span className="text-yellow-200 ml-auto">
                              Not Started
                            </span>
                          </div>
                          <div className="flex justify-between w-full">
                            <span className="font-sm text-base rounded">
                              {/*{round.mintbywallet} Mint per wallet   */}<br /><b> Price: <span className="text-green-600">{round.price} $SUI</span></b>
                            </span>
                            <div style={{ width: "150px" }}></div>
                            <TimeCountDown eventDate={round.event_date} />
                          </div>
                        </div>
                      )
                    }
                  })
                }

              </div>
            </div>

          </div>
        </div>

      </div>
      {/* ====================== END HEADER ====================== */}

    </div >
  );
};

export default NftDetailCard2;
