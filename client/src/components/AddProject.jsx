import { useState } from "react";
import { FaList } from "react-icons/fa";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/projectQueries.jsx";
import { ADD_PROJECT } from "../mutations/ProjectMutations.jsx";
import { GET_CLIENTS } from "../queries/clientQueries.jsx";
import Spinner from "./Spinner.jsx";

export default function AddClient() {
  const [projectFields, setprojectFields] = useState({
    name: "",
    description: "",
    clientId: "",
    status: "new",
  });

  //get clients for multi select
  const { loading, error, data } = useQuery(GET_CLIENTS);

  const onChange = (e) => {
    // setClient({ ...client, [e.target.name]: e.target.value });
    setprojectFields({ ...projectFields, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      projectFields.name === "" ||
      projectFields.description === "" ||
      projectFields.clientId === ""
    ) {
      return alert("Please Fill All Field");
    } else {
      setprojectFields({
        name: "",
        description: "",
        clientId: "",
        status: "new",
      });
    }
  };

  if (loading) <Spinner />;
  if (error) <p>Internal Server Error</p>;

  // const [addClient] = useMutation(ADD_CLIENT, {
  //   variables: { name: client.name, email: client.email, phone: client.phone },
  //   update(cache, { data: { addClient } }) {
  //     const { clients } = cache.readQuery({ query: GET_CLIENTS });
  //     cache.writeQuery({
  //       query: GET_CLIENTS,
  //       data: {
  //         // clients: clients.concat([addClient]),// this is method 1
  //         clients: [...clients, addClient],
  //       },
  //     });
  //   },
  // });

  return (
    <>
      {!loading && !error && (
        <>
          <button
            type="button"
            className="btn btn-secondary"
            data-bs-toggle="modal"
            data-bs-target="#addProjectModal"
          >
            <div className="d-flex align-itemx-center">
              <FaList className="icon" />
              <div>Add Project</div>
            </div>
          </button>

          <div
            className="modal fade"
            id="addProjectModal"
            tabIndex="-1"
            aria-labelledby="addProjectModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="addProjectModalLabel">
                    Add Project
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={onSubmit}>
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={projectFields.name}
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
                        value={projectFields.description}
                        onChange={(e) => onChange(e)}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Status</label>
                      <select
                        id="status"
                        value={projectFields.status}
                        onChange={(e) => onChange(e)}
                        className="form-select"
                      >
                        <option value="new">Not Started</option>
                        <option value="progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Client Id</label>
                      <select
                        className="form-select"
                        id="clientId"
                        onChange={(e) => onChange(e)}
                        value={projectFields.clientId}
                      >
                        <option value="">Select Client</option>
                        {data.clients.map((client) => (
                          <option value={client.id} key={client.id}>
                            {client.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      type="submit"
                      data-bs-dismiss="modal"
                      className="btn btn-primary"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
