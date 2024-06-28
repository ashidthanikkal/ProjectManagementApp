import React, { useContext, useEffect, useState } from 'react'
import Profile from '../components/Profile'
import { Modal, Button, Col, Row } from 'react-bootstrap'
import './Dashboard.css'
import { addProjectApi } from '../services/allApis'
import Projects from '../components/Projects'
import { addResponseContext, editResponseContext } from '../services/ContextShare'
import Header from '../components/Header'


function Dashboard() {

    //access context
    const {addUpdate,setAddUpdate}=useContext(addResponseContext)


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [username, setUsername] = useState("")
    useEffect(() => {
        setUsername(localStorage.getItem("currentUser"))
    }, [])

    const [preview, setPreview] = useState("")
    const [projectInputs, setProjectinputs] = useState({
        title: "",
        technologies: "",
        gitHub: "",
        website: "",
        description: "",
        coverImg: ""
    })

    const setInputs = (e) => {
        const { name, value } = e.target
        setProjectinputs({ ...projectInputs, [name]: value })
        console.log(projectInputs);
    }

    //Image preview generation
    useEffect(() => {
        if (projectInputs.coverImg) {
            setPreview(URL.createObjectURL(projectInputs.coverImg))
        }
        else {
            setPreview("")
        }
    }, [projectInputs.coverImg])

    const handleAdd = async() => {
       
        const { title, technologies, gitHub, website, description, coverImg } = projectInputs
        if (!title || !technologies || !gitHub || !website || !description || !coverImg){
            alert('please fill all datas')
        }
        else{
            //header token from local storage
          
            //access token from local storage
            if(localStorage.getItem("token")){
                console.log("hi");
                const token=localStorage.getItem("token")

                const headerConfig={
                    "Content-Type":"multipart/form-data",
                    "access_token": `Bearer ${token}`
                }

                //body form data

                const reqBody=new FormData()
                reqBody.append("title",title)
                reqBody.append("technologies",technologies)
                reqBody.append("gitHub",gitHub)
                reqBody.append("website",website)
                reqBody.append("description",description)
                reqBody.append("coverImg",coverImg)

                const res=await addProjectApi(reqBody,headerConfig)
                console.log(res);
               
                if(res.status==201){
                    alert("success")
                    handleClose(setProjectinputs({title: "",
                        technologies: "",
                        gitHub: "",
                        website: "",
                        description: "",
                        coverImg: ""}))
                        setAddUpdate(res.data)
                }
                else{
                    alert("failed")
                }
              

            }

           
        }

    }

    return (
        <div >
          <Header dashboard></Header>
          {/* dashboard={true} */}
            <div className='p-4'>
                <h1>Welcome <span style={{ color: "#6a5dff" }}>{username}</span>..!</h1>
                <Row>
                    <Col lg={8} md={6} className='shadow'>
                        <div>
                            <div className='d-flex justify-content-between align-items-center pt-3'>
                                <div><h2>Projects</h2></div>
                                <div className=''><Button onClick={handleShow} variant="outline-dark">Add Project</Button></div>
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
                                                    <img src={preview ? preview : `https://cdn-icons-png.flaticon.com/512/4503/4503941.png`} className='' style={{ width: "100%" }} alt="" />
                                                </label>
                                            </div>
                                        </div>
                                        <div className='col-6'>
                                            <input type="text" className='p-2 mt-2' name='title' onChange={(e) => setInputs(e)} value={projectInputs.title} placeholder='Project Name' style={{ outline: "none", border: "none" }} />
                                            <input type="text" className='p-2 mt-2' name='technologies' onChange={(e) => setInputs(e)}  value={projectInputs.technologies} placeholder='Languages Used' style={{ outline: "none", border: "none" }} />
                                            <input type="text" className='p-2 mt-2' name='gitHub' onChange={(e) => setInputs(e)} value={projectInputs.gitHub} placeholder='GitHub Link' style={{ outline: "none", border: "none" }} />
                                            <input type="text" className='p-2 mt-2' name='website' onChange={(e) => setInputs(e)} value={projectInputs.website} placeholder='Website Link' style={{ outline: "none", border: "none" }} />
                                        </div>
                                        <div className='row'><input type="text" name='description' onChange={(e) => setInputs(e)} value={projectInputs.description} placeholder='Project Overview' style={{ outline: "none", border: "none" }} /></div>
                                    </div>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Close
                                    </Button>
                                    <Button variant="primary" onClick={handleAdd}>
                                        Add
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                        <Projects></Projects>
                    </Col>
                    <Col lg={4} md={6}>
                        <Profile></Profile>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Dashboard
