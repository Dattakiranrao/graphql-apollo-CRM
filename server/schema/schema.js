// const { projects, clients } = require("../sampleData.js");
// Mongoose models
const Project = require("../models/Project.js");
const Client = require("../models/Client.js");
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
} = require("graphql");

const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    clientId: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve: (project) => Client.findById(project.clientId)
        // clients.find((client) => project.clientId === client.id),
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    clients: {
      type: GraphQLList(ClientType),
      description: "ALl the Clients in the DB",
      resolve: () => Client.find(),
    },

    client: {
      type: ClientType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: (parent, args) => Client.findById(args.id)
        // clients.find((client) => client.id === args.id),
    },

    projects: {
      type: GraphQLList(ProjectType),
      description: "ALl Projects",
      resolve: () => Project.find(),
    },

    project: {
      type: ProjectType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: (parent, args) => Project.findById(args.id)
        // projects.find((project) => project.id === args.id),
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
