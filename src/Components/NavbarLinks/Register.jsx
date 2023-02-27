import React from 'react'
import{useState} from 'react'
import  axios  from 'axios';
import Joi from 'joi';
import { useNavigate } from 'react-router-dom';

export default function Register() {

    let navigate = useNavigate();
    const [displayErrors, setDisplayErroes] = useState(true)
    const [loading, setLoading] = useState(false)
    const [ValidateErrors, setValidateErrors] = useState([])
    const [error, seterror] = useState('')
    const [user, setuser] = useState({
        first_name:'',
        last_name:'',
        age:0,
        email:'',
        password:''
    })

    function validation()
    {
      let scheme = Joi.object({
        first_name:Joi.string().alphanum().required(),
        last_name:Joi.string().alphanum().required(),
        age:Joi.number().min(16).max(75).required(),
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
          console.log(ValidateErrors)
        }
        else
        {
          let result = await axios.post("https://movie-db-notes-be-n7iv.vercel.app/api/v1/auth/signup", user)
          .catch(function (error) {
              if (error.response) {
                setDisplayErroes(true)
                seterror(error.response.data.message)
                setLoading(false);
              }
            });
          if (result?.data.message == "Done") {
            setLoading(false);
            navigate('/login')
          }
      }
       
        
    }

  return (
    <div className='mt-7 dark  rounded-3 row'>
      <div className='pe-0  col-md-5 ps-0   rounded-3 overflow-hidden'>
        <img className='w-100' src={require("../../Images/as (8).jpg")} alt="" />
      </div>
      <div className='col-md-7 d-flex align-items-center'>
        <form action="" className=' w-75 m-auto my-5 ' onSubmit={submitForm}>
        <div className='pb-5'>
            <h1 >Register</h1>
            <div className="mt-1 bg-white  h-1px "></div>
            </div>
          
        <div className=''>
            {displayErrors?ValidateErrors.map((error ,i)=> <div key={i} className=' alert alert-danger'>{error.message}</div>):''}
            {displayErrors? error? <div className=' alert alert-danger'>{error}</div> :'' :''}
            
            <label htmlFor="first_name">First name</label>
            <input onChange={saveData} className=' text-white form-control my-2 m-a bg-transparent' type="text" name='first_name' />

            <label htmlFor="last_name">Last name</label>
            <input onChange={saveData} className='text-white form-control my-2 m-a bg-transparent' type="text" name='last_name' />

            <label htmlFor="age">Age</label>
            <input  onChange={saveData} className='text-white form-control my-2 m-a bg-transparent' type="number" name='age' />

            <label htmlFor="email">E-mail</label>
            <input onChange={saveData} className='text-white form-control my-2 m-a bg-transparent' type="email" name='email' />

            <label htmlFor="password">password</label>
            <input onChange={saveData} className=' text-white form-control my-2 m-a bg-transparent' type="password" name='password'/>

            <button onChange={saveData} className='w-100 btn btn-primary my-2' type='submit'>
             {loading?<i className="fa-solid fa-spinner fa-spin w-100"></i>:<span>Submit</span>}
            </button>
            <button onClick={()=>navigate("/login")} className=' w-100 btn btn-success my-2 me-auto' type='submit'>Login</button>
            </div>
        </form>
        </div>
    </div>
  )
}
