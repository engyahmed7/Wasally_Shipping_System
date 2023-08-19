
import { Link } from 'react-router-dom'
import {useHistory } from 'react-router-dom';
import React, {useState} from 'react'
import Joi from 'joi';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URI;
export default function PasswordReset() {
    let history = useHistory();
    let [successMessage, setsuccessMessage] = useState('')
    let [errorList , setErrorList] = useState([])
    let [error,setError] = useState('');
    let [loading,setLoading] = useState(false);
    let [email,setEmail] = useState({
    email:''
    });
    const handleChange = (e) => {
      let myEmail = {...email};
      myEmail[e.target.name] = e.target.value;
      setEmail(myEmail);
    };
  
  

  

    async function formSubmit(e){
      e.preventDefault();
      let validationResponse = validationForm();
      console.log(validationResponse);
      if(validationResponse.error){ 
        setLoading(false)
        setErrorList(validationResponse.error.details)
        return;
      }
      
  
      setLoading(true);
       await axios.post(`${BASE_URL}/v1/auth/forgot-password`,email).then(
        res => {
            setsuccessMessage(res.data.message)
          setLoading(false);
          setError('');
          setErrorList([]);
         
          
        })
      .catch(err => {
        setLoading(false);
        setError(err.response.data.message);
        console.log(err)
    }
    );
  }
  
  function validationForm(){
    let scheme = Joi.object({
        email: Joi.string().email({ tlds: { allow: false } }).required(),
    });
   return scheme.validate(email,{abortEarly:false});
  }
  return (
    <>
    <div className="container">
        <div className="pt-5 row d-flex align-items-center justify-content-center">
            <div className="card text-center" style={{width: 300}}>
                <div className="card-header h5 orangeButton">Password Reset</div>
               
                {
        error &&
        <div className="alert alert-danger">
          {error}
        </div>
        }
        
                {
        successMessage &&
        <div className="alert alert-success">
          {successMessage}
        </div>
        }

{
  errorList.map((err,i)=>{
    return <div key={i} className="alert alert-danger">
    {err.message}
  </div>
  }
  )
}
                    <div className="card-body px-5">
                        <p className="card-text py-2">
                            Enter your email address and we'll send you an email with instructions to reset your password.
                        </p>
                        <form onSubmit={formSubmit}>
                        <div className="form-outline">
                          
                            <input onChange={handleChange} type="email" id="email" name='email' className="form-control my-3" />
                            <label className="form-label" htmlFor="typeEmail">Email input</label>

                        </div>
                        <button type="submit" className="btn btn-light orangeButton w-100">{loading ?<i className='fas fa-spinner fa-spin'></i>:'Reset password'}</button>
                        </form>
                        <div className="d-flex justify-content-between mt-4">
                            <Link style={{color:"#ff9416"}} to="Login" >Login</Link>
                            <Link style={{color:"#ff9416"}}  to="Register" >Register</Link>
                        </div>
                </div>
            </div>
        </div>

    </div>
   




    </>
  )
}
