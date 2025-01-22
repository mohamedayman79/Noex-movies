import React, { useEffect, useState } from 'react' 
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Movies() {

  const [movies, setMovies] = useState([]);

  let nums = new Array(13).fill(1).map((elem, index) => index + 1)

    async function getTrendingMovies(pageNumber) {
      try {
        let { data } = await axios.get(
          `https://api.themoviedb.org/3/trending/all/day?api_key=077f4c6a51b65d4c45d539563fb65f66&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNumber}`
        );
        setMovies(data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    }

    useEffect(() => {
    getTrendingMovies(1);
  }, []);

  return (
  <>

<nav aria-label="..." className=' py-5'>
        <ul className="pagination pagination-sm d-flex justify-content-center">
          {
            nums.map((pageNum) => <li onClick={() => getTrendingMovies(pageNum)} key={pageNum} className="page-item"><a className=" pointer page-link PaginationTo" >{pageNum}</a></li>
            )
          }

        </ul>
      </nav>

      {movies ? <div className="row py-5 justify-content-center">
        {movies.map((movie, i) => <div key={i} className="col-md-2">
          <div className="movie">

             <Link to= {`/MoviesDetails/{movie.id}`}>

              <img src={'https://image.tmdb.org/t/p/original/' + movie.poster_path} alt="" className="w-100" />
              <h3 className=' h6 my-4 text-center'>{movie.title || movie.name}</h3>
     

              </Link>
          </div>
        </div>)}
      </div> : <div className=' vh-100 d-flex justify-content-center align-items-center'>
        <i className=' fas fa-spinner fa-spin fa-3x'></i>
      </div>}

</> )
}


// done 