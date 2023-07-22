import React from 'react'
import Avatar from '../../components/Avatar'
import { useFirestore } from '../../hooks/useFirestore'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useHistory } from 'react-router-dom'
function ProjectSummary({project}) {
    const { user } = useAuthContext()
    const history = useHistory();
    const { deleteDocument } = useFirestore("projects")
    const handleDelete = (e) =>{
        deleteDocument(project.id)
        history.push('/')
    }
  return (
    <div>
        <div className='project-summary'>
            <h2 className='page-title'>
            <p>By {project.createdBy.displayName}</p>
                <p className='due-date'>
                    Project Due by {project.dueDate.toDate().toDateString()}
                </p>
                <p className='details'>
                    {project.details}
                </p>
                <h4> Project Assigned to:</h4>
                <div className='assigned-users'>
                    {project.assignedUsersList.map(user => (
                        <div key={user.id}>
                            <Avatar src={user.photoURL}/>
                        </div>
                    ))}
                </div>
            </h2>
        </div>
        {user.uid === project.createdBy.id && (
            <button className='btn' onClick={handleDelete}>Mark As Complete</button>
        )}
    </div>
  )
}

export default ProjectSummary