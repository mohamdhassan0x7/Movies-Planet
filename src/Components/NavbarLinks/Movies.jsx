import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import  axios  from 'axios';
import { Link } from 'react-router-dom';
import style from '../../Style/home.module.css'


export default function Movies() {
    
    let current =1;
    let nums =  new Array(13).fill(1).map((elme,index)=> index+1)
    const [movies, setmovies] = useState([])
    
    
let x=1;
async function getPage(pageNum)
{
    x= pageNum;
    localStorage.setItem("pagenum",x);
    let {data} = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=9b3a5414c1198ebced482e012a215ab5&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNum}`);
    setmovies(data.results);
    current = pageNum;
}


useEffect(() => {
  localStorage.getItem("pagenum")?getPage(localStorage.getItem("pagenum")):getPage(1);
}, [])





  return (
    <>
     {movies.length===0?
      <div className={`${style.dark}  text-white d-flex justify-content-center align-items-center vh-100`}>
          <i className="fa-solid fa-spinner fa-3x fa-spin"></i>
      </div>
    : <div className={`row ${style.dark} d-flex justify-content-center p-3 mb-3 rounded-3 mt-10`}>
    {
      movies.map((movie ,i)=>
      <div className="col-xlg-2 col-lg-3 col-md-4 col-sm-6 col-12 py-2 " key={i}>
        <Link to={`/moviedetails/${movie.id}`}>
          
          <div className='overflow-hidden '>
            <div className='position-relative text-center'>
              <p className={`${style.rate}`}>{Math.round(movie.vote_average * 10) / 10}</p>
            {movie.poster_path?
              <img className={`${style.movie} w-100 py-2`} src={`https://image.tmdb.org/t/p/w500`+movie.poster_path} alt="" />
              :
              <img className={`${style.movie} w-100 py-2`} src={require('../../Images/notfound2.jpg')}  alt="" />}
            </div>

          </div>
            <h6 className={`${style.homeTitle}`} >{movie.title}</h6>
        </Link>
      </div>
      )
    }
    </div> 
}


<nav aria-label="...">
  <ul className="pagination pagination-sm d-flex justify-content-center ">
  {nums.map((page ,i)=><li onClick={()=>{setmovies([]);getPage(page)}} key={i} className="page-item"><a  className={`${style.dark} ${style.pagy} page-link`}>{page}</a></li>)}
  </ul>
</nav>



 </>
  )
}
