import axios from 'axios';
import React, { useEffect, useState } from 'react' ;
import { Link } from 'react-router-dom';

function Tv() {
  
  const [trendingTv, setTrendingTv] = useState([]);
  let nums = new Array(13).fill(1).map((elem, index) => index + 1)

  async function getTrendingTv(pageNumber) {
    let { data } = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=fedb2e6d7633d3698e236eecc75da7ca&language=en-US&sort_by=popularity.desc&page=${pageNumber}&timezone=America%2FNew_York&include_null_first_air_dates=false`);
    setTrendingTv(data.results);
  }

  useEffect(() => {
    getTrendingTv(1);
  
  }, [])
  




  return (

    <>

<nav aria-label="..." className=' py-5'>
        <ul className="pagination pagination-sm d-flex justify-content-center">

          {
            nums.map((pageNum) => <li onClick={() => getTrendingTv(pageNum)} key={pageNum} className="page-item "><a className=" pointer page-link PaginationTo" >{pageNum}</a></li>
            )
          }

        </ul>
      </nav>



{trendingTv? <div className=' row justify-content-center py-5'>
  {trendingTv.map((tv , i )=> <div key={i} className="col-md-2 py-3">
  <div className="tv">
  <Link to={`/tvdetails/${tv.id}`}>

 <img src={'https://image.tmdb.org/t/p/original/' + tv.poster_path} alt="" className="w-100" />
  <h3 className=' h6 my-4 text-center'>{tv.name}</h3>
  </Link>

    </div>
     </div> ) }

</div> :  <div className=' vh-100 d-flex justify-content-center align-items-center'>
        <i className=' fas fa-spinner fa-spin fa-3x'></i>
      </div>  }



    
    
    
    
    </>



  )
}

export default Tv