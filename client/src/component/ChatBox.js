import moment from 'moment';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Stack } from 'react-bootstrap';
import InputEmoji from "react-input-emoji";
import { AuthContext } from '../context/auth.context';
import { useFetchRecipient } from '../hook/useFetchRecipient';
import { postRequest } from '../utils/api.service';

const ChatBox = ({messages, chat, setMessages,socket}) => {
  const {user} = useContext(AuthContext);
  const {recipientUser} = useFetchRecipient(chat, user); 
  const [text,setText] = useState("");
  const scroll = useRef(null);

  useEffect(() => {
    scroll.current?.scrollIntoView({behavior: "smooth"});
  }, [messages]);

  const sendMessage = async() => {
    const res = await postRequest('/message', {chatId: chat._id, senderId: user._id, text});

    if(res.error){
      console.log(res,"error");
    }else{
      setText("");
      setMessages((prev) => [...prev, res]);
      
      socket.emit('sendMessage', {...res, recipientId: recipientUser._id})

    }
  }

  return (
    <Stack className='chat-box'>
      {/* chat-header */}
      <div className='text-center py-2' style={{background: 'rgb(30, 30, 30)'}}>
        <strong>{recipientUser?.name}</strong>
      </div>

      {/* message */}
      <Stack className='messages mt-3' gap={3} >
        {messages && messages.map((msg,i) => (
          <Stack key={i} className={`message ${msg.senderId ===  user._id ? 'self': 'align-self-start'}`} ref={scroll}>
            <span>{msg.text}</span>
            {/* message-footer */}
            <span className='align-self-end' style={{fontSize: '12px'}}>{moment(msg.createdAt).calendar()}</span>
          </Stack>
        ))}
      </Stack>

      <Stack gap={3} direction='horizontal' className='p-3' style={{background: 'rgb(30, 30, 30)'}}>
        <InputEmoji
          value={text}
          onChange={setText}
          placeholder="Type a message"
          borderColor='rgba(72,112,223,0.2)'
        />
        <button className='send-btn' onClick={() => sendMessage()}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send-fill" viewBox="0 0 16 16">
            <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z"/>
          </svg>
        </button>
      </Stack>
    </Stack>
  )
}

export default ChatBox