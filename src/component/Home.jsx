import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';


export default function Home() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingtv, setTrendingTv] = useState([]);
  const [trendingpeopole, setTrendingPeopole] = useState([]);


  async function getTrending(mediaType, callback) {
    let { data } = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=077f4c6a51b65d4c45d539563fb65f66`);
    callback(data.results.slice(0, 10));
  }

  useEffect(() => {
    getTrending('movie', setTrendingMovies);
    getTrending('tv', setTrendingTv);
    getTrending('person', setTrendingPeopole);
  }, [])

  console.log(trendingpeopole);


  return (
    <>
      <div className="row py-5">
        <div className="col-md-4 d-flex align-items-center">
          <div>
            <div className="borderr w-25 mb-4"></div>
            <h2 className=' h3'>Trending <br /> Movies <br />To Watch Right Now </h2>
            <p className=' text-muted'>Top Trending Movies By Day</p>
            <div className=" borderr mt-4"></div>
          </div>
        </div>

        {trendingMovies.map((movie, i) => <div key={i} className="col-md-2 py-3">
          <div className="movie">
          <Link to={`/moviedetails/${movie.id}`}>
              <img src={'https://image.tmdb.org/t/p/original/' + movie.poster_path} alt="" className="w-100" />
              <h3 className=' h6 my-4 text-center'>{movie.title}</h3>
          </Link>
          </div>
        </div>)}
      </div>


      <div className="row py-5">
        <div className="col-md-4 d-flex align-items-center">
          <div>
            <div className="borderr w-25 mb-4"></div>
            <h2 className=' h3'>Trending <br /> Tv <br />To Watch Right Now </h2>
            <p className=' text-muted'>Top Trending Tv By Day</p>
            <div className=" borderr mt-4"></div>
          </div>
        </div>

        {trendingtv.map((tv, i) => <div key={i} className="col-md-2 py-3">
          <div className="tv">
          <Link to={`/tvdetails/${tv.id}`}>

              <img src={'https://image.tmdb.org/t/p/original/' + tv.poster_path} alt="" className="w-100" />
              <h3 className=' h6 my-4 text-center'>{tv.name}</h3>
          </Link>
          </div>
        </div>)}
      </div>


      <div className="row py-5">
        <div className="col-md-4 d-flex align-items-center">
          <div>
            <div className="borderr w-25 mb-4"></div>
            <h2 className=' h3'>Trending <br /> Actor <br />To Watch Right Now </h2>
            <p className=' text-muted'>Top Trending actor By Day</p>
            <div className=" borderr mt-4"></div>
          </div>
        </div>
        {trendingpeopole.map((person, i) => <div key={i} className="col-md-2 py-3">
          <div className="actor">
          <Link to={`/pepoledetails/${person.id}`}>

              {person.profile_path === null ? <img src={require("./111.png")} className=" w-100 pt-5" /> : <img src={'https://image.tmdb.org/t/p/original/' + person.profile_path} alt="" className="w-100" />}
              <h3 className=' h6 my-4 text-center'>{person.name}</h3>
              </Link>
              
          </div>
        </div>)}
      </div>
    </>
  )
}
