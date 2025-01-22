import axios from 'axios';
import React, { useEffect, useState } from 'react' ;

function Pepole() {
  
  const [trendingPepole, setTrendingPepole] = useState([]);

  async function getTrendingPepole() {
    let {data} = await axios.get(`https://api.themoviedb.org/3/trending/person/day?api_key=077f4c6a51b65d4c45d539563fb65f66`)
    setTrendingPepole(data.results);
  }

  useEffect(() => {
    getTrendingPepole();
  
 
  }, [])
  




  return (

    <>
{trendingPepole? <div className=' row justify-content-center py-5'>
  {trendingPepole.map((person , i )=> <div key={i} className="col-md-2 py-3">
  <div className="actor">
  {<img src={'https://image.tmdb.org/t/p/original/' + person.profile_path} alt="" className="w-100" />}
  <h3 className=' h6 my-4 text-center'>{person.name}</h3>
    </div>
     </div> ) }

</div> :  <div className=' vh-100 d-flex justify-content-center align-items-center'>
        <i className=' fas fa-spinner fa-spin fa-3x'></i>
      </div>  }

    
    
    
    
    </>



  )
}

export default Pepole