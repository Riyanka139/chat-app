import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Alert, Container } from 'react-bootstrap';
import { io } from 'socket.io-client';
import ChatBox from '../component/ChatBox';
import PotentialChat from '../component/PotentialChat';
import UserChat from '../component/UserChat';
import { AuthContext } from '../context/auth.context';
import { getRequest } from '../utils/api.service';

const Chat = () => {
  const [userChat, setUserChat] = useState([]);
  const [isChatLoading, setChatIsLoading] = useState(false);
  const [chatError, setChatError] = useState(null);
  const [messages, setMessages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [notification,setNotification] = useState([]);

  const { user } = useContext(AuthContext);

  console.log(notification,"noti");

  const getChat = useCallback(async () => {
    if (user._id) {
      setChatError(null);
      setChatIsLoading(true);
      const res = await getRequest(`/chat/${user._id}`);
      if (res?.error) {
        setChatError(res?.message || res);
      } else {
        setUserChat(res);
      }
      setChatIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    getChat();
  }, [getChat]);

  useEffect(() => {
    const newSocket = io("http://localhost:4000");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    }
  },[user]);

  useEffect(() => {
    if(!socket) return;
    socket.emit('addNewUser', user._id);
    
    socket.on('getOnlineUser', (res) => {setOnlineUsers(res)});

    return () => {socket.off("getOnlineUser" )}
  }, [socket, user._id]);

  useEffect(() => {
    if(socket === null) return;

    socket.on('getMessage', (res) => {
      setMessages((prev) => [...prev, res]);
    });

    socket.on("getNotification", (res) => {
      const isOpened = currentChat?.members.some(id => id === res.senderId);
      console.log(res,'noti', isOpened, currentChat?.members);
      setNotification((old) => [...old, {...res, isRead: isOpened}]);
    })

    return () => {
      socket.off('getMessage');
      socket.off('getNotification');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  const getMessage = async (chat) => {
    setCurrentChat(chat);
    setError(null);
    setIsLoading(true);
    const res = await getRequest(`/message/${chat._id}`);

    if (res.error) {
      console.log('Error while fetching message', res);
      setError(res?.message || res);
    } else {
      setMessages(res);
    }
    setIsLoading(false);
  }

  return (
    <Container>
      <PotentialChat user={user} userChat={userChat} setUserChat={setUserChat} onlineUsers={onlineUsers} />
      {userChat.length > 0 && (
        <div className='d-flex gap-4' >
          {/*  messages-box */}
          <div className='d-flex flex-column gap-4 pe-3' >
            {isChatLoading && <p>Loading chats...</p>}

            {userChat.map((chat, i) => (
              <div key={i} onClick={() => { getMessage(chat) }}>
                <UserChat chat={chat} user={user} onlineUsers={onlineUsers} />
              </div>
            ))}

            {chatError && <Alert variant='danger'>{chatError}</Alert>}
          </div>
          {messages ? (<div className='w-100'>
            {isLoading && <p>Loading chat...</p>}
            <ChatBox messages={messages} chat={currentChat} setMessages={setMessages} socket={socket} />
            {error && <Alert variant='danger'>{error}</Alert>}
          </div>) : (
            <p>No conversation selected yet...</p>
          )}
        </div>)}
    </Container>
  )
}

export default Chat