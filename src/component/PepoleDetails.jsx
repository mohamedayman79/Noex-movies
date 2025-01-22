import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom'


export default function PepoleDetails() {

    const [PeopoleDetails, setPeopoleDetails] = useState(null);

    async function getPeopoleDetails(id) {
        let { data } = await axios.get(`https://api.themoviedb.org/3/person/${id}?api_key=fedb2e6d7633d3698e236eecc75da7ca&language=en-US`);
        setPeopoleDetails(data);
      }
    
    
      useEffect(() => {
        getPeopoleDetails(parameterMovie.id);
    
      }, [])

      let parameterMovie = useParams();
      console.log(PeopoleDetails);


  return (
    <>
        {PeopoleDetails ? <div className=' row py-5'>
        <div className="col-md-3">
        {PeopoleDetails.profile_path === null ? <img src={require("./111.png")} className=" w-100 pt-5"/> : <img src={'https://image.tmdb.org/t/p/original/' + PeopoleDetails.profile_path} alt="" className="w-100" />}
        </div>
        <div className="col-md-9 pb-5 ps-5">
          <h2>{PeopoleDetails.name}</h2>
          {PeopoleDetails.biography === "" ? <p>There is no biography</p> : <p>{PeopoleDetails.biography}</p>}
          <ul>
          <li>birthday : {PeopoleDetails.birthday}</li>
          {PeopoleDetails.homepage ? <li>home page : {PeopoleDetails.homepage}</li> : <li>home page : He does not have a website</li>}
          <li>department : {PeopoleDetails.known_for_department}</li>
          <li>place of birth : {PeopoleDetails.place_of_birth}</li>
        </ul>
        </div>

        

      </div> : <div className=' vh-100 d-flex justify-content-center align-items-center'>
        <i className=' fas fa-spinner fa-spin fa-3x'></i>
      </div>}
    </>
  )
}
