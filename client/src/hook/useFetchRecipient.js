import { useCallback, useEffect, useState } from 'react'
import { getRequest } from '../utils/api.service';

export const useFetchRecipient = (chat,user) => {
    const [recipientUser, setRecipientUser] = useState(null);

    const recipientId = chat?.members.find((id) => id !== user._id);

    const getUser = useCallback(async () => {
        if(recipientId){
            const res = await getRequest(`/user/${recipientId}`);
            if(res.error){
                return res;
            }
            setRecipientUser(res);
        }
    },[recipientId])

    useEffect(() => {
       getUser() 
    },[getUser]);

  return {recipientUser}
}

// export default useFetchRecipient