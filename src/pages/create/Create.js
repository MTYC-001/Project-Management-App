import React, { useEffect, useState } from 'react'
import './Create.css'
import Select from 'react-select'
import { useCollection } from '../../hooks/useCollection'
import { timestamp } from '../../firebase/config'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'
import {useHistory} from 'react-router-dom'
const categories = [
  {value: 'development', label: 'Development'},
  {value: 'design', label: 'Design'},
  {value: 'marketing', label: 'Marketing'},
  {value: 'sales', label: 'Sales'}
]
function Create() {
  //form fields values
  const [name, setName] = useState('')
  const [details, setDetails] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [category, setCategory] = useState('')
  const [assignedUsers, setAssignedUsers] = useState('')
  const [formError, setFormError] = useState(null)
  const { documents } = useCollection('users')
  const [users, setUsers] = useState([])
  const { user } = useAuthContext()
  const {addDocument, response } = useFirestore('projects')
  const history = useHistory()
  //this useEffect is used to get the users array by using the useCollection hook
  useEffect(()=>{
    if(documents){
      //options is an array
      //documents is a collection of users collected by invoking useCollection('users')
      const options = documents.map(user => {
        return {value: user, label: user.displayName}
      })
      setUsers(options)
    }
  }, [documents])

  const  handleSubmit = async (e) =>{
    e.preventDefault()
    setFormError(null)
    if(category === false)
    {
      setFormError("please select a project category")
      return
    }
    if(assignedUsers.length < 1)
    {
      setFormError("please select assigned user(s)")
      return
    }
    const createdBy = {
      displayName : user.displayName,
      photoURL : user.photoURL,
      //this is uid because the user is from the useAuthContext meaning is 1 user which is the one who created the project
      id: user.uid
    }
    //create an array of assigned users
    const assignedUsersList = assignedUsers.map((u)=>{
      return{
        displayName: u.value.displayName,
        photoURL: u.value.photoURL,
        id: u.value.id
      }
    })
    //create project object
    const project = {
      name, 
      details,
      category: category.value,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      comments: [],
      createdBy: createdBy,
      assignedUsersList
    }
    //once we added the project to the collection of projects then re-direct user to dashboard
    await addDocument(project)
    if(!response.error){
      history.push('/')
    }
  }
  return (
    <div className='create-form'>
      <h2 className='page-title'>Create a new project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Project Name</span>
          <input
          required
          type='text'
          onChange={(e)=>setName(e.target.value)}
          />
          <span>Project Detail</span>
          <textarea
          required
          type='text'
          onChange={(e)=>setDetails(e.target.value)}
          />
          <span>Project Due Date</span>
          <input
          required
          type='date'
          onChange={(e)=>setDueDate(e.target.value)}
          />
        </label>
        <label>
          <span>Project Category:</span>
          <Select
          options={categories}
          onChange={(option) => setCategory(option)}
          />
        </label>
        <label>
          <span>Assign to:</span>
          <Select
          options={users}
          onChange={(option) => setAssignedUsers(option)}
          isMulti
          />
        </label>
        <button className='btn'>Add Project</button>
        {formError && <p className='error'>{formError}</p>}
      </form>
    </div>
  )
}

export default Create