import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { API_KEY, useGlobalContext } from "./context";

const SingleMovie = () => {
  const { id } = useParams();
  const { setIsLoading, isLoading, error, setError } = useGlobalContext();
  const [movie, setMovie] = useState({});

  const fetchMovie = async (url) => {
    setIsLoading(true);
    
      const response = await fetch(url);
      const data = await response.json();
      if (data.Response === "False") {
        setError({ show: true, msg: data.Error });
      } else {
         setMovie(data);
         setIsLoading(false);
      }
      setIsLoading(false);
  };

  useEffect(() => {
    fetchMovie(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`);
  }, [id]);

  if (isLoading) {
    return <div className="loading"></div>;
  }
  if (error.show) {
    return (
      <div className="page-error">
        <h1>{error.msg}</h1>
        <link to="/" className="btn">
          Back to movies
        </link>
      </div>
    );

  }

  const {Poster : poster,Title:title,Plot:plot,Year:year}=movie;


  return <section className="single-movie">
    <img src={poster} alt={title} />
    <div className="single-movie-info">
      <h2>{title}</h2>
      <p>{plot}</p>
      <h4>{year}</h4>
      <Link to='/' className="btn">
        back to movies
      </Link>
    </div>
  </section>;
};

export default SingleMovie;
