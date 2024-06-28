import React, { useContext, useEffect, useState } from 'react'
import { deleteProjectApi, userProjectsApi } from '../services/allApis'
import { addResponseContext, editResponseContext } from '../services/ContextShare'
import Editproject from './Editproject'

function Projects() {

  const {editUpdate,setEditUpdate}=useContext(editResponseContext)

  const {addUpdate}=useContext(addResponseContext)
  const [projects,setProjects]=useState([])
  const getUserProjects = async() => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token")
      const headerConfig = {
        "Content-Type": "multipart/form-data",
        "access_token": `Bearer ${token}`
      }
      const result=await userProjectsApi(headerConfig)
      // console.log(result);
      if(result.status==200){
        setProjects(result.data)
      }
    }
  }
  useEffect(()=>{
    getUserProjects()
  },[addUpdate,editUpdate])

  const handleDelete=async(e,id)=>{
    e.preventDefault()
    //header
    if(localStorage.getItem("token")){
      const token=localStorage.getItem("token")
      const reqHeader={
        "Content-Type":"application/json",
        "access_token" : `Bearer ${token}`
      }

      try{
        const result=await deleteProjectApi(reqHeader,id)
      // console.log(result);
      if(result.status){
        getUserProjects()
      }
    }
    catch(error){
      console.log(error);
    }

    }
  }


  return (
    <div className='p-3'>

      {   projects?.length>0?

        projects.map(i=>(
          <div style={{ backgroundColor: 'white' }} className='d-flex justify-content-between p-3 mt-2'>
        <div >
          <h5>{i.title}</h5>
        </div>

        <div className='d-flex justify-content-around align-items-center gap-4'>
        <Editproject project={i}></Editproject>
          <a href={i.gitHub}><i className="fa-brands fa-lg fa-github"></i></a>
          <a href={i.website}><i className="fa-solid fa-lg fa-link"></i></a>
          <i onClick={(e)=>handleDelete(e,i._id)} className="fa-solid fa-lg fa-trash text-danger"></i>
        </div>

      </div>
        ))
      :
      <h3>No project added yet..</h3>
      }

    </div>
  )
}

export default Projects
