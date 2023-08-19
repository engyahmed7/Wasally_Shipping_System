import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import style from "./Login.module.css"
import {  motion as m } from "framer-motion"
import loginimg from '../../assets/images/truck.png'
import jwtDecode from 'jwt-decode';
const BASE_URL = process.env.REACT_APP_API_URI;


export default function Login  (props)  {
  // const [isConfirm, setIsConfirm] = useState(false);


  //   const SignUpGoogle = () => {
      
  //   axios.get(`${BASE_URL}/v1/auth/google`
  //      )
  //       .then(response => {
  //           setIsConfirm(true); 
  //           console.log(response)
           
  //       })
  //       .catch(error => {
  //         console.log(error);
  //       });
  //   }

 
    let history = useHistory();
    let [errorList , seterrorList]=useState([]);
    let [error,setError] = useState('');
    let [loading,setLoading] = useState(false)
    let [user , setUser]=useState({email:'',password:''});


     function getUser(e)
    {
        let myUser = {...user};
        myUser[e.target.name]=e.target.value;
        setUser(myUser);
    }

    async function formSubmit(e){
      e.preventDefault();
      let validationResponse = validationRegisterForm();
      console.log(validationResponse);
      if(validationResponse.error){ 
        setLoading(false)
        seterrorList(validationResponse.error.details)
        return;
      }
  
      setLoading(true);
      await axios.post(`${BASE_URL}/v1/auth/login`,user).then(
        res => {
         
          setLoading(false);
          setError('');
          seterrorList([]);
          localStorage.setItem('userToken',res.data.token)
          props.getUserInfo();
          // navigate('/request')
          // props.history.push('/request')
          const token = localStorage.getItem('userToken');
          let role  = token ? jwtDecode(token).role : null
          if(role === 'admin'){
            history.push('/admin')
          }
          else{
            history.push('/request')
          }
          
          
        })
      .catch(err => {
        setLoading(false);
        let errorMessage = err.response.data.message;
       let errMsg =  errorMessage.replace(/['"]/g, '');
           setError (errMsg);
    }
    );
  }

  const password = (value, helpers) => {
    if (value.length < 8) {
      return helpers.message('password must be at least 8 characters');
    }
    if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
      return helpers.message('password must contain at least 1 letter and 1 number');
    }
    return value;
  };

  function validationRegisterForm(){
    let scheme = Joi.object({
      email: Joi.string().email({ tlds: { allow: ['com', 'net'] } }).required(),
      password: Joi.string().required().custom(password),
    });
   return scheme.validate(user,{abortEarly:false});
  }

    return (
        <>

    <div className=' container'> 
      <div className="row d-flex justify-content-center">  
      <img style={{display:'none'}} className='loginimg-media img-thumbnail p-lg-0 border-0 image' src={ loginimg } alt="profile img" />
    
          <div className='col-md-5 offset-m-1  py-4'>
          <m.h1
            initial={{opacity:0 , x:20}}
            whileInView={{opacity:1, x:0 ,type:'spring'}}
            transition={{type:'tween',duration:1}}
          className={style.title}><span style={{ color: "#fd7402" }}>LOGIN</span>  NOW</m.h1>
          <br />
          {/* <div className='d-flex align-items-center flex-column'>
          <a href='http://localhost:3000/v1/auth/google' type="button" className={style.withgoogle} > Sign in with Google</a>
          </div> */}
          <br />
          <h6 className={style.h6}><span className={style.span}> SIGN IN WITH EMAIL</span></h6>

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
          
          <section className={style.userLogin}>
          <form onSubmit={formSubmit}>
              
              <m.div
                initial={{opacity:0 , x:-10}}
                whileInView={{opacity:1, x:0 ,type:'spring'}}
                transition={{type:'tween',duration:1}}
               className=''>
              <label htmlFor="email" className='mb-3 fw-bold ' >Email</label>
              <input onChange={getUser} type="email"   className='form-control  col-md-3 mb-4'placeholder="Enter your Valid Email"  name='email' />
              </m.div>

              <m.div
                initial={{opacity:0 , x:-20}}
                whileInView={{opacity:1, x:0 ,type:'spring'}}
                transition={{type:'tween',duration:1}}
              className=''>
              <label htmlFor="password" className='mb-3 fw-bold'>Password</label>
              <input onChange={getUser} type="password" className='form-control col-md-3 'placeholder="Enter your Password "  name='password' />

              <Link to="PasswordReset"title="Forgot" className={style.Link}><p style={{color:"#fd7402"}}   className='pb-5 pt-2 d-flex align-items-end flex-column 'href="no-javascript1.html" title="Forgot Password" id="link-reset">Forgot Password?</p></Link> 
              </m.div>

              <m.button
                initial={{opacity:0 , x:-30}}
                whileInView={{opacity:1, x:0 ,type:'spring'}}
                transition={{type:'tween',duration:1}}
               type="submit" className={style.test}>{loading ?<i className='fas fa-spinner fa-spin'></i>:'Login'} </m.button>

              <div className=' d-flex justify-content-center align-items-center flex-column  '>
              <br />
              <span className="register ">
                  <m.p style={{color:"#fd7402"}} className='mb-1'
                    initial={{opacity:0 }}
                    whileInView={{opacity:1, x:0 ,type:'spring'}}
                    transition={{type:'tween',duration:1}}
                  > Don't Have An Account Yet .</m.p>
                  <Link  style={{color:"#fd7402"}} className={style.Link} to="Register"title="register" id="link-reset"> <p style={{textAlign:"center"}}>Create An Account ?</p>    </Link>
              </span>

              {/* <button   type="button" className="btn btn-light "><i i className=" fab fa-google"></i> Login with google</button> */}
          </div>
          </form>
          </section>
          </div>
          
         <m.div
        initial={{opacity:0 ,x:-40 }}
        whileInView={{opacity:1, x:0 ,type:'spring'}}
        transition={{type:'tween',duration:1}}
          className='col-lg-6 d-flex justify-content-center align-items-center '>
          <img className='loginimg img-thumbnail p-lg-0 border-0 image' src={ loginimg } alt="profile img" />
         </m.div>
          </div>   
        </div>      
        </>
    );
}

