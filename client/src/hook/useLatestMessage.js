import { useEffect, useState } from "react"
import { getRequest } from "../utils/api.service";

const useLatestMessage = (chat) => {
    const [lastMessage, setLastMessage] = useState(null);

  useEffect(() => {
    const getMessage = async () => {
        
        const res = await getRequest(`/message/${chat._id}`);
    
        if (res.error) {
          console.log('Error while fetching message', res);
          return;
        } 
        setLastMessage(res[res.length - 1]);
      }
      getMessage();
    },[chat._id]);

    return {lastMessage};
}

export default useLatestMessage