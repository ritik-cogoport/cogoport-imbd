import React,{useState,useEffect} from 'react'
import "./movie.css";
import axios from "axios"
import {AiFillStar,AiFillHeart} from 'react-icons/ai'
import { useParams } from 'react-router-dom';
const Movie = () => {

  const {id} = useParams();


  const[movie,setMovie] = useState({});
  const[isliked,setIsliked] = useState(false);
  const [likedmovies,setLikedMovies] = useState([]);



  useEffect(() => {
    getByID()
    const items = JSON.parse(localStorage.getItem('key'));
    if(items){
      setLikedMovies(items);
    }
  },[])
  // useEffect(() => {
  //   localStorage.setItem('key', JSON.stringify(likedmovies));
  // },[likedmovies])

  const getByID = async () => {
    try {

      let moviesRequested = await axios.get(`https://www.omdbapi.com/?i=${id}&apikey=f6d8a7ec`)
        setMovie(moviesRequested.data)
  
      // console.log(moviesRequested.data)
    } catch (error) {
      console.log(error);
    }
  }

  const handleLike = () => {
    let flag = false;
    for(let i=0;i<likedmovies.length;i++){
      let t = likedmovies[i].imdbID;
      if(movie.imdbID===t) flag = true;
    }
    if(!flag) likedmovies.push(movie)

    localStorage.setItem('key', JSON.stringify(likedmovies));


  }


  return (
    <div className='movie-container'>
        <div className="movie-title">
          {movie.Title}
        </div>
        <div className="movie-image-container">
          <div className="movie-image-and-others">
            <img src={movie.Poster} alt="" />
            <div className="movie-others">
              <div>Year - {movie.Year}</div>
              <div>{movie.Rated}</div>
              <div>{movie.Runtime}</div>
            </div>
            <div className="movie-rating">
              <AiFillStar className='movie-star'/>
              {movie.imdbRating}/10</div>
              <div className='votes'>Total votes - {movie.imdbVotes}</div>
              
          </div>
          <div className="movie-plot">
            <div className="movie-plot-heading">Plot</div>
            <div>{movie.Plot}</div>
            <div className="movie-cast"><b>Cast</b> - {movie.Actors}</div>
            <div className='movie-like-container'>
          <AiFillHeart className='movie-like-button' onClick={handleLike}/>
          {isliked?('Added to Wishlist'):('Add to Wishlist')}
            </div>

          </div>
        </div>
    </div>
  )
}

export default Movie