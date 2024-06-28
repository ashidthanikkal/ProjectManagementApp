import { baseurl } from "./baseUrl";
import { commonRequest } from "./commonrequest";


//register
export const registerApi=async(bodyData)=>{
    return await commonRequest('POST',`${baseurl}/user/register`,bodyData)
}

//login
export const loginApi=async(bodyData)=>{
  return await  commonRequest('POST',`${baseurl}/user/login`,bodyData)
} 

//add project
export const addProjectApi=async(bodyData,headerData)=>{
  return await commonRequest('POST',`${baseurl}/user/add-project`,bodyData,headerData)
}

//get three projects

export const getProjectHome=async()=>{
  return await commonRequest('GET',`${baseurl}/home-projects`,"","")
}

//get all projects
export const getAllprojects=async(searchData)=>{
  return await commonRequest('GET',`${baseurl}/all-projects?search=${searchData}`,"","")
}

//user projects
export const userProjectsApi=async(reqHeader)=>{
  return await commonRequest('GET',`${baseurl}/user-projects`,"",reqHeader)
}

//edit projects
export const editProjectApi = async (bodyData, headerData,id) => {
  return await commonRequest("PUT",`${baseurl}/user/edit-project/${id}`,bodyData,headerData);
}

//deleteprojects
export const deleteProjectApi = async (headerData,id) => {
  return await commonRequest("DELETE",`${baseurl}/user/delete-project/${id}`,{},headerData);
}

//edit profile
export const editProfileApi = async (bodyData, headerData,id) => {
  return await commonRequest("PUT",`${baseurl}/user/edit-profile/${id}`,bodyData,headerData);
}




