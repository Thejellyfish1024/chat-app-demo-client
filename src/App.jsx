import { useContext, useEffect } from "react";
import { useState } from "react"
import { io } from "socket.io-client";
import useAxiosPublic from "./hooks/useAxiosPublic";
import useAllChats from "./hooks/useAllMessages";
import { AuthContext } from "./provider/AuthProvider";

const socket = io.connect("http://localhost:3000");

function App() {
  const [message, setMessage] = useState("");
  const axiosPublic = useAxiosPublic();
  const { data: allMessages, refetch } = useAllChats();
  const { user } = useContext(AuthContext);
  // socket with useEffect

  useEffect(() => {
    socket.on("receive-message", (data) => {
      // console.log(data);
      if (data) {
        refetch();
      }
    });
  }, [socket]);

  const handleSend = async () => {
    const newMessage = {
      message: message,
      sender: user?.email
    }
    console.log(message);
    const res = await axiosPublic.post("/new-chat", newMessage)
    console.log(res?.data);
    if (res?.data?.insertedId) {
      refetch();
    }
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
            allMessages?.map(message => <div key={message?._id}>
              {message?.sender === user?.email ?
                <p className="">
                  <span className="text-white rounded-full py-1 px-4 w-fit bg-green-500 text-end">{message?.message}</span>
                </p>
                :
                <p className="text-end">
                  <span className="text-white rounded-full py-1 px-4 w-fit bg-red-500 text-end">{message?.message}</span>
                </p>
              }

            </div>)
          }
        </div>
      </div>
    </div>
  )
}

export default App
