import React from "react";
import { GET_PROJECT } from "../queries/projectQueries";
import { Link, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useQuery } from "@apollo/client";
import ClientInfo from "../components/ClientInfo";

export default function Project() {
  const { id } = useParams();

  const { loading, error, data } = useQuery(GET_PROJECT, { variables: { id } });
  if (loading) {
    <Spinner />;
  }
  if (error) {
    <p>Internal Server Error</p>;
  }

  return (
    <>
      {!loading && !error && (
        <div className="mx-auto w-75 card p-5">
          <h1>{data.project.name}</h1>
          <p>{data.project.description}</p>
          <h5 className="mt-3">Project Status</h5>
          <p className="lead">{data.project.status}</p>
          <div>
            <ClientInfo client={data.project.client} />
          </div>
          <Link to="/" className="btn mt-5 btn-light btn-sm w-25 d-inline mx-auto">
            Back
          </Link>
        </div>
      )}
    </>
  );
}
