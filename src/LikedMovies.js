import React, { useState, useEffect } from "react";
import "./liked-movies.css";
import { AiFillDelete } from "react-icons/ai";
const LikedMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("key"));
    if (items) {
      setMovies(items);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("key", JSON.stringify(movies));
  }, [movies]);

  const handleDelete = (movie) => {
    setMovies(
      movies.filter((t) => {
        return movie.imdbID !== t.imdbID;
      })
    );

    // console.log(movies)
  };
  return (
    <div className="container">
      <div className="heading">Wishlist</div>
      <div className="movies-container">
        {(movies===undefined || movies.length===0)?(
          <div className="not-found">No Movie Wishlisted</div>
        ):(
          movies.map((m) => {
            return (
              <div className="movie-item">
                {m.Poster === "N/A" ? (
                  <div className="img-not-found">Poster Not Available</div>
                ) : (
                  <img src={m.Poster} alt="" />
                )}
                <p>{m.Title}</p>
                <AiFillDelete
                  className="delete"
                  onClick={() => {
                    handleDelete(m);
                  }}
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default LikedMovies;
