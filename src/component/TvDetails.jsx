import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom'


export default function TvDetails() {

    const [tvDetails, setTvDetails] = useState(null);

    async function getTvDetails(id) {
        let { data } = await axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=fedb2e6d7633d3698e236eecc75da7ca&language=en-US`);
        setTvDetails(data);
    }


    useEffect(() => {
        getTvDetails(parameterTv.id);

    }, [])


    let parameterTv = useParams();



    return (
        <>

            {tvDetails ? <div className=' row py-5'>
                <div className="col-md-3">
                    <img className=' w-100' src={'https://image.tmdb.org/t/p/original/' + tvDetails.poster_path} alt="" />
                </div>
                <div className="col-md-9 py-4 ps-5">
                    <h2 className=' pt-5'>{tvDetails.name}</h2>
                    <p>{tvDetails.overview}</p>
                    <ul>
                        <li>budget : {tvDetails.budget}</li>
                        <li>vote : {tvDetails.vote_average}</li>
                        <li>popularity : {tvDetails.popularity}</li>
                        <li>vote count : {tvDetails.vote_count}</li>
                    </ul>
                </div>

            </div> : <div className=' vh-100 d-flex justify-content-center align-items-center'>
                <i className=' fas fa-spinner fa-spin fa-3x'></i>
            </div>}

        </>
    )
}
