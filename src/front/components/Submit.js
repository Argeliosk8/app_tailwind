import {React, useState} from 'react'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'

export const Submit = ()=> {
  const [resume, setResume] = useState(null)
  const [candidate, setCandidate] = useState({
    first_name: 'Joel',
    last_name: 'Aburto',
    email: 'joel@gmail.com',
    phone: '325-588-8597'
  })

const handleFileChange = (e)=>{
  setResume(e.target.files[0])
  console.log(resume)
}

const handleSubmit = async (e) => {
  e.preventDefault()
  const tokenToVerify = localStorage.getItem("jwt-token")
  
  try {
    const response = await fetch('http://localhost:5000/candidate/submit', {
      method: 'POST',
      headers:  { "Authorization": "Bearer " + tokenToVerify },
      body: { file: resume, candidate: JSON.stringify(candidate)}
    });

    if (response.ok) {
      console.log('File and JSON data uploaded successfully');
    } else {
      console.error('Failed to upload file and JSON data');
    }
    
  } catch (error) {
    console.error('Error uploading file and JSON data:', error)
  }
}



  return (
    <form onSubmit={handleSubmit}>
    <label>
      Choose File:
      <input type="file" onChange={(e)=>handleFileChange(e)} />
    </label>
    <br />
    <button type="submit">Upload</button>
  </form>
  )
}
