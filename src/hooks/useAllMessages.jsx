import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAllChats = () => {
    const axiosPublic = useAxiosPublic();
    const {data =[], refetch} = useQuery({
        queryKey : ["all-chats"],
        queryFn : async() =>{
           const data = await axiosPublic.get("/all-chats")
           return await data?.data;
        }
    })
    // console.log(data);

    return {data, refetch}
};

export default useAllChats;