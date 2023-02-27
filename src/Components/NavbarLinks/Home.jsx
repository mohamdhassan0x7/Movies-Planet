import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import  axios  from 'axios';
import { Link } from 'react-router-dom';
import style from '../../Style/home.module.css'

export default function Home() {

const [movies, setmovies] = useState([])
const [tv, settv] = useState([])
const [people, setpeople] = useState([])


 async function callApi(media , callback){
  let {data} = await axios.get(`https://api.themoviedb.org/3/trending/${media}/week?api_key=9b3a5414c1198ebced482e012a215ab5`);
  callback(data.results.splice(0,10));
}


useEffect(() => {
  callApi("movie",setmovies);
  callApi("tv",settv);
  callApi("person",setpeople);
}, [])


  return (
    <>
    {movies.length===0?
      <div className={`${style.dark}  text-white d-flex justify-content-center align-items-center vh-100`}>
          <i className="fa-solid fa-spinner fa-3x fa-spin"></i>
      </div>
    : <div className={`row ${style.dark} p-3 mb-3 rounded-3 mt-10 ` }>

    <div className='col-lg-4 col-md-8 col-12  d-flex align-items-center'>
        <div>
          <div className="mt-5 bg-white w-25 h-1px "></div>
          <h1 className='mt-3 mb-3'>
            Trending <br></br> Movies <br /> to watch now
          </h1>
          <h4 className='text-muted mb-3'>
            most watched movies by days
          </h4>
          <div className="mb-5 bg-white h-1px "></div>
      </div>
    </div>
    {
      movies.map((movie ,i)=>
      <div className="col-lg-2 col-md-4 col-sm-6 col-12 py-2 " key={i}>
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
            <h6 className={`${style.homeTitle}`} >{movie.title}</h6>
        </Link>
      </div>
      )
    }
    </div> 
}
      
{tv.length===0?
      <div className={`${style.dark} text-white d-flex justify-content-center align-items-center vh-100`}>
          <i className="fa-solid fa-spinner fa-3x fa-spin"></i>
      </div>
    :
      <div className={`row ${style.dark} p-3 mb-3 rounded-3`}>

        <div className='col-lg-4 col-md-8 col-12  d-flex align-items-center'>
            <div>
              <div className="mt-5 bg-white w-25 h-1px "></div>
              <h1 className='mt-3 mb-3'>
                Trending <br></br> Tv shows <br /> to watch now
              </h1>
              <h4 className='text-muted mb-3'>
                most watched tv shows by days
              </h4>
              <div className="mb-5 bg-white h-1px "></div>
          </div>
        </div>


      {
        tv.map((tv ,i)=>
        <div className="col-lg-2 col-md-4 col-sm-6 col-12 py-2" key={i}>
          <Link to={`/tvdetails/${tv.id}`}>
            <div className='overflow-hidden'>
              <div className='position-relative text-center'>
                <p className={`${style.rate}`}>{Math.round(tv.vote_average * 10) / 10}</p>
                <img className={`${style.movie} w-100 py-2`} src={`https://image.tmdb.org/t/p/w500`+tv.poster_path} alt="" />
              </div>
            </div>
              <h6 className={`${style.homeTitle}`} >{tv.name}</h6>
          </Link>
        </div>
        )
      }
    </div>
}

{people.length===0?
      <div className={`${style.dark} text-white d-flex justify-content-center align-items-center vh-100`}>
          <i className="fa-solid fa-spinner fa-3x fa-spin"></i>
      </div>
    :
       <div className={`row ${style.dark} p-3 mb-3 rounded-3`}>

        <div className='col-lg-4 col-md-8 col-12  d-flex align-items-center'>
            <div>
              <div className="mt-5 bg-white w-25 h-1px "></div>
              <h1 className='mt-3 mb-3'>
                Trending <br></br> Artists <br /> to follow
              </h1>
              <h4 className='text-muted mb-3'>
                most followed stars by days
              </h4>
              <div className="mb-5 bg-white h-1px "></div>
          </div>
        </div>


      {
        people.map((people ,i)=>
        <div className="col-lg-2 col-md-4 col-sm-6 col-12 py-2 " key={i}>
          <Link to={`/persondetails/${people.id}`}>
            <div className='overflow-hidden'>
            <div className='position-relative'>
               
                <img className={`${style.movie} w-100 py-2`} src={`https://image.tmdb.org/t/p/w500`+people.profile_path} alt="" />
              </div>
            </div>
              <h6 className={`${style.homeTitle}`} >{people.name}</h6>
          </Link>
        </div>
        )
      }
    </div> 
}   

    </>
  )
}
