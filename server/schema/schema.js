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
  GraphQLNonNull,
  GraphQLEnumType,
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
      resolve: (project) => Client.findById(project.clientId),
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
      resolve: (parent, args) => Client.findById(args.id),
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
      resolve: (parent, args) => Project.findById(args.id),
      // projects.find((project) => project.id === args.id),
    },
  },
});

//Mutations / CURD
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // Create Operation
    addClient: {
      type: ClientType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args) => {
        const client = new Client({
          name: args.name,
          email: args.email,
          phone: args.phone,
        });
        return client.save();
      },
    },

    // Delete Operation
    deleteClient: {
      type: ClientType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        Project.find({ clientId: args.id }).then((projects) => {
          projects.forEach((project) => {
            project.deleteOne();
          });
        });

        return Client.findByIdAndRemove(args.id);
      },
    },

    // Create A Project
    addProject: {
      type: ProjectType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatus",
            values: {
              new: { value: "Not Started" },
              progress: { value: "In Progress" },
              Completed: { value: "Completed " },
            },
          }),
          defaultValue: "Not Started",
        },
        clientId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve: (parent, args) => {
        const project = new Project({
          name: args.name,
          description: args.description,
          status: args.status,
          clientId: args.clientId,
        });
        return project.save();
      },
    },

    // Delete A project
    deleteProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve: (parent, args) => {
        return Project.findByIdAndRemove(args.id);
      },
    },

    // Update A project
    updateProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatusUpdate",
            values: {
              new: { value: "Not Started" },
              progress: { value: "In Progress" },
              Completed: { value: "Completed " },
            },
          }),
        },
      },
      resolve: (parent, args) => {
        return Project.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              description: args.description,
              status: args.status,
            },
          },
          { new: true } // this is to indicate if there is no previous object with the id the create a new one
        );
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: mutation,
});
