import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { ADD_CLIENT } from "../mutations/ClientMutations.jsx";
import { GET_CLIENTS } from "../queries/clientQueries.jsx";

export default function AddClient() {
  const [client, setClient] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [addClient] = useMutation(ADD_CLIENT, {
    variables: { name: client.name, email: client.email, phone: client.phone },
    update(cache, { data: { addClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: {
          // clients: clients.concat([addClient]),// this is method 1
          clients: [...clients, addClient],
        },
      });
    },
  });

  const onChange = (e) => {
    setClient({ ...client, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (client.name === "" || client.email === "" || client.phone === "") {
      return alert("Please Fill All Field");
    } else {
      addClient(client.name, client.email, client.phone);
      setClient({
        name: "",
        email: "",
        phone: "",
      });
    }
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-secondary"
        data-bs-toggle="modal"
        data-bs-target="#addClientModal"
      >
        <div className="d-flex align-item-center">
          <FaUser className="icon mt-1" />
          <div>Add Client</div>
        </div>
      </button>

      <div
        className="modal fade"
        id="addClientModal"
        tabIndex="-1"
        aria-labelledby="addClientModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addClientModalLabel">
                Add Client
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
                    value={client.name}
                    onChange={(e) => onChange(e)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={client.email}
                    onChange={(e) => onChange(e)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    name="phone"
                    value={client.phone}
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <button
                  type="submit"
                  data-bs-dismiss="modal"
                  className="btn btn-secondary"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
