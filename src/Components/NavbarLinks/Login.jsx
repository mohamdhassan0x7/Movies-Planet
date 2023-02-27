import React from 'react'
import{useState , useEffect} from 'react'
import  axios  from 'axios';
import Joi from 'joi';
import { useNavigate } from 'react-router-dom';

export default function Login(props) {
    let navigate = useNavigate();
    const [displayErrors, setDisplayErroes] = useState(true)
    const [loading, setLoading] = useState(false)
    const [ValidateErrors, setValidateErrors] = useState([])
    const [error, seterror] = useState('')
    const [user, setuser] = useState({
        email:'',
        password:''
    })

    function validation()
    {
      let scheme = Joi.object({
        email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
      })
      return scheme.validate(user , {abortEarly:false})
    }

    function saveData(e)
    {
        let myUser = {...user};
        myUser[e.target.name]=e.target.value;
        setuser(myUser); 
    }

    const [profile, setprofile] = useState()
    async function getProfile()
    {
     
      let {data} = await axios.get(`https://movie-db-notes-be-n7iv.vercel.app/api/v1/user/profile`,{
        headers:{
          authorization:localStorage.getItem("userToken"),
        }
      }).catch(function (error) {
        if (error.response) {
          
        }else
        {
          
        }
      });
      localStorage.setItem("profile",JSON.stringify(data.user))
      localStorage.setItem(["myMovies"],JSON.stringify([]))
      localStorage.setItem(["myTvshows"],JSON.stringify([]))
      data.user.movies.map((id)=>{getOneMovie(id)})
      data.user.tvShows.map((id)=>{getOneTv(id)})
      
    }

    const moviesList = new Array();
    const tvList = new Array();

    async function getOneMovie(id)
    {
      let {data} = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=9b3a5414c1198ebced482e012a215ab5&language=en-US`);
      moviesList.push(data)
      localStorage.setItem(["myMovies"],JSON.stringify(moviesList))
    }

    async function getOneTv(id)
    {
      let {data} = await axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=9b3a5414c1198ebced482e012a215ab5&language=en-US`);
      tvList.push(data)
      localStorage.setItem(["myTvshows"],JSON.stringify(tvList))
    }


    async function submitForm(e)
    {
        setValidateErrors([])
        seterror('')
        setDisplayErroes(false)
        setLoading(true);
        e.preventDefault();
        let validateResponse = validation(); 
        if(validateResponse.error)
        {
          setDisplayErroes(true)
          setLoading(false);
          setValidateErrors(validateResponse.error.details);
          //console.log(ValidateErrors)
        }
        else
        {
          let result = await axios.post("https://movie-db-notes-be-n7iv.vercel.app/api/v1/auth/signin", user)
          .catch(function (error) {
              if (error.response) {
                setDisplayErroes(true)
                seterror(error.response.data.message)
                setLoading(false);
              }
            });
            
          if (result?.data.message === "Done") {
            setLoading(false);
            let token = `test__`+ result.data.token;
            localStorage.setItem("userToken",token)
            //
            props.decodeToken();
            getProfile();
            

            navigate('/home')
          }
      }
        
    }

    

  return (
    <div className='mt-7 dark  rounded-3 row'>
      <div className='pe-0 col-lg-5 ps-0   rounded-3 overflow-hidden'>
        <img className='w-100' src={require("../../Images/as (7).jpg")} alt="" />
      </div>
     <div className=' col-lg-7 d-flex align-items-center'>
      <form action="" className=' w-75 m-auto my-5 ' onSubmit={submitForm}>
            <div className='pb-5'>
            <h1 >Sign in</h1>
            <div className="mt-1 bg-white  h-1px "></div>
            </div>
            <div className=''>
            {displayErrors?ValidateErrors.map((error ,i)=> <div key={i} className=' alert alert-danger'>{error.message}</div>):''}
            {displayErrors? error? <div className=' alert alert-danger'>{error}</div> :'' :''}

            <label htmlFor="email">E-mail</label>
            <input onChange={saveData} className='text-white form-control my-2  bg-transparent' type="email" name='email' />

            <label htmlFor="password">password</label>
            <input onChange={saveData} className='text-white form-control my-2  bg-transparent' type="password" name='password'/>

            <button onChange={saveData} className=' w-100 btn btn-primary my-2' type='submit'>
            {loading?<i className="fa-solid  fa-spinner fa-spin"></i>:<span>Submit</span>}
            </button>
            <button onClick={()=>navigate("/register")} className=' w-100 btn btn-danger my-2 me-auto' type='submit'>Signup</button>
            </div>
        </form>
        
     </div>
    </div>
  )
}
