import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import style from '../../Style/home.module.css'
import { Link } from 'react-router-dom';

export default function PersonDetails() {
    let param = useParams();
    const [person, setperson] = useState(null)
    const [movies, setmovies] = useState([])

    async function getperson()
    {
        let {data} = await axios.get(`https://api.themoviedb.org/3/person/${param.id}?api_key=9b3a5414c1198ebced482e012a215ab5&language=en-US`)
        setperson(data)
    }
    async function getWorks()
    {
        let {data} = await axios.get(`https://api.themoviedb.org/3/person/${param.id}/movie_credits?api_key=9b3a5414c1198ebced482e012a215ab5&language=en-US`)
        setmovies(data.cast.splice(0,12))
    }

    useEffect(() => {
        getperson();
        getWorks();
    }, [])
    
    return (
        <>
        {
            person?
            <div className={`${style.dark}  p-3 mt-10 mb-5 rounded-3 position-relative`}>
            <div className='row'>
                <div className={`col-lg-4 rounded-3 mb-3`}>
                    {
                        person.profile_path?
                        <img className={`w-100`} src={`https://image.tmdb.org/t/p/w500`+person.profile_path}/>
                        :
                        <img className={`w-100 py-2`} src={require('../../Images/avatar.png')}  alt="" />
                    }
                </div>
                <div className="col-1">
                </div>
                <div className="col-lg-6">
                    <div>
                   <div className={`rounded-3 mb-3`}>
                        <h3>{person.name}</h3>
                    </div>
                    <span className={`text-white ${style.title} mb-2`}>Gender:</span>{person.gender===2?<span className={`text-muted mt-3 mx-3`}>Male</span>:<span className={`text-muted mt-3 mx-3`}>Female</span>}<br />
                   <div className='mb-3 mt-3'>
                   <span className={`text-white ${style.title} mb-2`}>Department:</span><span className={`text-muted mt-3 mx-3`}>{person.known_for_department}</span><br />
                   </div>
                   <div className='mb-3'>
                    <span className={`text-white ${style.title} mb-2`}>Date of birth:</span><br /><span className={`text-muted mt-3 mx-3`}>{person.birthday}</span><br />
                    </div>
                    <div className='mb-3'>
                    <span className={`text-white ${style.title} mb-2`}>Place of birth:</span><br /><span className={`text-muted mt-3 mx-3`}>{person.place_of_birth}</span><br />
                    </div>
                    </div> 
                </div>
            </div>
            
            <div>

            {movies.length!==0?
            <div className='mt-5 mb-2 '>
            <span className={`text-white fa-2x ${style.title}`}>Most popular movies:</span><br />
            </div>:""}
                        {
                        movies?
                            <div className={`row ${style.dark} p-3 mb-3 rounded-3  ` }>
                            {
                            movies.map((movie ,i)=>
                                <div className="col-lg-2 col-sm-4 col-12 py-2" key={i}>
                                    <Link to={`/moviedetails/${movie.id}`}>
                                        <div className='overflow-hidden '>
                                            <div className='position-relative text-center'>
                                            <p className={`${style.rate}`}>{Math.round(movie.vote_average * 10) / 10}</p>
                                            {
                                                movie.poster_path?
                                                <img className={`${style.movie} w-100 py-2`} src={`https://image.tmdb.org/t/p/w500`+movie.poster_path} alt="" />
                                            :
                                            <img className={` w-100 py-2`} src={require('../../Images/notfound2.jpg')}  alt="" />
                                            }
                                            </div>
                                        </div>
                                        <h6 className={`${style.titleSmall}`} >{movie.title}</h6>
                                    </Link>
                                </div>
                                )
                            }  
                        </div> 
                        :
                        <div className={`${style.dark}  text-white d-flex justify-content-center align-items-center vh-100`}>
                            <i className="fa-solid fa-spinner fa-3x fa-spin"></i>
                            </div>  
                    }
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
