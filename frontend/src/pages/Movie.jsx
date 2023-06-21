import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";

const getMovie = gql`
  query Query($movieId: String!) {
    movie(id: $movieId) {
      id
      title
      rating
      isLiked @client
    }
  }
`;

function Movie() {
  const { id } = useParams();
  const { loading, data } = useQuery(getMovie, {
    variables: {
      movieId: id,
    },
  });
  return (
    <div>
      <h2>{loading ? "Loading..." : data.movie.title}</h2>
      <p>{data?.movie.rating}</p>
      <button type="button">{data?.movie.isLiked ? "unlike" : "like"}</button>
    </div>
  );
}

export default Movie;
