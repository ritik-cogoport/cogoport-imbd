import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {v4 as uuid} from 'uuid';
import "./index.css";
import logo from '../src/logo.svg'
import {FcLike} from 'react-icons/fc'
import {AiOutlineArrowRight} from 'react-icons/ai'
import {BsFillArrowLeftCircleFill,BsFillArrowRightCircleFill} from 'react-icons/bs'
import {BsHeart,BsFillHeartFill,BsStarFill,BsFillArrowRightSquareFill} from 'react-icons/bs'

const App = () => {
  const [movies,setMovies] = useState([]);
  const [likedmovies,setLikedMovies] = useState([]);
  const [showmovies,setShowmovies] = useState(movies);
  const [search,setSearch] = useState('');
  
  const [page,setPage] = useState(1);
  const [year,setYear] = useState('');
  const [movieID,setMovieID] = useState('');

  const y = (new Date()).getFullYear();
  const years = Array.from(new Array(25),( val, index) => y-index);
  

  useEffect(() => {
    getMovies().then((d)=>{
      updateIfLiked(d);
    })

    
  },[])

  const updateIfLiked = (d) => {

    const items = JSON.parse(localStorage.getItem('key'));
    if(items){
      setLikedMovies(items);
      for(let i=0;i<items.length;i++){
        let t = items[i];
        for(let j=0;j<d.length;j++){
          if(t.imdbID===d[j].imdbID){
            console.log(true);
          }
        }
      }
    }
  }

  useEffect(() => {
    getMovies(page,year);
    // console.log((movies));
  },[page])
  useEffect(() => {
    setPage(1);
    getMovies(page,year);
  },[year])
  // useEffect(() => {
  //   getMovies();
  // },[search])

  useEffect(() => {
    if(movies===undefined) return;

    movies.forEach((item) => {
      const id  = uuid();
      // console.log(item);
      item.id = id;
      item.liked = false;
      setShowmovies([...movies])
      // console.log(showmovies);
    })
  },[movies])

  const getMovies = async (page=1,year='') => {
    try {
      let moviesRequested;
      if(search.length>2){
        moviesRequested=await axios.get(`https://www.omdbapi.com/?s=${search}&page=${page}&y=${year}&apikey=f6d8a7ec`)
      }else{
        // if(page<=0) setPage(1);
        // if (page <= 10) {
          // if(year!=="") setPage(1);
          console.log("year = "+ year+ "page =" + page);
          moviesRequested=await axios.get(`https://www.omdbapi.com/?s=harry&page=${page}&y=${year}&apikey=f6d8a7ec`)
          // setPage(page+1);
      // }
      }
      // console.log(moviesRequested.data)
      setMovies(moviesRequested.data.Search)
      return moviesRequested.data.Search
      
    } catch (error) {
      console.log(error);
    }
  }

  const getByID = async (movieID) => {
    try {

      let moviesRequested;

      if(movieID===""){
        getMovies(1,year)
      }else{
        moviesRequested = await axios.get(`https://www.omdbapi.com/?i=${movieID}&apikey=f6d8a7ec`)
        setMovies([moviesRequested.data])
      }

      
      

      console.log(moviesRequested.data)
    } catch (error) {
      console.log(error);
    }
  }

  


  const markLiked = (id) => {
    let liked;
    setShowmovies(
      showmovies.map(m => {
        if(m.id==id){
          m.liked = !m.liked;
          liked = m;
        }
        return m;
      })
    )


    if(likedmovies.includes(liked)){
      // console.log(liked);
      let idx = likedmovies.indexOf(liked);
      if(idx>-1){
        likedmovies.splice(idx,1);
      }
    }else{
      console.log(liked)
      likedmovies.push(liked);
    }


    localStorage.setItem('key', JSON.stringify(likedmovies));



  }

  const filterYear = (e) => {
    setYear(e.target.value)
  }


  return(
    <div className="container">
      <div className="navbar">
        <img src={logo} alt="" />
        <div className="search-container">
        <div className="search-name">
        <input type="text" placeholder="Search movie here" onChange={(e)=>{setSearch(e.target.value)}}/>
        <AiOutlineArrowRight className="button" onClick={()=>{getMovies(1,year)}}/>
        </div>
        <div className="search-id">
          <input type="text" placeholder="Search IMDB ID" onChange={(e)=>{setMovieID(e.target.value)}}/>
          <AiOutlineArrowRight className="button"  onClick={(e)=>{getByID(movieID)}} />
        </div>
        
        </div>
        <select onChange={filterYear} className="year-filter">
          <option value="" hidden>Year</option>
     {
       years.map((year, index) => {
         return <option key={`year${index}`} value={year}>{year}</option>
       })
     }
    </select>
        <FcLike className="liked" />
      </div>
      
      <div className="movies-container">
        {/* {console.log(showmovies)} */}
        {movies===undefined?(
          <div className="not-found">Movies Not Found</div>
        ):(showmovies.length>0?(
          showmovies.map((m)=>{
            return(
              <div className="movie-item">
                {m.Poster==="N/A"?(
                  <div className="img-not-found">Poster Not Available</div>
                ):(

                  <img src={m.Poster} alt="" />
                )}
              <p>{m.Title}</p>
                {/* <BsStarFill/>
                {m.liked?(
              <BsFillHeartFill className='isLiked' onClick={()=>markLiked(m.id)}/>
              ):(
              <BsHeart className='not-liked' onClick={()=>markLiked(m.id)}/>
              )} */}
              </div>
            )
          })
        ):(''))}
      {}
      </div>
      {(movies===undefined)?(''):(
        
        <>{
          movieID===""?(
            <div className="pagination">
          {page>1?(
          <BsFillArrowLeftCircleFill className="backward" onClick={()=>{setPage(page-1)}}/>
          ):('')}
          <div className="current">{page}</div>
          <BsFillArrowRightCircleFill className="forward" onClick={()=>{setPage(page+1)}}/>
          </div>
          ):('')
        }</>
        
      )}
    </div>
  )
};

ReactDOM.render(<App />, document.getElementById("root"));
