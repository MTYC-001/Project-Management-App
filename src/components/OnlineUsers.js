import React from 'react'
import "./OnlineUsers.css"
import { useCollection } from '../hooks/useCollection'
import Avatar from './Avatar'
//this component is for getting all the users and display then with green icon if online, else display with grey icon
function OnlineUsers() {
    const { error, documents} = useCollection('users')
  return (
    <div className='user-list'>
        <h2>All Users</h2>
        {error && <div className='error'>{error}</div>}
        {documents && documents.map(user => (
            <div className='user-list-item' key={user.id}>
                {user.online === true && <span className='online-user'></span>}
                {user.online === false && <span className='offline-user'></span>}
                <span>{user.displayName}</span>
                <Avatar src={user.photoURL}/>
            </div>
            
        ))}
    </div>
  )
}

export default OnlineUsers