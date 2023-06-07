import { gql } from "@apollo/client";

const ADD_PROJECT = gql`
  mutation addClient(
    $name: String!
    $description: String!
    $clientId: ID!
    $status: String!
  ) {
    addProject(
      name: $name
      description: $description
      clientId: $clientId
      status: $status
    ) {
      id
      name
      description
      status
      clientId
    }
  }
`;

export { ADD_PROJECT };
