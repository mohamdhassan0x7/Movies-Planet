import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import style from '../../Style/home.module.css'
export default function MovieDetails() {
    let param = useParams();
    const [movie, setmovie] = useState(null)
    async function getMovie()
    {
        let {data} = await axios.get(`https://api.themoviedb.org/3/movie/${param.id}?api_key=9b3a5414c1198ebced482e012a215ab5&language=en-US`)
        setmovie(data)
    }

    const [wish_List, setwishList] = useState([])
    async function getWishList()
    {
      setwishList(JSON.parse(localStorage.getItem(["myMovies"])));
      setstared(false)
      JSON.parse(localStorage.getItem(["myMovies"])).map((movie)=>{

        if(movie.id == param.id)
          {
              setstared(true)
          }
      })
      
    }
    
    const [stared, setstared] = useState()

    async function addToWishList(id)
    {
      const moviesList = JSON.parse(localStorage.getItem(["myMovies"]));
      moviesList.push(movie);
      localStorage.setItem(["myMovies"],JSON.stringify(moviesList))

      let res = await axios.put("https://movie-db-notes-be-n7iv.vercel.app/api/v1/user/addMovie",{
        movieId:id}, {headers:{
          authorization:localStorage.getItem("userToken")
        }})
        .catch(function (error) {
        if (error.response) {
          
        }else
        {
          
        }
      });
    }

    async function removeFromWishList(id)
    {
      const moviesList = JSON.parse(localStorage.getItem(["myMovies"]));
    
      for( var i = 0; i < moviesList.length; i++){ 
      
          if ( moviesList[i].id === movie.id) { 
      
            moviesList.splice(i, 1); 
          }
      
      }
      localStorage.setItem(["myMovies"],JSON.stringify(moviesList))

      let res = await axios.put("https://movie-db-notes-be-n7iv.vercel.app/api/v1/user/removeMovie",{
        movieId:id}, {headers:{
          authorization:localStorage.getItem("userToken")
        }})
        .catch(function (error) {
        if (error.response) {
          
        }else
        {
          
        }
      });
    }
   

    useEffect(() => {
        getMovie();
        getWishList();
 
    }, [])
    function addattribute()
    {
      let elment = document.getElementById("star");
     
      if(!elment.classList.contains("fa-solid"))
          {
              elment.classList.add("fa-solid");
              addToWishList(param.id);
          }
      else
          {
              elment.classList.remove("fa-solid");
              elment.classList.add("fa-regular");
              removeFromWishList(param.id)
          } 
              
    }

    function getStars(num) {
        let content = [];
        if(num===0)
           {
            content.push(<i class="fa-solid fa-circle-question"></i>)
             return content;
          }
        for (let i=1 ;i<num;i++) {
          content.push(<i className="fa-solid fa-star mx-1 "></i>);
        }
        if(num ==0.0)content.push (<i className="fa-solid fa-face-frown-slight"></i>)
        if(num%10 > 0)content.push(<i className="fa-solid fa-star-half mx-1"></i>);
        return content;
      };

      
   

      return (
        <>
        {
            movie?
            <div className={`${style.dark}  p-3 mt-10 mb-5 rounded-3 position-relative`}>
               
               <div className='row' >
    
                <div className={`col-lg-4 rounded-3 mb-3`}>
                    {movie.poster_path?
                        <img className={`w-100`} src={`https://image.tmdb.org/t/p/w500`+movie.poster_path}/>
                        :
                        <img className={` w-100 py-2`} src={require('../../Images/notfound2.jpg')}  alt="" />
                    }
                </div>

                <div className="col-1">
                </div>

                <div className="col-lg-6">
                   <div>
                   <div className='col-8'>
                             <h3>{movie.title}</h3>
                        </div>
                   <div className={`  row rounded-3 mb-3`}>
                      
                        <div className="col-6"></div>
                        <div className="col-6 d-flex justify-content-end align-items-center">

                        
                        {movie.adult?
                        <div className={`bg-danger text-white h-25  ${style.alretAge} `}>
                            <div className="">
                            <p>+18</p>
                            </div>
                        </div>:""}
                        <div className='mx-2'>
                            {   //console.log(wish_List.movies)
                            (stared==null)?(<div><i className="text-warning fa-solid fa-spinner fa-2x fa-spin"></i></div>):
                              ( stared?<div><i onClick={()=>{addattribute();movie.status="false"}} className={`text-warning fa-solid fa-star fa-2x`} id='star'></i></div>
                                :
                                <div><i onClick={()=>{addattribute();movie.status="false"}} className={`text-warning fa-regular fa-star fa-2x`} id='star'></i></div>)
                            }
                            
                        </div>
                      
                        </div>
                    </div>

                    <p className={`text-muted mt-3`}>{movie.overview}</p>
                    <div className='mb-3'>
                        <span className={`text-white ${style.title} `}>Date of release: </span><br />
                        <span className='text-muted px-3'>{movie.release_date}</span>
                    </div>
                    <span className={`text-white ${style.title}`}>Genres:</span>
                    <ul aria-label="Genres:"> 
                        {movie.genres.map((genre,i)=><li  key={i} className='mt-2 text-muted'>{genre.name}</li>)}
                    </ul>

                    <span className={`text-white ${style.title}`}>Average vote:</span>
                    <div className='mb-3 ' >
                        {
                            movie?getStars(movie.vote_average):""
    
                        }
                    </div>
                    {movie.homepage!==""?
                    <button className='btn btn-outline-info mt-5'><a href={movie.homepage} target="_blank">Home page</a></button>:""}
                   </div>
                   
                </div>
                </div>


             </div>
            :
            <div className={`${style.dark}  text-white d-flex justify-content-center align-items-center vh-100`}>
            <i className="fa-solid fa-spinner fa-3x fa-spin"></i>
            </div> 
        }
        </>
      )
}
