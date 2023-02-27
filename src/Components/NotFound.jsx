import React from 'react'
import style from '../Style/home.module.css'
import {  useNavigate } from 'react-router-dom';


export default function NotFound() {
  let navigate = useNavigate();
  return (
    <div className= {`row dark row mb-3 rounded-3 px-5 mt-10 `} >
        <div className='col-md-6 p-5 me-auto d-flex  align-items-center'>
           <div>
             <h1>Page not found!</h1>
           <div className="mt-1 bg-white  h-1px mb-5"></div>
              <h3 className='fa-bolder mb-4'>Hi space wanderer!</h3>
              <h5 className='text-muted mb-5'>It seems you lost in space...</h5>
              <button onClick={()=>navigate("/home")} className='btn btn-primary'>Back home ?</button>
          </div>
        </div>
        <div className='col-md-6 p-5 me-auto'>
        <img className={`w-100 ms-auto`} src={require('../Images/noPage.png')}  alt="" />
        </div>
    </div> 
  )
}
