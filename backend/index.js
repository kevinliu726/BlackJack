import mongo from "./mongo.js";
import db from "./db.js";
import { GraphQLServer, PubSub } from "graphql-yoga";
import Query from "./resolvers/Query.js";
import Mutation from "./resolvers/Mutation.js";

const pubSub = new PubSub();

const server = new GraphQLServer({
  typeDefs: "./schema.graphql",
  resolvers: {
      Query,
      Mutation
  },
  context: {
    db,
    pubSub
  }
})

mongo.connect();

server.start({port: 8080}, () => {
    console.log("The server is up on port 8080.");
})

