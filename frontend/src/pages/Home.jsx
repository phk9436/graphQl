import { useApolloClient, gql, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useState } from "react";

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
      <ul>
        {!loading && data.movies?.map((e) => <li key={e.id}>{e.title}</li>)}
      </ul>
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
