import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom'

export default function MovieDetails() {

  const [movieDetails, setMovieDetails] = useState(null);

  async function getMovieDetails(id) {
    let { data } = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=fedb2e6d7633d3698e236eecc75da7ca&language=en-US`);
    setMovieDetails(data);
  }


  useEffect(() => {
    getMovieDetails(parameterMovie.id);

  }, [])



  let parameterMovie = useParams();


  return (
    <>
      {movieDetails ? <div className=' row py-5'>
        <div className="col-md-3">
          <img className=' w-100' src={"https://image.tmdb.org/t/p/original/" + movieDetails.poster_path} alt="" />
        </div>
        <div className="col-md-9 py-4 ps-5">
          <h2 className=' pt-5'>{movieDetails.title}</h2>
          <p>{movieDetails.overview}</p>
          <ul>
          <li>budget : {movieDetails.budget}</li>
          <li>vote : {movieDetails.vote_average}</li>
          <li>popularity : {movieDetails.popularity}</li>
          <li>vote count : {movieDetails.vote_count}</li>
        </ul>
        </div>

        

      </div> : <div className=' vh-100 d-flex justify-content-center align-items-center'>
        <i className=' fas fa-spinner fa-spin fa-3x'></i>
      </div>}
      
    </>
  )
}
