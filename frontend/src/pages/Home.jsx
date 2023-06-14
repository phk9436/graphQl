import { useApolloClient, gql, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const getMovies = gql`
  {
    movies {
      id
      title
    }
    allTweets {
      id
      text
      author {
        fullName
      }
    }
  }
`;

function Home() {
  const { data, loading } = useQuery(getMovies);

  return (
    <div>
      <h1>{loading ? "Loading..." : "Movies"}</h1>
      <ul>
        {!loading &&
          data.movies?.map((e) => (
            <li key={e.id}>
              <Link to={`/movie/${e.id}`}>{e.title}</Link>
            </li>
          ))}
      </ul>
      <h1>{!loading && "Tweets"}</h1>
      <ul>
        {!loading &&
          data.allTweets?.map((e) => (
            <li key={e.id}>
              {e.text}/by: {e.author.fullName}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Home;
