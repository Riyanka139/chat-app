import React from 'react';
import { useFetchRecipient } from '../hook/useFetchRecipient';
import useLatestMessage from '../hook/useLatestMessage';
import moment from 'moment';

function UserChat({chat,user, onlineUsers}) {
  const {recipientUser} = useFetchRecipient(chat, user);
  const {lastMessage} = useLatestMessage(chat)

  return (
    <div className='d-flex gap-4 p-2 justify-content-between border-bottom border-dark-subtle position-relative' style={{width: '380px'}} role='button'>
      <div className='d-flex gap-2'>
        <img src={`https://ui-avatars.com/api/?size=64&name=${recipientUser?.name}`} alt='profile' height='35px' className='rounded-circle' />
        <div style={{width: '170px'}}>
          <span className='fw-bold'>{recipientUser?.name}</span>
          <div className='msg'>{lastMessage?.text.length > 10 ? `${lastMessage?.text.slice(10)}...` : lastMessage?.text}</div>
        </div>
      </div>
      <div className='d-flex flex-column align-items-end'>
        <span className='date'>{moment(lastMessage?.createdAt).calendar()}</span>
        <div className='fw-bold rounded-circle text-center' style={{width : '20px', height: '20px', fontSize: '12px', background: '#00bd9b'}}>2</div>
        {onlineUsers.some(ou => ou.userId === recipientUser?._id) && <span className='rounded-circle bg-success d-inline-block position-absolute top-0 start-100 translate-middle' style={{height: '12px', width: '12px'}}></span>}
      </div>
    </div>
  )
}

export default UserChat