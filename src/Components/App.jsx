import { Children, Component } from "react";
 import Navbar from "../Components/NavbarLinks/Navbar";
import { Routes,Route } from "react-router-dom";
 import Register from "../Components/NavbarLinks/Register"
 import Login from '../Components/NavbarLinks/Login';
import jwtDecode from "jwt-decode";
import React from 'react'
import { useState , useEffect} from "react";
import { Navigate,useNavigate } from "react-router-dom";
import Home from '../Components/NavbarLinks/Home';
 import MovieDetails from '../Components/Details/MovieDetails';
import Movies from '../Components/NavbarLinks/Movies';
import TvDetails from '../Components/Details/TvDetails';
import PersonDetails from '../Components/Details/PersonDetails';
import Tvshows from '../Components/NavbarLinks/Tvshows';
import NotFound from './NotFound';
import Profile from '../Components/Details/Profile';
import style from '../Style/home.module.css'


export default function App() {

  useEffect(()=>{ //for Refresh 
    if(localStorage.getItem("userToken"))
    {
       decodeToken();
    }

    return () => {
      localStorage.removeItem("pagenum")
    }
    
  },[])

  

  const [userData, setUserData] = useState(null)
  let navigate = useNavigate();

  
  function decodeToken()
  {
    let encoded = localStorage.getItem("userToken");
    let decoded = jwtDecode(encoded)
    setUserData(decoded)
  }

  function logout()
  {
    setUserData(null);
    localStorage.clear()

    navigate('/login')
  }

  function ProtectedRoute(props)
  {
    if(localStorage.getItem("userToken")===null)
    {
      return <Navigate to="/login"/>
    }
    else
    {
      return props.children;
    }
  }

  const [profile, setprofile] = useState(null)





  

  return (
      <>
        <Navbar logout={logout} userData={userData} />
        
      <div className="container mt-5">
    
      
        <div className="container-fluid">
          <Routes>
            <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
            <Route path="register" element={<Register/>} />
            <Route path="login" element={<Login decodeToken={decodeToken} />} />
            <Route path="home" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
            <Route path="movies" element={<ProtectedRoute><Movies/></ProtectedRoute>}/>
            <Route path="tvs" element={<ProtectedRoute><Tvshows/></ProtectedRoute>}/>

            <Route path="moviedetails" element={<ProtectedRoute><MovieDetails/></ProtectedRoute>}>
              <Route path=":id" element={<ProtectedRoute><MovieDetails/></ProtectedRoute>}/>
            </Route>

            <Route path="tvdetails" element={<ProtectedRoute><TvDetails/></ProtectedRoute>}>
              <Route path=":id" element={<ProtectedRoute><TvDetails/></ProtectedRoute>}/>
            </Route>

            <Route path="persondetails" element={<ProtectedRoute><PersonDetails/></ProtectedRoute>}>
              <Route path=":id" element={<ProtectedRoute><PersonDetails/></ProtectedRoute>}/>
            </Route>

            <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>}/>

            <Route path="/*" element={<NotFound/>} />
          </Routes>
        </div>
      </div>
      
      </>
    )
}

{/* <Route path="home" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
            <Route path="movies" element={<ProtectedRoute><Movies/></ProtectedRoute>}/>
            <Route path="tvs" element={<ProtectedRoute><Tvshows/></ProtectedRoute>}/>

            <Route path="moviedetails" element={<ProtectedRoute><MovieDetails/></ProtectedRoute>}>
              <Route path=":id" element={<ProtectedRoute><MovieDetails/></ProtectedRoute>}/>
            </Route>

            <Route path="tvdetails" element={<ProtectedRoute><TvDetails/></ProtectedRoute>}>
              <Route path=":id" element={<ProtectedRoute><TvDetails/></ProtectedRoute>}/>
            </Route>

            <Route path="persondetails" element={<ProtectedRoute><PersonDetails/></ProtectedRoute>}>
              <Route path=":id" element={<ProtectedRoute><PersonDetails/></ProtectedRoute>}/>
            </Route> */}