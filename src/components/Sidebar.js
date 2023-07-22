import React from 'react'
import './Sidebar.css'
import DashBoardIcon from '../assets/dashboard_icon.svg'
import AddIcon from '../assets/add_icon.svg'
import { NavLink } from 'react-router-dom'
import Avatar from './Avatar'
import { useAuthContext } from '../hooks/useAuthContext'
function Sidebar() {
    const { user } = useAuthContext()
  return (
    <div className='sidebar'>
        <div className='sidebar-content'>
            <div className='user'>
                <Avatar src={user.photoURL}/>
                <p>Hey {user.displayName}</p>
            </div>
            <nav className='links'>
                <ul>
                    <li>
                       <NavLink exact to='/'>
                        <img src={DashBoardIcon} alt='dashboard-icon'/>
                        <span>Dashboard</span>
                       </NavLink> 
                       <NavLink to='/create'>
                        <img src={AddIcon} alt='add-icon'/>
                        <span>New Project</span>
                       </NavLink> 
                    </li>
                </ul>
            </nav>
        </div>
    </div>
  )
}

export default Sidebar