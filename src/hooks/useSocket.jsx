import { useQuery } from "@tanstack/react-query";
import { io } from "socket.io-client";

const socket = io.connect("http://localhost:3000");

// socket with tanStack

const useSocket = () => {
    const { data, refetch } = useQuery({
        queryKey: ["socket-connection"],
        queryFn: () => {
            socket.on("receive-message", (data) => {
                console.log(data);
                return data;
                // if (data) {
                //     refetch();
                // }
            });
        }
    })
    
    return { socket,data, refetch }
};

export default useSocket;

// socket with useEffect

// useEffect(() => {
//     socket.on("receive-message", (data) => {
//       console.log(data);
//       if(data){
//         refetch();
//       }
//       // setAllMessages([...allMessages, data]);
//     });
//   }, [socket]);