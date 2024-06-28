import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { baseurl } from '../services/baseUrl'
import { editProjectApi } from '../services/allApis'
import { editResponseContext } from '../services/ContextShare'

function Editproject({ project }) {

    const [preview, setPreview] = useState('')
    const {setEditUpdate}=useContext(editResponseContext)
    const [projectInputs, setProjectinputs] = useState({
        _id: project?._id,
        title: project?.title,
        technologies: project?.title,
        gitHub: project?.gitHub,
        website: project?.website,
        description: project?.description,
        coverImg: ""
    })

    const setInputs = (e) => {
        const { name, value } = e.target
        setProjectinputs({ ...projectInputs, [name]: value })
        console.log(projectInputs);
    }

    useEffect(() => {
        if (projectInputs.coverImg) {
            setPreview(URL.createObjectURL(projectInputs.coverImg))
        }
        else {
            setPreview("")
        }
    }, [projectInputs.coverImg])


    const [show, setShow] = useState(false);

    const handleClose = () => {setShow(false);
        setProjectinputs({
            _id: project?._id,
            title: project?.title,
            technologies: project?.title,
            gitHub: project?.gitHub,
            website: project?.website,
            description: project?.description,
            coverImg: ""
        })
    }
     
    const handleShow = () => setShow(true);


    const handleUpdate = async (e) => {
        e.preventDefault()
        const { title, technologies, gitHub, website, description, coverImg, _id } = projectInputs
        if (!title || !technologies || !gitHub || !website || !description ) {
            alert('please fill all datas')
        }
        else {
            //header token from local storage

            //access token from local storage
            if (localStorage.getItem("token")) {
                const token = localStorage.getItem("token")

                const headerConfig = {
                    "Content-Type": preview ? "multipart/form-data" : "application/json",
                    "access_token": `Bearer ${token}`
                }

                //body form data

                const reqBody = new FormData()
                reqBody.append("title", title)
                reqBody.append("technologies", technologies)
                reqBody.append("gitHub", gitHub)
                reqBody.append("website", website)
                reqBody.append("description", description)
                preview ? reqBody.append("coverImg", coverImg):reqBody.append("coverImg", project.coverImg)

                // Api call
                const result = await editProjectApi(reqBody,headerConfig,_id)
                console.log(result);
                if(result.status==200){
                    alert(`${result.data.title} project is updated...`)
                    setEditUpdate(result.data)
                    handleClose()
                }

            }


        }

    }
    return (
        <div>
            <div>
                <i className="fa-solid fa-lg fa-pen-to-square" onClick={handleShow}></i>

            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Project Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='row'>
                        <div className='col-6'>
                            <div className='p-5'>
                                <label htmlFor='img'>
                                    <input type="file" id='img' onChange={(e) => setProjectinputs({ ...projectInputs, ['coverImg']: e.target.files[0] })} className='d-none' />
                                    <img src={preview ? preview : `${baseurl}/uploads/${project.coverImg}`} className='' style={{ width: "100%" }} alt="" />
                                </label>
                            </div>
                        </div>
                        <div className='col-6'>
                            <input type="text" className='p-2 mt-2' name='title' onChange={setInputs} value={projectInputs.title} placeholder='Project Name' style={{ outline: "none", border: "none" }} />
                            <input type="text" className='p-2 mt-2' name='technologies' onChange={setInputs} value={projectInputs.technologies} placeholder='Languages Used' style={{ outline: "none", border: "none" }} />
                            <input type="text" className='p-2 mt-2' name='gitHub' onChange={setInputs} value={projectInputs.gitHub} placeholder='GitHub Link' style={{ outline: "none", border: "none" }} />
                            <input type="text" className='p-2 mt-2' name='website' onChange={setInputs} value={projectInputs.website} placeholder='Website Link' style={{ outline: "none", border: "none" }} />
                        </div>
                        <div className='row'><input type="text" name='description' onChange={setInputs} value={projectInputs.description} placeholder='Project Overview' style={{ outline: "none", border: "none" }} /></div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdate} >
                        Edit
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default Editproject
