import { useApolloClient, gql } from "@apollo/client";
import React, { useEffect } from "react";
import { useState } from "react";

function Home() {
  const [movies, setMovies] = useState([]);
  const client = useApolloClient();

  useEffect(() => {
    client
      .query({
        query: gql`
          {
            movies {
              id
              title
            }
          }
        `,
      })
      .then((data) => setMovies(data.data.movies));
  }, []);

  return (
    <div>
      <ul>
        {movies?.map((e) => (
          <li key={e.id}>{e.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
