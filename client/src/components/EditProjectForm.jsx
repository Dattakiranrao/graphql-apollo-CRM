import { React, useState } from "react";
import { useMutation } from "@apollo/client";
import { GET_PROJECT, GET_PROJECTS } from "../queries/projectQueries";
import { UPDATE_PROJECT } from "../mutations/ProjectMutations";

export default function EditProjectForm({ project }) {
  const [updateProjectFields, setupdateProjectFields] = useState({
    name: project.name,
    description: project.description,
    status: "",
  });

  const onChange = (e) => {
    setupdateProjectFields({
      ...updateProjectFields,
      [e.target.name]: e.target.value,
    });
  };

    const [updateProject] = useMutation(UPDATE_PROJECT, {
        variables: {id: project.id, name: updateProjectFields.name, description: updateProjectFields.description, status: updateProjectFields.status},
        refetchQueries: [{query: GET_PROJECT, variables: {id: project.id}}],
    })

    const onSubmit = (e) => {
        e.preventDefault();
        
        if(!updateProjectFields.name || !updateProjectFields.description || !updateProjectFields.status){
            alert("Fill all the fields")
        }
        else{
            updateProject(updateProjectFields.name, updateProjectFields.description, updateProjectFields.status);
        }
    }

  return (
    <div className="mt-5 ">
      <h3>Update Project Details</h3>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={updateProjectFields.name}
            onChange={(e) => onChange(e)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <input
            type="description"
            className="form-control"
            id="description"
            name="description"
            value={updateProjectFields.description}
            onChange={(e) => onChange(e)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            className="form-select"
            id="status"
            name="status"
            value={updateProjectFields.status}
            onChange={(e) => onChange(e)}
          >
            <option value="new">Not Started</option>
            <option value="progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
