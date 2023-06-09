import React from "react";
import { FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { DELETE_CLIENTS } from "../mutations/ClientMutations";
import { GET_CLIENTS } from "../queries/clientQueries";
import {GET_PROJECTS} from "../queries/projectQueries.jsx"

export default function ClientRow({ client }) {
  const [deleteClient] = useMutation(DELETE_CLIENTS, {
    variables: { id: client.id },
      refetchQueries: [{query: GET_CLIENTS}, {query: GET_PROJECTS}],// because the deletion doesn't update ui this is method 1
      // refetchQueries: [{query: GET_CLIENTS}],// because the deletion doesn't update ui this is method 1
      // update(cache, {data: {deleteClient}}){ 
      //     const {clients} = cache.readQuery({query: GET_CLIENTS});
      //     cache.writeQuery({
      //         query:GET_CLIENTS,
      //         data: {clients: clients.filter(client => client.id !== deleteClient.id)},
      //     })
      // }

      
  });

  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <button type="button" onClick={deleteClient} className="btn btn-danger btn-sm">
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}
