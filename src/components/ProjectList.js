import React from 'react'
import './ProjectList.css'
import { Link } from 'react-router-dom'
import Avatar from './Avatar'
function ProjectList({projects}) {
  return (
    <div className='project-list'>
        {projects.length === 0 && <p>No Projects</p>}
        {projects.map((proj) => (
            <Link key={proj.id} to={`/projects/${proj.id}`}>
                <h4>{proj.name}</h4>
                <p>Due By {proj.dueDate.toDate().toDateString()}</p>
                <div className='assigned-to'>
                    <ul>
                        {proj.assignedUsersList.map(user => (
                            <li key={user.photoURL}>
                                <Avatar src={user.photoURL}/>
                            </li>
                        ))}
                    </ul>
                </div>
            </Link>
        ))}
    </div>
  )
}

export default ProjectList