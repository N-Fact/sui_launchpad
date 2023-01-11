import React, { useEffect, useState } from 'react';
import Button from 'shared/Button/Button';
import Lottie from 'react-lottie-player'
import lottieJson from '../lotties/live.json'
import "../styles/sidebar.css"
import sideToggle from "../images/sideToggle.png"
import axios from 'axios';

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
interface INftEvent {
  jsonrpc: string;
  method: string;
  name:string;
  url:string;
  params: {
    subscription: number;
    result: {
      timestamp: number;
      txDigest: string;
      id: {
        txSeq: number;
        eventSeq: number;
      };
      event: {
        newObject: {
          packageId: string;
          transactionModule: string;
          sender: string;
          recipient: {
            AddressOwner: string;
          };
          objectType: string;
          objectId: string;
          version: number;
        };
      };
    };
  };
}

interface ObjectData {
  name: string;
  url: string;
}
interface ReturnedObject {
  jsonrpc: string;
  result: {
    status: string;
    details: {
      data: {
        dataType: string;
        type: string;
        has_public_transfer: boolean;
        fields: {
          description: string;
          id: {
            id: string;
          },
          name: string;
          url: string;
        };
      },
      owner: {
        AddressOwner: string;
      };
      previousTransaction: string;
      storageRebate: number;
      reference: {
        objectId: string;
        version: number;
        digest: string;
      };
    };
  };
  id: string;
}



const Sidebar: React.FC<Props> = ({ isOpen, setIsOpen }) => {
  const socket = new WebSocket('wss://fullnode.devnet.sui.io/');
  const [messages, setMessages] = useState<INftEvent[]>([]);
  const messageList = messages.map((message, index) => (

    <li className="LiveMintsItem_container LiveMintsItem_data_received m-2">
      <div className="LiveMintsItem_thumbnail_container">
        <div className="Thumbnail_container w-7">
        <img src={message.url}></img>
        </div>
      </div>
      <div className="LiveMintsItem_contract_info_container">
        <div className="LiveMintsItem_contract_name_container">
          <span className="LiveMintsItem_contract_name">
          {message.name}
          </span>
          {/* <div className="LiveMintsItem_quantity_container">
            <span className="LiveMintsItem_quantity">
              {message.params.result?.event?.newObject?.transactionModule}
            </span>
          </div> */}
        </div>
        <div className="LiveMintsItem_contract_extra_container">
          <span>
            💧 0.00
          </span>
          <div className="LiveMintsItem_extra_divider">
          </div>
          <span>
            💳  {message.params.result?.event?.newObject?.sender.substring(0, 3) + "..." + message.params.result?.event?.newObject?.sender.substring(message.params.result?.event?.newObject?.sender.length - 3)}
          </span>
          <div className="LiveMintsItem_extra_divider">
          </div>
          {/* <div className="LiveMintsItem_verified_container">
            <svg width="12" height="12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M4.987.104A.775.775 0 0 0 3.93.387L3.345 1.4h-1.17a.775.775 0 0 0-.775.775v1.17l-1.013.584a.775.775 0 0 0-.283 1.058L.689 6 .104 7.013A.775.775 0 0 0 .387 8.07l1.013.585v1.169c0 .428.347.775.775.775h1.17l.584 1.013a.775.775 0 0 0 1.058.283L6 11.311l1.013.585a.775.775 0 0 0 1.058-.284l.585-1.012h1.17a.775.775 0 0 0 .774-.775v-1.17l1.013-.584a.775.775 0 0 0 .283-1.058L11.311 6l.585-1.013a.775.775 0 0 0-.284-1.058L10.6 3.344v-1.17a.775.775 0 0 0-.775-.774h-1.17L8.072.387A.775.775 0 0 0 7.013.104L6 .689 4.987.104Zm4.182 4.46a.64.64 0 0 0 .162-.476.63.63 0 0 0-.237-.445.673.673 0 0 0-.495-.146.682.682 0 0 0-.453.24l-2.864 3.33L3.8 5.63a.678.678 0 0 0-.934.008.635.635 0 0 0-.008.904l1.998 1.936a.669.669 0 0 0 .501.188.683.683 0 0 0 .481-.231l3.33-3.871Z" fill="#44927A">
              </path>
            </svg>
          </div> */}
          <span className="LiveMintsItem_quantity">
              {message.params.result?.event?.newObject?.transactionModule}
            </span>
          {/* <span className="LiveMintsItem_function_name">
          {message.params.result?.event?.newObject?.transactionModule}
          </span> */}
        </div>
      </div>
      <div className="LiveMintsItem_buttons_container">
        <a aria-label="live_mints_tx_hash_link" className="ExternalLink_external_link LiveMintsItem_button"
          href={"https://explorer.sui.io/transaction/" + message.params.result.txDigest} target="_blank">
          <img src={"https://explorer.sui.io/favicon32x32.png"}></img>
        </a>
      </div>
    </li>
  ));

  async function getObject(objectId: String) : Promise<ObjectData | null> {
      try {
        const jsonData = {
          method: 'sui_getObject',
          jsonrpc: '2.0',
          params: [objectId],
          id: 'bd415700-a034-4904-8901-dds',
        };
        const response = await axios.post<ReturnedObject>("https://fullnode.devnet.sui.io/", jsonData);
        
        const name = response.data.result.details.data.fields.name;
        const url = response.data.result.details.data.fields.url;
        const data: ObjectData = {
          name: name,
          url: url
        }
        return data;
      } catch (error) {
        console.error(error);
        return null;
      }
  }

  useEffect(() => { runSocket() }, []);
  const runSocket = () => {
    console.log("Socket run")

    socket.onopen = () => {
      console.log("Connection opened")
      socket.send(
        JSON.stringify({ "jsonrpc": "2.0", "id": 1, "method": "sui_subscribeEvent", "params": [{ "Any": [{ "Module": "test_catapult" }] }] })
      );
      console.log("sended")
    };

    socket.onmessage = (event) => {
      //console.log(event.data)
      const parsed = JSON.parse(event.data);
      //console.log(parsed)
      if (
        "params" in parsed
      ) {
        if ("result" in parsed.params) {
          if ("event" in parsed.params.result) {
            if ("newObject" in parsed.params.result.event) {
              console.log("newObject var")
              let jsonData: INftEvent = parsed;
              if (!messages.some(m => m.params.result.txDigest === jsonData.params.result.txDigest)) {
                //console.log(jsonData.params.result.txDigest+"-"+jsonData.params.result.event.newObject.objectId);
                getObject(jsonData.params.result.event.newObject.objectId).then(result=>{
                  jsonData.name=result?.name??"";
                  jsonData.url=result?.url??"";
                  setMessages((prevMessages) => ([...prevMessages.slice(prevMessages.length - 23, prevMessages.length), jsonData]));
                });
                

              }
              else {
                console.log("yoktur")
              }
            }
          } else { console.log("newObject no results in events") }
        }
        else { console.log("thereis no results in params") }
      } else { console.log("thereis no params in json") }

      /* let jsonData: INftEvent = parsed;
      console.log(jsonData.params.result.event.newObject.objectId);
      setMessages((prevMessages) => [...prevMessages, jsonData]);  */
    };

    socket.onclose = () => {
      console.log('Connection closed');
    };
  };

  const closeClick = () => {
    socket.close();
  };
  return (<div className={"flex hidden md:block"}>
    <div className={`fixed  top-80 h-screen  w-80 ${isOpen ? 'right-0' : 'right-64'}`}>

      <div className={`float-right  ${isOpen ? '' : 'custommargin'}`} ><button onClick={() => setIsOpen(!isOpen)}>

        <img src={sideToggle}></img>
      </button></div>
      { /*<Button onClick={() => getObject("0x02d583025795e96eab5aa940e6f9fca1dc0b2e88")}><div className={"bg-red-600 px-4 py-4"} >Close</div></Button>
      <Button onClick={() => runSocket()}><div className={"bg-red-600 px-4 py-4"} >run</div></Button> */}

    </div>
    <div className={`fixed  right-0 top-0 h-screen w-80  bor overflow-y-auto ${isOpen ? 'hidden' : ''}  `} style={{ transition: 'transform 0.3s ease-out' }}>
      <div className={"w-10 h-24 flex"}></div>
      <div className={"flex items-center justify-center"}>
        <div className={"flex w-30 h-10 items-center"}><h1>Live Mints on Catapult</h1></div>
        <div className={"flex w-10  h-10 items-center"}>
          <Lottie
            loop
            animationData={lottieJson}
            play
            style={{ width: 30, height: 30 }}
          />
        </div>

      </div>

      <ul className={"text-xs"}>


        {messageList}</ul>

    </div>
  </div>
  );
};

export default Sidebar;

