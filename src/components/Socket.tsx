import React, { useState } from 'react';

export const SocketReader = () => {
    const socket = new WebSocket('wss://fullnode.devnet.sui.io/');
    const [messages, setMessages] = useState<string[]>([]);
    const messageList = messages.map((message, index) => (
        <li key={index}>{message}</li>
      ));

    
      const handleClick = () => {
        socket.onopen = () => {
            socket.send(
              JSON.stringify({"jsonrpc":"2.0", "id": 1, "method": "sui_subscribeEvent", "params": [{"Any":[ {"Module":"devnet_nft"}]}]})
            );
          };
    
          socket.onmessage = (event) => {
            setMessages((prevMessages) => [...prevMessages, event.data]);
          };
    
          socket.onclose = () => {
            console.log('Connection closed');
          };
      };

      const closeClick = () => {
          socket.close();
      };
      

  return (
    <div>
      <button onClick={handleClick}>Send Message</button>
      <button onClick={closeClick}>Close</button>
      <ul>{messageList}</ul>
    </div>
  );
};
