import { ApolloServer, gql } from "apollo-server";
import fetch from "node-fetch";
import axios from "axios";

let tweets = [
  {
    id: "1",
    text: "text",
    userId: "user1",
  },
  {
    id: "2",
    text: "text2",
    userId: "user2",
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
    """
    show all users
    """
    allUsers: [User!]!
    """
    show all tweets
    """
    allTweets: [Tweet!]!
    """
    show one tweet matched id
    """
    tweet(id: ID!): Tweet
    movie(id: String!): Movie
    movies: [Movie!]!
  }
  type Mutation {
    """
    post tweet with text and userid
    """
    postTweet(text: String!, userId: ID!): Tweet!
    """
    delete tweet matched id
    """
    deleteTweet(id: ID!): Boolean!
  }
  type Movie {
    id: Int!
    url: String!
    imdb_code: String!
    title: String!
    title_english: String!
    title_long: String!
    slug: String!
    year: Int!
    rating: Float!
    runtime: Float!
    genres: [String]!
    summary: String
    description_full: String!
    synopsis: String
    yt_trailer_code: String!
    language: String!
    background_image: String!
    background_image_original: String!
    small_cover_image: String!
    medium_cover_image: String!
    large_cover_image: String!
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
    async movie(root, props) {
      const { data } = await axios.get(
        `https://yts.mx/api/v2/movie_details.json?movie_id=${props.id}`
      );
      const { movie } = data.data;
      return movie;
    },
    async movies() {
      const {data} = await axios.get(
        "https://yts.mx/api/v2/list_movies.json"
      );
      const { movies } = data.data;
      return movies;
    }
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
      return users.find((e) => e.id === root.userId);
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => console.log(url));
