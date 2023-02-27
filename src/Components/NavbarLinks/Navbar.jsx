import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { useEffect } from 'react';
import  axios  from 'axios';
import style from '../../Style/home.module.css'
import { Navigate, useNavigate } from 'react-router-dom';



export default function (props) {

  
  let navigate = useNavigate();
  const [keyWord, setkeyWord] = useState(null);
  const [movieSearchResult, setMoviesearchResult] = useState([])
  const [tvSearchResult, setTvsearchResult] = useState([])
  const [personsSearchResult, setpersonsSearchResult] = useState([])

function getKeyword(e)
{
  setMoviesearchResult([]);
  setTvsearchResult([])
  setkeyWord(e.target.value);
}

const [noMovies, setnoMovies] = useState()
const [noTv, setnoTv] = useState()
const [noPersons, setnoPersons] = useState()

async function getSearchTv(keyWord)
{
    let {data} = await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=9b3a5414c1198ebced482e012a215ab5&query=${keyWord}`);
    if(data.results.length === 0)
    {
      setnoTv(true);
      setTvsearchResult([]);
    }
    else
    {
      setnoTv(false);
      setTvsearchResult(data.results); 
    }
}


async function getPersons(keyWord)
{
    let {data} = await axios.get(`https://api.themoviedb.org/3/search/person?api_key=9b3a5414c1198ebced482e012a215ab5&language=en-US&page=1&include_adult=false&query=${keyWord}`);
    if(data.results.length === 0)
    {
      setnoPersons(true);
      setpersonsSearchResult([]);
    }
    else
    {
      setnoPersons(false);
      setpersonsSearchResult(data.results); 
    }
}

async function getSearchMovies(keyWord)
{
    let {data} = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=9b3a5414c1198ebced482e012a215ab5&query=${keyWord}`);
    if(data.results.length === 0)
    {
      setnoMovies(true);
      setMoviesearchResult([]);
    }
    else
    {
      setnoMovies(false);
      setMoviesearchResult(data.results); 
    }
}

window.addEventListener('click', function(e){   
  if (document.getElementById('sBox')?.contains(e.target)){
    // Clicked in box
  } else{
    setkeyWord(null);
    if(document.getElementById('enter'))
      document.getElementById('enter').value="";
  }
  
});
useEffect(() => {
  if(keyWord)
  {
    getSearchTv(keyWord);
    getSearchMovies(keyWord);
    getPersons(keyWord)
  }
}, [keyWord])

function popout()
{
  props.logout();
}

  return (
    <div className='mb-2 '>
    <nav className="navbar navbar-expand-lg navy ">
    <div className="container ">
    <div>
    <Link className="navbar-brand fa-2x  xs-hide mx-3" to="home">PLANET</Link>
    </div>
    
    {props.userData?
      <div  className="navSearch d-flex align-items-center order-lg-0 order-first " id='sBox'>
       <div className='position-relative '>
       <input  onChange={getKeyword} className='form-control bg-transparent text-white ' placeholder='Search ...' type="text" name='keyWord'  id='enter'/>
        {keyWord?
          <div className=' row pt-3 position-absolute search-banner w-200 myborder rounded-4 vh-75 mb-5 border-1 xs-searchres'>
            <div className=' close-button position-fixed mb-2'>
              <button onClick={()=>{setkeyWord(null)}} type="button" class=" btn-close btn-close-white" aria-label="Close"></button>
            </div>


            <div class="accordion accordion-flush" id="accordionFlushExample">
              <div class="accordion-item bg-transparent">
                <h2 class="accordion-header" id="flush-headingOne">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                  Movies result:
                  </button>
                </h2>
                <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                  <div class="accordion-body p-0 pt-1">
                      <div className='col-12 moviess'>
                            {(noMovies)?
                              (<div >
                                <img className='w-75' src={require("../../Images/noresult.png")} alt="" />
                              </div>)
                            :
                            ((movieSearchResult.length===0)?
                              ( <div className={` text-white d-flex justify-content-center align-items-center vh-100`}>
                                    <i className="fa-solid fa-spinner fa-3x fa-spin"></i>
                                </div>)
                              : 
                                (<div className={`row d-flex justify-content-center p-1 mb-3 rounded-3 overflow-auto `}>

                                  {
                                    movieSearchResult.map((movie ,i)=>
                                    <div className="col-md-3 d-flex xs-searchposter" key={i}>
                                    <div className='bg-white w-100 rounded-3 p-1 mb-2'>
                                    <Link to={`/moviedetails/${movie.id}`} onClick={()=>{setkeyWord(null)}}>
                                        
                                        <div className='overflow-hidden xs-hide'>
                                          <div className='position-relative text-center'>
                                            <p className={`${style.rate}`}>{Math.round(movie.vote_average * 10) / 10}</p>
                                          {movie.poster_path?
                                            <img className={`${style.movie} w-100 py-2`} src={`https://image.tmdb.org/t/p/w500`+movie.poster_path} alt="" />
                                            :
                                            <img className={`${style.movie} w-100 py-2`} src={require('../../Images/notfound2.jpg')}  alt="" />}
                                          </div>

                                        </div>
                                          <h6 className={`mt-1 ${style.titlesearch} text-muted`} >{movie.title}</h6>
                                      </Link>
                                    </div>
                                    </div>
                                    )
                                  }
                              </div>)) 
                            }

                      </div>
                  </div>
                </div>
              </div>








              <div class="accordion-item bg-transparent">
                <h2 class="accordion-header" id="flush-headingTwo">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                  Tv shows result:
                  </button>
                </h2>
                <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                  <div class="accordion-body p-0 pt-1">
                  
                  
            <div className='col-12 tvss'>
        
            {(noTv)?
              (<div >
                <img className='w-75' src={require("../../Images/noresult.png")} alt="" />
              </div>)
            :
            
            ((tvSearchResult.length===0)?
                (<div className={` text-white d-flex justify-content-center align-items-center vh-100`}>
                    <i className="fa-solid fa-spinner fa-3x fa-spin"></i>
                </div>)
              : 
              (<div className="row d-flex justify-content-center p-1 mb-3 rounded-3 overflow-auto">
               
                {
                  tvSearchResult.map((movie ,i)=>
                  <div className="col-md-3 d-flex xs-searchposter" key={i}>
                    <div className='bg-white w-100 rounded-3 p-1 mb-2'>
                    <Link to={`/tvdetails/${movie.id}`} onClick={()=>{setkeyWord(null)}}>
                      
                      <div className='overflow-hidden xs-hide '>
                        <div className='position-relative text-center'>
                          <p className={`${style.rate}`}>{Math.round(movie.vote_average * 10) / 10}</p>
                        {movie.poster_path?
                          <img className={`${style.movie} w-100 py-2`} src={`https://image.tmdb.org/t/p/w500`+movie.poster_path} alt="" />
                          :
                          <img className={`${style.movie} w-100 py-2`} src={require('../../Images/notfound2.jpg')}  alt="" />}
                        </div>

                      </div>
                        <h6 className={`mt-1 ${style.titlesearch} text-muted`} >{movie.name}</h6>
                    </Link>
                    </div>
                  </div>
                  )
                }
              </div>) )
            }

            </div>
               
                  </div>
                </div>
              </div>




              <div class="accordion-item bg-transparent">
                <h2 class="accordion-header" id="flush-headingThree">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                  Artists result:
                  </button>
                </h2>
                <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                  <div class="accordion-body p-0 pt-1">
                  
                  
            <div className='col-12 tvss'>
        
            {(noPersons)?
              (<div >
                <img className='w-75' src={require("../../Images/noresult.png")} alt="" />
              </div>)
            :
            
            ((personsSearchResult.length===0)?
                (<div className={` text-white d-flex justify-content-center align-items-center vh-100`}>
                    <i className="fa-solid fa-spinner fa-3x fa-spin"></i>
                </div>)
              : 
              (<div className="row d-flex justify-content-center p-1 mb-3 rounded-3 overflow-auto">
               
                {
                  personsSearchResult.map((person ,i)=>
                  <div className="col-md-3 d-flex xs-searchposter" key={i}>
                    <div className='bg-white w-100 rounded-3 p-1 mb-2'>
                    <Link to={`/persondetails/${person.id}`} onClick={()=>{setkeyWord(null)}}>
                      
                      <div className='overflow-hidden xs-hide '>
                        <div className='position-relative text-center'>
            
                        {person.profile_path?
                          <img className={`${style.movie} w-100 py-2`} src={`https://image.tmdb.org/t/p/w500`+person.profile_path} alt="" />
                          :
                          <img className={`${style.movie} w-100 py-2`} src={require('../../Images/notfound2.jpg')}  alt="" />}
                        </div>

                      </div>
                        <h6 className={`mt-1 ${style.titlesearch} text-muted`} >{person.name}</h6>
                    </Link>
                    </div>
                  </div>
                  )
                }
              </div>) )
            }

            </div>
               
                  </div>
                </div>
              </div>







          </div>
  
</div>:""
        }
       </div>
      </div>
      :""}


    <button className="navbar-toggler navdark ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon text-white"><i class="fa-solid fa-caret-down"></i></span>
    </button>
   
    
    <div className="collapse navbar-collapse" id="navbarNav">
      {props.userData?
      <>
      <ul className="navbar-nav d-flex justify-content-center align-items-center">
        
        <li className="nav-item" >
          <Link className="nav-link active navytext" aria-current="page" to="home" >Home</Link>
        </li>
        <li className="nav-item" >
          <Link className="nav-link active navytext" aria-current="page" to="movies">Movies</Link>
        </li>
        <li className="nav-item" >
          <Link className="nav-link active navytext" aria-current="page" to="tvs">TV Shows</Link>
        </li>
      </ul>
      </>:""
      }
      <ul className="navbar-nav ms-auto  order-lg-last">
      {props.userData?
      <>
        <div className='   d-flex justify-content-center align-items-center mx-3  '>
          <div className='bg-white p-2 rounded-3 texticon'>
          <li className='d-flex align-items-center flex-column navytext ' onClick={ ()=>navigate('/profile')}>
            <i class=" fa-solid fa-user-astronaut  icon-size navytext"></i>
             <span className=''>{props.userData.user.first_name}</span> 
          </li>
          </div>
        </div>
        <li className="nav-item d-flex justify-content-center align-items-center">
          <Link  className="nav-link active navytext " aria-current="page">



                <button type="button" className="btn text-white navytext" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                  Logout
                </button>


                <div className={`modal fade pop`} id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                  <div className="modal-dialog">
                    <div className={`modal-content ${style.dark} borderpop `}>


                      <div className="modal-header ">
                        <h1 className="modal-title fs-5 text-danger " id="staticBackdropLabel">Warning</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>

                      <div className="modal-body text-bg-dark">
                        hey {props.userData.user.first_name}, Sure you want to leave the planet?
                      </div>

                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button onClick={()=>{popout();}} type="button" className="btn btn-danger" data-bs-dismiss="modal">Logout</button>
                      </div>
                    </div>
                  </div>
                </div>







          </Link>
        </li>
      </>
     : 
      <>
       <li className="nav-item">
          <Link className="nav-link active navytext" aria-current="page" to="login">Login</Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link active navytext" aria-current="page" to="register">Register</Link>
        </li>
      </>
 } 
        
      <li className="nav-item d-flex align-items-center justify-content-start py-2 order-lg-first mx-auto">
        <a target="_blank" href="https://www.facebook.com/Mohamdhssaan/" ><i className="fa-brands fa-facebook fa-1x mx-2 navytext"></i></a>
        <a target="_blank" href="https://www.linkedin.com/in/mohamed-hassan-4a0461209/" ><i class="fa-brands fa-linkedin fa-1x mx-2 navytext"></i></a>
        <a target="_blank" href="https://github.com/mohamdhassan0x7" ><i class="fa-brands fa-github fa-1x mx-2 navytext"></i></a>
      </li>

      </ul>
    </div>

  </div>
</nav>
    </div>
  )
}
