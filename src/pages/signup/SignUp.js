import React from 'react'
import { useState } from 'react'
import './SignUp.css'
import { useSignup } from '../../hooks/useSignup'
function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [thumbnail, setThumbnail] = useState(null)
  const [thumbnailError, setThumbnailError] = useState(null)
  const {signup, isPending, error} = useSignup()
  const handleSubmit = (e) =>{
    e.preventDefault()
    signup(email, password, displayName, thumbnail)
  }
  const handleFileChange = (e) =>{
    setThumbnail(null)
    //first file selected
    let selected = e.target.files[0]
    //check if they have selected a file
    if(!selected)
    {
      setThumbnailError("please select a file")
      return
    }
    if(!selected.type.includes('image'))
    {
      setThumbnailError("Please select images only")
      return
    }
    //if image size is greater than 100kb then reject
    if(selected.size < 100000){
      setThumbnailError("Image file size must be less than 100kb")
      return
    }

    //if it reaches here then the file selected is valid
    setThumbnailError(null)
    setThumbnail(selected)
    
  }
  return (
    <form className='auth-form' onSubmit={handleSubmit}>
      <h2>Sign up</h2>
      <label>
        <span>email:</span>
        <input required type='email' onChange={(e) => setEmail(e.target.value)} value={email}></input>
      </label>
      <label>
        <span>password:</span>
        <input required type='password' onChange={(e) => setPassword(e.target.value)} value={password}></input>
      </label>
      <label>
        <span>display name:</span>
        <input required type='text' onChange={(e) => setDisplayName(e.target.value)} value={displayName}></input>
      </label>
      <label>
        <span>profile pic:</span>
        <input required type='file' onChange={handleFileChange}></input>
        {thumbnailError && <div className='error'>{thumbnailError}</div>}
      </label>
      {!isPending && <button className='btn'>Sign up</button>}
      {isPending && <button className='btn' disabled>Loading</button>}
      {error && <div className='error'>{error}</div>}

    </form>
  )
}

export default SignUp