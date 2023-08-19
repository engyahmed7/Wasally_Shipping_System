
import { Link } from 'react-router-dom'
import {useParams,useHistory } from 'react-router-dom';
import React, {useState} from 'react'
import Joi from 'joi';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URI;
export default function PasswordReset2() {
    const history = useHistory();
    let [errorList , setErrorList] = useState([])
    let [error,setError] = useState('');
    let [loading,setLoading] = useState(false);
    let [password,setPassword] = useState({
        password:''
    });
    const handleChange = (e) => {
      let myPassword = {...password};
      myPassword[e.target.name] = e.target.value;
      setPassword(myPassword);
    };
  
  
    let token = useParams().token;
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
   
       await axios.post(`${BASE_URL}/v1/auth/reset-password/${token}`,password).then(
        res => {
        console.log(res)
          setLoading(false);
          setError('');
          setErrorList([]);
          console.log('done')
          history.push('/login')
          
        })
      .catch(err => {
        setLoading(false);
        setError(err.response.data.message);
        console.log(err)
    }
    );
  }

  const passwordd = (value, helpers) => {
    if (value.length < 8) {
      return helpers.message('password must be at least 8 characters');
    }
    if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
      return helpers.message('password must contain at least 1 letter and 1 number');
    }
    return value;
  };
  
  function validationForm(){
    let scheme = Joi.object({
        password: Joi.string().required().custom(passwordd),
    });
   return scheme.validate(password,{abortEarly:false});
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
  errorList.map((err,i)=>{
    return <div key={i} className="alert alert-danger">
    {err.message}
  </div>
  }
  )
}
                    <div className="card-body px-5">
                        <p className="card-text py-2">
                            Enter your password to reset.
                        </p>
                        <form onSubmit={formSubmit}>
                        <div className="form-outline">
                          
                            <input onChange={handleChange} type="password" id="password" name='password' className="form-control my-3" />
                            <label className="form-label" htmlFor="password">New Password</label>

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
