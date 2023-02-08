import axios from 'axios';
import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Movie from './Movie';
import LikedMovies from './LikedMovies';
function App(){
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/liked-movies" element={<LikedMovies/>}/>
      <Route exact path="/:id" element={<Movie />}/>
      {/* <Route path = "*" element={<Movie />} /> */}
    </Routes>
  </BrowserRouter>
  )
}

ReactDOM.render(
  <App/>,
  document.getElementById("root")
);