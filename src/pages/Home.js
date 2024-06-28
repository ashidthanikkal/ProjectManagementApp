import React, { useState } from 'react'
import './Home.css'
import { Col, Container, Row } from 'react-bootstrap'
import ProjectCard from '../components/ProjectCard'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { getProjectHome } from '../services/allApis'



function Home() {


    const [isLogedin, setIsLogedin] = useState(false)
    useEffect(() => {
        if (localStorage.getItem("userId")) {
            setIsLogedin(true)
        }
    }, [])
    // console.log(isLogedin);

    const [randomProject, setRandomprojects] = useState([])
    const getProject = async () => {
        const res = await getProjectHome()
        setRandomprojects(res.data)
    }

    useEffect(() => {
        getProject()
    }, [])
    return (
        <div className='home'>
            <Container className='w-100'>
                <Row className='py-2'>
                    <Col lg={6}>
                        <div className='hero_img'>
                            <img src="https://i.postimg.cc/LszZD8B4/Work-in-progress-amico.png"
                                alt=""
                                style={{ width: "90%" }}
                            />
                        </div>
                    </Col >

                    <Col lg={6} className='d-flex flex-column justify-content-center align-items-center'>

                        <div className='d-flex justify-content-center align-items-center'>
                            <h3>One stop destination for all software development projects. Where user can add and manage their projects. as well as Access allprojects available in our websites.What are you waiting for...!</h3>
                        </div>

                        <div className='my-4'>

                            {
                                isLogedin ?
                                    <Link to={'/dashboard'} style={{ textDecoration: "none" }}>
                                        <button className="animated-button">
                                            <svg viewBox="0 0 24 24" class="arr-2" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                                                ></path>
                                            </svg>
                                            <span class="text">Explore</span>
                                            <span class="circle"></span>
                                            <svg viewBox="0 0 24 24" class="arr-1" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                                                ></path>
                                            </svg>
                                        </button>
                                    </Link>
                                    :
                                    <Link to={'/authentication'} style={{ textDecoration: "none" }}>
                                        <button className="animated-button">
                                            <svg viewBox="0 0 24 24" class="arr-2" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                                                ></path>
                                            </svg>
                                            <span class="text">Start</span>
                                            <span class="circle"></span>
                                            <svg viewBox="0 0 24 24" class="arr-1" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                                                ></path>
                                            </svg>
                                        </button>
                                    </Link>
                            }

                        </div>

                    </Col>
                </Row>

            </Container>

            <div className='p-3'>
                <h1 className='text-center'>Explore Projects</h1>

                <div   className='projectcard d-flex justify-content-center align-items-center w-100 gap-3 flex-wrap'>
                    {
                        randomProject.length>0?
                        randomProject.map(i => (
                            <ProjectCard  data={i} />
                        ))
                        :
                        <h4>No projects</h4>
                    }
                </div>

                <Link to={'/allproject'} style={{ textDecoration: 'none', color: "black" }}>
                    <h3 className='text-center'>Explore more projects<i class="fa-solid fa-arrow-up fa-rotate-90"></i></h3>
                </Link>
            </div>

            
        </div>
    )
}

export default Home
