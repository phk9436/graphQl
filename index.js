import { ApolloServer, gql } from "apollo-server";

let tweets = [
  {
    id: "1",
    text: "text",
    userId: "user1"
  },
  {
    id: "2",
    text: "text2",
    userId: "user2"
  },
];

let users = [
  {
    id: "user1",
    firstName: "nico",
    lastName: "las",
  },
  {
    id: "user2",
    firstName: "Elon",
    lastName: "Mask",
  },
];

const typeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    fullName: String!
  }
  type Tweet {
    id: ID!
    text: String!
    author: User!
  }
  type Query {
    allUsers: [User!]!
    allTweets: [Tweet!]!
    tweet(id: ID!): Tweet
  }
  type Mutation {
    postTweet(text: String!, userId: ID!): Tweet!
    deleteTweet(id: ID!): Boolean!
  }
`;

const resolvers = {
  Query: {
    allTweets() {
      return tweets;
    },
    allUsers() {
      return users;
    },
    tweet(root, props) {
      return tweets.find((e) => e.id === props.id);
    },
  },
  Mutation: {
    postTweet(root, props) {
      const newTweet = {
        id: tweets.length + 1,
        text: props.text,
      };
      tweets.push(newTweet);
      return newTweet;
    },
    deleteTweet(root, props) {
      const tweet = tweets.find((e) => e.id === props.id);
      if (!tweet) return false;
      tweets = tweets.filter((e) => e.id !== props.id);
      return true;
    },
  },
  User: {
    fullName(root) {
      return `${root.firstName} ${root.lastName}`;
    },
  },
  Tweet: {
    author(root) {
      console.log(root)
      return users.find(e => e.id === root.userId);
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => console.log(url));
