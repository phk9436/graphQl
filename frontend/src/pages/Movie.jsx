import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";

const getMovie = gql`
  query MovieQuery($movieId: String!) {
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
  const {
    loading,
    data,
    client: { cache },
  } = useQuery(getMovie, {
    variables: {
      movieId: id,
    },
  });
  const clickLike = () => {
    cache.writeFragment({
      id: `Movie:${id}`,
      fragment: gql`
        fragment MovieFrag on Movie {
          isLiked
        }
      `,
      data: {
        isLiked: !data.movie.isLiked
      }
    });
  };
  return (
    <div>
      <h2>{loading ? "Loading..." : data.movie.title}</h2>
      <p>{data?.movie.rating}</p>
      {!loading && (
        <button type="button" onClick={clickLike}>
          {data?.movie.isLiked ? "unlike" : "like"}
        </button>
      )}
    </div>
  );
}

export default Movie;
