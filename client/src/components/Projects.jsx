import React from 'react'
import { gql, useQuery } from "@apollo/client";
import { GET_PROJECTS } from '../queries/projectQueries';
import Spinner from './Spinner.jsx'
import ProjectCard from './ProjectCard';

export default function Projects() {

    const {loading, error, data} = useQuery(GET_PROJECTS)
    if (loading){return <Spinner/>}
    if (error){return <p>Internal Server Error</p>}
  return (
    <>
    {data.projects.length > 0 ? <div className="row mt-5">
        {data.projects.map((project) => (
            <ProjectCard key={project.id} project={project} />))}
        </div> : (<p>No Projects To Show</p>)}
      </>
  )
}
