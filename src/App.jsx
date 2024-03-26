import { useEffect } from "react";
import { useState } from "react"
import { io } from "socket.io-client";

const socket = io.connect("http://localhost:3001");

function App() {
  
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  // const [messageReceived, setMessageReceived] = useState("");

  useEffect(() => {
    socket.on("receive-message", (data) => {
      // setMessageReceived(data);
      setAllMessages([...allMessages,data]);
      console.log(allMessages);
      // messages?.push(data);
      // setAllMessages(messages)
    });
  }, [socket]);

  const handleSend = () =>{
 
    socket.emit("send-message", message)

  }

 

  return (
    <div className="mt-5 ml-16">
      <h2 className="text-3xl font-bold text-red-500">Chat App</h2>
      <div className="w-72 h-72 border-2 mt-6 p-5 gap-2">
        <div className="flex gap-2">
          <input type="text"
          onChange={(event) => setMessage(event?.target.value)}
           className="border p-2 rounded-md " placeholder="send message" />
          <button onClick={handleSend} className="bg-green-600 hover:bg-green-800 text-white font-semibold p-2 rounded-md">Send</button>
        </div>
        <div className="font-medium space-y-2 mt-4">
          {/* {messageReceived} */}
          {
            allMessages?.map(message => <p key={message}>{message}</p>)
          }
        </div>
      </div>
    </div>
  )
}

export default App
