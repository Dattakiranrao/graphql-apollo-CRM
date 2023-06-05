import React from "react";
import AddClient from "../components/AddClient";
import Clients from "../components/Clients";
import Projects from "../components/Projects";

export default function Home() {
  return (
    <>
      <div className="d-flex gap-3 mb-4">
      <AddClient />
      </div>
      <Projects />
      <Clients />
    </>
  );
}
