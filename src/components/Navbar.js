import './Navbar.css'
import { Link } from 'react-router-dom'
import React from 'react'
import logo from '../assets/marvin.png'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
function Navbar() {
    const {logout, isPending} = useLogout()
    const { user, authIsReady} = useAuthContext()
  return (
    <di className='navbar'>
        <ul>
            <li className='logo'>
                <img src={logo} alt='logo'/>
                <span>Proj Manager</span>
            </li> 
            <li>
                {!user && <Link to='./login'>Login</Link>}
            </li>
            <li>
                {!user && <Link to='./signup'>Sign Up</Link>}
            </li>
            <li>
                {!isPending&& user && <button className='btn' onClick={logout}>Logout</button>}
                {isPending&&<button className='btn' disabled>Logging out...</button>}
            </li>
        </ul>
    </di>
  )
}

export default Navbar