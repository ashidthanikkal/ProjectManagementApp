import React, { useEffect, useState } from 'react'
import ProjectCard from '../components/ProjectCard'
import { getAllprojects } from '../services/allApis'
import './Allprojects.css'
import Header from '../components/Header'

function Allprojects() {
    const [allProjects, setallProjects] = useState([])

    const [searchData,setSearchData]=useState('')

    const projects = async () => {
        const res = await getAllprojects(searchData)
        if (res.status == 200) {
            setallProjects(res.data)
        }
        // console.log(res);

    }
    useEffect(() => {
        projects()
    }, [searchData])
    // console.log(allProjects);
    return (
        <div>
            <Header></Header>
            <h2 className='text-center'>All Projects</h2>

            <div class="input-wrapper d-flex justify-content-center my-3">
               <div> 
                <input type="text" onChange={(e)=>setSearchData(e.target.value)} placeholder="Search by Technology Eg:HTML/CSS..." name="text" class="input"/>
                </div>
            </div>
            <div className='d-flex justify-content-center flex-wrap '>
                {
                    allProjects.length > 0 ?
                        allProjects.map(i => (
                            <ProjectCard data={i} />
                        ))
                        :
                        <h4>No projects</h4>
                }
            </div>
        </div>
    )
}

export default Allprojects
