import React from 'react'
import style from '../../Style/home.module.css'
import { useEffect, useState } from 'react';
import  axios  from 'axios';
import { Link } from 'react-router-dom';


export default function 
(props) {

  const [myMovies, setmyMovies] = useState([])

  const [myTv, setmyTv] = useState([])

  const [user, setuser] = useState(null)

  async function removeMovieFromWishList(id)
  {
    const moviesList = myMovies ;
  
    for( var i = 0; i < moviesList.length; i++){ 
    
        if ( moviesList[i].id === id) { 
    
          moviesList.splice(i, 1); 
        }
    
    }
    localStorage.setItem(["myMovies"],JSON.stringify(moviesList))
    setmyMovies (JSON.parse(localStorage.getItem(["myMovies"])))

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


  async function removeTvFromWishList(id)
  {

    const tvList = JSON.parse(localStorage.getItem(["myTvshows"]));
  
    for( var i = 0; i < tvList.length; i++){ 
    
        if ( tvList[i].id === id) { 
    
          tvList.splice(i, 1); 
        }
    
    }
    localStorage.setItem(["myTvshows"],JSON.stringify(tvList))
    setmyTv (JSON.parse(localStorage.getItem(["myTvshows"]))) 
    let res = await axios.put("https://movie-db-notes-be-n7iv.vercel.app/api/v1/user/removeTvshow",{
      tvShowId:id}, {headers:{
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
    setuser (JSON.parse(localStorage.getItem("profile")))
    setmyMovies (JSON.parse(localStorage.getItem(["myMovies"])))
    setmyTv (JSON.parse(localStorage.getItem(["myTvshows"]))) 
  }, [])
  
  return (
    
    <div className={`${style.dark} row p-3 xsp-0 mt-10 mb-5 rounded-3 position-relative`}>

        <div className={`${style.bgprofile} col-lg-4 mb-3 rounded-3 usercard`}>
          {user?
          <>
          <div className='d-flex justify-content-center bg-white w-100 rounded-bottom p-2 text-muted'><h4>User card</h4></div>
          <div className=' userdata p-3'>
            <img className={` w-100 py-5`} src={require('../../Images/user1.png')}  alt="" />
            <div className='my-2'> <span className={`text-white  `}>First name: <span className={`${style.textprofile} px-3`}>{user?.first_name}</span></span></div>
            <div className='my-2'> <span className={`text-white  `}>Last name: <span className={`${style.textprofile} px-3`}>{user?.last_name}</span></span></div>
            <div className='my-2'> <span className={`text-white  `}>Age: <span className={`${style.textprofile} px-3`}>{user?.age}</span></span></div>
            <div className='my-2'> <span className={`text-white  `}>E-mail:</span><br /><span className={`${style.textprofile}`}>{user?.email}</span></div>
          </div>
          </>
          :
          <div className={`text-white d-flex justify-content-center p-3 align-items-center`}>
            <i className="fa-solid fa-spinner fa-3x fa-spin"></i>
          </div> 
          }
        </div>
        <div className={`col-lg-1 rounded-3`}></div>


        
        <div className={`${style.bgwlist} col-lg-7 rounded-3`}>
        <div className='d-flex justify-content-center bg-white w-100 rounded-bottom p-2 text-muted'><h4>Watch List</h4></div>

          <div className='mt-5'>
            
            <div class="accordion" id="accordionExample ">
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingOne">
                  <button class={`accordion-button text-muted`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Movies
                  </button>
                </h2>
                <div id="collapseOne" class={`accordion-collapse ${style.bgprofile} collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample`}>
                  <div class=" row accordion-body">
                  
                    {myMovies.length?
                      myMovies.map((movie,i)=>
                      <div className=" d-flex col-md-4 col-sm-6 col-12 py-2 text-center " key={i}>
                       <div className='bg-white rounded-3 p-1'>
                       <button onClick={()=>removeMovieFromWishList(movie.id)} className='btn btn-outline-danger w-100 mb-1'>
                              <i class="fa-solid fa-trash"></i>
                              </button>
                       <Link to={`/moviedetails/${movie.id}`}>
                          
                          <div className='overflow-hidden '>
                            <div className='position-relative text-center'>
                              <p className={`${style.rate}`}>{Math.round(movie.vote_average * 10) / 10}</p>
                              {movie.poster_path?
                              <img className={`${style.movie} w-100 py-2`} src={`https://image.tmdb.org/t/p/w500`+movie.poster_path} alt="" />
                              :
                              <img className={`${style.movie} w-100 py-2`} src={require('../../Images/notfound2.jpg')}  alt="" />
                              }
                            </div>

                          </div>

                            <h6 className={`${style.titleSmall} text-muted`} >{movie.title}</h6>
                            

                        </Link>
                        
                       </div>
                      </div>
                      ):(<div className=' d-flex justify-content-center'>
                      <img className='w-50' src={require("../../Images/noresult.png")} alt="" />
                    </div>)
                    }
                  </div>
                </div>
              </div>

              <div class="accordion-item">
              <h2 class="accordion-header" id="headingTwo">
                <button class="accordion-button collapsed text-muted" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  Tv shows
                </button>
              </h2>
              <div id="collapseTwo" class={`accordion-collapse ${style.bgprofile} collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample`}>
                <div class="row accordion-body">
                {
                myTv.length?
                      myTv.map((tv,i)=>
                      <div className="d-flex col-md-4 col-sm-6 col-12 py-2 text-center " key={i}>
                         <div className='bg-white rounded-3 p-1'>
                       <button onClick={()=>removeTvFromWishList(tv.id)} className='btn btn-outline-danger w-100 mb-1'>
                       <i class="fa-solid fa-trash"></i>
                       </button>
                        <Link to={`/tvdetails/${tv.id}`}>
                          
                          <div className='overflow-hidden '>
                            <div className='position-relative text-center'>
                              <p className={`${style.rate}`}>{Math.round(tv.vote_average * 10) / 10}</p>
                              {tv.poster_path?
                              <img className={`${style.movie} w-100 py-2`} src={`https://image.tmdb.org/t/p/w500`+tv.poster_path} alt="" />
                              :
                              <img className={`${style.movie} w-100 py-2`} src={require('../../Images/notfound2.jpg')}  alt="" />
                              }
                            </div>

                          </div>
                            <h6 className={`${style.titleSmall} text-muted`} >{tv.name}</h6>
                        </Link>
                      </div>
                      </div>
                      ):(<div className=' d-flex justify-content-center'>
                        <img className='w-50' src={require("../../Images/noresult.png")} alt="" />
                      </div>)
                    }
                </div>
              </div>
            </div>



            </div>

          </div>




        </div>









    </div>
  )
}
