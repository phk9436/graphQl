import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    hello: String
    text: String
  }
`;

const server = new ApolloServer({ typeDefs });

server.listen().then(({ url }) => console.log(url));
