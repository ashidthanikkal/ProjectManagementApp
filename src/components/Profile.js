import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { baseurl } from '../services/baseUrl';
import { editProfileApi } from '../services/allApis';

function Profile() {

    const [preview, setPreview] = useState("")


    const [open, setOpen] = useState(true)

    const changeOpen = () => {
        setOpen(!open)
    }

    const [existingImage, setExistingImage] = useState("")

    const [profile, setProfile] = useState({
        username: "", gitHub: "", linkedIn: "", profileImg: "", _id: ""
    })

    useEffect(() => {
        if (localStorage.getItem("user")) {
            const user = JSON.parse(localStorage.getItem("user"))
            setProfile({ ...profile, username: user.username, github: user.gitHub, _id: user._id })
            setExistingImage(user.profile)
        }
    }, [])

    //Image preview generation
    useEffect(() => {
        if (profile.profileImg) {
            setPreview(URL.createObjectURL(profile.profileImg))
        }
        else {
            setPreview("")
        }
    }, [profile.profileImg])
    console.log(profile);

    const handleUpdate = async (e) => {
        e.preventDefault()
        const { username, gitHub, linkedIn, profileImg, _id } = profile
        //body data
        const reqBody = new FormData()
        reqBody.append("username", username)
        reqBody.append("github", gitHub)
        reqBody.append("linkedin", linkedIn)
        preview ? reqBody.append("profile", profileImg) : reqBody.append("profile", existingImage)


        //header data
        const token = localStorage.getItem("token")
        if (token) {
            const headerConfig = {
                "Content-Type": preview ? "multipart/form-data" : "application/json",
                "access_token": `Bearer ${token}`
            }
            const result = await editProfileApi(reqBody, headerConfig, _id)
            console.log(result);

        }

        //id

    }

    return (
        <div className='d-flex flex-column justify-content-center align-items-center pt-4'>
            {open ?
                <Card style={{ width: '90%' }}>
                    <h3 className='p-3'>My Profile</h3>
                    <div className='d-flex justify-content-center align-items-center my-4'><Card.Img variant="top" src={existingImage == "" ? "https://i.postimg.cc/qqkjMyrV/Screenshot-2024-05-27-114656.png" : `${baseurl}/uploads/${existingImage}`} style={{ borderRadius: "50%", width: "150px" }} /></div>
                    <Card.Body>
                        <Card.Title className='text-center'><h1>{profile.username}</h1></Card.Title>
                    </Card.Body>
                    <ListGroup className="list-group-flush " >
                        <ListGroup.Item>GitHub:{profile.gitHub}</ListGroup.Item>
                        <ListGroup.Item>LinkedIn:{profile.linkedIn}</ListGroup.Item>
                    </ListGroup>
                    <Card.Body >
                        <h6 onClick={changeOpen} className='text-end'><b>Edit</b></h6>
                    </Card.Body>

                </Card>
                :
                <Card style={{ width: '90%' }}>
                    <h3 className='p-3'>My Profile</h3>
                    <label htmlFor='im' className='d-flex justify-content-center align-items-center my-4'>
                        <input id='im' onChange={(e) => setProfile({ ...profile, ["profileImg"]: e.target.files[0] })} type="file" style={{ display: 'none' }} />
                        {
                            existingImage == "" ?
                                <img src={preview ? preview : "https://i.postimg.cc/qqkjMyrV/Screenshot-2024-05-27-114656.png"} style={{ borderRadius: "50%", width: "150px" }} alt="" />
                                :
                                <img src={preview ? preview : `${baseurl}/uploads/${existingImage}`} style={{ borderRadius: "50%", width: "150px" }} alt="" />
                        }
                    </label>
                    <Card.Body>
                        <Card.Title className='text-center'>
                            <input className='form-control' value={profile.username} onChange={(e) => { setProfile({ ...profile, ['username']: e.target.value }) }} type="text" />
                        </Card.Title>
                    </Card.Body>
                    <ListGroup className="list-group-flush p-4" >
                        <input className='mt-2 form-control' value={profile.gitHub} onChange={(e) => { setProfile({ ...profile, ['gitHub']: e.target.value }) }} type="text" />
                        <input className='mt-2 form-control' value={profile.linkedIn} onChange={(e) => { setProfile({ ...profile, [`linkedIn`]: e.target.value }) }} type="text" />
                    </ListGroup>


                    <Card.Body className='text-center'>
                        <button onClick={(e => handleUpdate(e))} className='btn btn-success'> Update Changes</button>
                    </Card.Body>
                </Card>
            }
        </div>
    )
}

export default Profile
