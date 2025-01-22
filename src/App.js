import React, { useEffect, useState } from 'react'
import Navebar from './component/Navebar';
import Home from './component/Home';

import Movies from './component/Movies';
import Login from './component/Login';
import Register from './component/Register';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Tv from './component/Tv';
import Pepole from './component/Pepole';
import { jwtDecode } from 'jwt-decode';
import MoviesDetails from './component/MoviesDetails'
import TvDetails from './component/TvDetails';
import PepoleDetails from './component/PepoleDetails';

function App() { 
  
const [userData, setUserData] = useState(null);
 useEffect (()=>{
  if (localStorage.getItem('userToken'))
  {
    getUserData();
  }
 },[])


let navigate = useNavigate();

function getUserData (){

  const token = localStorage.getItem('userToken');
 let  decodedToken = jwtDecode(token)

  setUserData(decodedToken);
}

// when change userData from null to data => print 
useEffect(() => {}, [userData])

function logOut (){
  localStorage.removeItem('userToken') ;
  setUserData(null);
  navigate('/login')
  
}

// when user dosent login navigate to login & else return children (any comonent he clicked )
function ProtectedRoute({children}){
  if (!localStorage.getItem('userToken')){
  return  <Navigate to = '/login' />
  }
  else
  {
   return children ;
  }
}

  return (

    <div>
      
     <Navebar userData={userData} logOut={logOut} />

     <div className='container'>
      <Routes>
      <Route path='/'  element = {<Login/>} />
      <Route path="" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path='home'  element = {<ProtectedRoute><Home/></ProtectedRoute>}    />
      <Route path='movies'  element = {<ProtectedRoute><Movies/></ProtectedRoute>}    />
      <Route path='tv'  element = {<ProtectedRoute><Tv/></ProtectedRoute>}    />
      <Route path='pepole'  element = {<ProtectedRoute><Pepole/></ProtectedRoute>}    />

      <Route path="moviedetails" element={<MoviesDetails />} >
         <Route path=":id" element={<MoviesDetails />} />
      </Route>

      <Route path="tvdetails" element={<TvDetails />} >
          <Route path=":id" element={<TvDetails />} />
      </Route>

      <Route path="pepoledetails" element={<PepoleDetails />} >
          <Route path=":id" element={<PepoleDetails />} />
      </Route>

      <Route path='login'  element = {<Login   getUserData={getUserData}  />  } />
      <Route path='register'  element = {<Register/>} />
      {/* <Route path='*'  element = {<h2> 404 </h2>} /> */}
      </Routes>
     </div>
    
   </div>
  


  )
}

export default App;