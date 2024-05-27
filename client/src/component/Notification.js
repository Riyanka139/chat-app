import React, { useCallback, useContext, useState } from 'react';
import { AuthContext } from '../context/auth.context';
import moment from "moment";

// not working
const Notification = ({notifications, users, setNotifications, setCurrentChat}) => {
    const [isOpen, setIsOpen] = useState(false);
    const {user} = useContext(AuthContext);

    const unreadNotifications = notifications?.filter(n => !n.isRead); //chat
    const modifiedNotification = notifications?.map(n => {
        const sender = users.find(u=> u._id === n.senderId) // from potialchat
        return {...n, senderName: sender?.name};
    });

    const markAllRead = () => {
        setNotifications(prev => prev.map(n => ({...n, isRead: true})));
    }

    const markRead = useCallback((n, userChats) => {
        const desiredChat = userChats.find((chat) => {
            const chatMembers = [user._id, n.senderId];
            return chat?.members.every((member) => chatMembers.includes(member));
        });

        const modifyNoti = notifications.map(el => el.senderId === n.senderId ? {...n, isread: true} : el);
        setNotifications(modifyNoti);
        setCurrentChat(desiredChat);
        setIsOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

  return (
    <div className='position-relative'>
        <div className='position-relative me-3' role="button" onClick={() => setIsOpen(!isOpen)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-chat-left-fill" viewBox="0 0 16 16">
                <path d="M2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
            </svg>
            {unreadNotifications?.length > 0 && <span className='notification-count'>{unreadNotifications?.length}</span>}
        </div>
        {isOpen && (
            <div className='notifications-box'>
            {/* notification-header */}
                <div className='p-3 pb-0 d-flex justify-content-between'>
                    <h3 style={{fontSize: '20px'}}>Notifications</h3>
                    <div className='opacity-75 fw-bold' style={{cursor: 'pointer'}} onClick={() => markAllRead()}>Mark all as read</div>
                </div>
                {modifiedNotification?.length === 0 ? <span className='notification'>No notification yet...</span>: 
                modifiedNotification.map((n,i) => (
                    <div key={i} className={`notification ${n.isRead? '' : 'not-read'}`} onClick={() => markRead(n, users )}>
                        <span>{`${n.senderName} sent you a new message`}</span>
                        <span className='notification-time'>{moment(n.date).calendar()}</span>
                    </div>
                ))
                }
            </div>
        )}
        
    </div>
  )
}

export default Notification