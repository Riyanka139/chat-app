import React, { useCallback, useEffect, useState } from 'react'
import { getRequest, postRequest } from '../utils/api.service';

const PotentialChat = ({user, userChat, setUserChat, onlineUsers}) => {
    const [potentialChat, setPotentialChat] = useState([]);
    const [allUsers, setAllUsers] = useState([]);

    const createChat = useCallback(async(id) => {
        const res = await postRequest('/chat', {firstId: user._id, secondId: id});
        if(res.error){
            return console.log('error in creating chat', res);
        }
        setUserChat((old) => [...old, res])
    } ,[setUserChat, user._id]);

    const getUsers = useCallback(async() => {
        const res = await getRequest('/user');
        if(res.error){
          return console.log("Error in fetching users", res);
        }

        const chats = res.filter(u => u._id !== user._id && !userChat?.some(uc => uc.members.includes(u._id)) );
      
        setPotentialChat(chats);
        setAllUsers(res);
    },[user._id, userChat]);

    useEffect(() => {
        getUsers();

    },[getUsers]);


  return (
    <div className='d-flex mb-3 gap-4'>
        {potentialChat.length > 0 && potentialChat.map((pc,i) => (
            <div className='rounded px-2 py-1 position-relative bg-info' key={i} role="button" onClick={() => createChat(pc._id)}>
                {pc.name}
                {onlineUsers.some(ou => ou.userId === pc._id) && <span className='rounded-circle bg-success d-inline-block position-absolute top-0 start-100 translate-middle' style={{height: '12px', width: '12px'}}></span>}

            </div>
        ))}
    </div>
  )
}

export default PotentialChat