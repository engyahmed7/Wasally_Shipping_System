import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import style from "./Register.module.css"
import {  motion as m } from "framer-motion"
import registimg from '../../assets/images/takeout_boxes.png'
const BASE_URL = process.env.REACT_APP_API_URI;
// import Footer from '../Footer/Footer'

export default function Register(props) {
  let history = useHistory();
  let [errorList , setErrorList] = useState([])
  let [error,setError] = useState('');
  let [loading,setLoading] = useState(false)
  let [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmpassword:'',
    phoneNumber:''

  });
  function getUser(e){
    let myUser = {...user};
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
   
  }
  async function formSubmit(e){
    e.preventDefault();
    let validationResponse = validationRegisterForm();
    console.log(validationResponse);
    if(validationResponse.error){ 
      setLoading(false)
      setErrorList(validationResponse.error.details)
      return;
    }

    setLoading(true);
    try{

  
     await axios.post(`${BASE_URL}/v1/auth/register`,user).then(
      res => {
       
        setLoading(false);
        setError('');
        setErrorList([]);

       history.push('/login')
        
      })
    .catch(err => {
      setLoading(false);
      let errorMessage = err.response.data.message;
     let errMsg =  errorMessage.replace(/['"]/g, '');
         setError (errMsg);
  }
  );
}catch(err){
  console.log("sorry",err)
}
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

const phoneNumber = (value, helpers) => {
  if (!value.match(/^(010|011|012|015)[0-9]{8}$/)) {
    return helpers.message('Invalid PhoneNumber number');
  }
  return value;
};

function validationRegisterForm(){
  let scheme = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email({ tlds: { allow: ['com', 'net'] } }).required(),
    password: Joi.string().required().custom(password),
    confirmpassword : Joi.string().required().valid(Joi.ref('password')).messages({'any.only': 'confirm password must be same as password'}),
    phoneNumber: Joi.string().custom(phoneNumber).required(),
  });
 return scheme.validate(user,{abortEarly:false});
}

  return (
    
    <>

    <div className=' container'> 
    <div className='row d-flex justify-content-center'> 

        <div className='col-md-6 d-flex justify-content-center align-items-center '>
                             <m.img
                        initial={{opacity:0 , x:20}}
                        whileInView={{opacity:1, x:0 ,type:'spring'}}
                        transition={{type:'tween',duration:1}}
                        className='img-thumbnail p-lg-0 border-0 image' src={ registimg } alt="profile img" />

          
         </div> 
          
         <div className='col-md-5 offset-m-1  py-4'>
         <m.h1
              initial={{opacity:0 , x:-20}}
              whileInView={{opacity:1, x:0 ,type:'spring'}}
              transition={{type:'tween',duration:1}}
          className={style.title}><span style={{ color: "#fd7402"}}>CREATE</span>  A NEW ACCOUNT</m.h1>
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
         <form onSubmit={formSubmit} className={style.userRegister}>

       

            <m.div
              initial={{opacity:0 , x:-5}}
              whileInView={{opacity:1, x:0 ,type:'spring'}}
              transition={{type:'tween',duration:1}}
             className='my-2'>
         
            <input onChange={getUser} type="text" className='form-control mb-4'placeholder="Enter Your Name"  name='name' />
            </m.div>


            <m.div
              initial={{opacity:0 , x:-10}}
              whileInView={{opacity:1, x:0 ,type:'spring'}}
              transition={{type:'tween',duration:1}}
             className='my-2'>
          
            <input onChange={getUser} type="email" className='form-control mb-4'placeholder="Enter Your Valid Email"  name='email' />
            </m.div>

            <m.div
              initial={{opacity:0 , x:-15}}
              whileInView={{opacity:1, x:0 ,type:'spring'}}
              transition={{type:'tween',duration:1}}
             className='my-2'>
          
            <input onChange={getUser} type="password" className='form-control mb-4'placeholder="Enter Password"  name='password' />
            </m.div>



            <m.div
              initial={{opacity:0 , x:-20}}
              whileInView={{opacity:1, x:0 ,type:'spring'}}
              transition={{type:'tween',duration:1}}
             className='my-2'>
            
            <input onChange={getUser} type="password" className='form-control mb-4'placeholder="Confirm Password"  name='confirmpassword' />
            </m.div>

            <m.div
              initial={{opacity:0 , x:-25}}
              whileInView={{opacity:1, x:0 ,type:'spring'}}
              transition={{type:'tween',duration:1}}
            className='my-2'>
            <input onChange={getUser} type="text" className='form-control mb-4'placeholder="Enter Your Phone Number"  name='phoneNumber' />
            </m.div>

            <div   className='mt-3 d-flex justify-content-center align-items-center flex-column'>
            <m.button
              initial={{opacity:0 , x:-30}}
              whileInView={{opacity:1, x:0 ,type:'spring'}}
              transition={{type:'tween',duration:1}}
             type="submit" className={style.test}>{loading ?<i className='fas fa-spinner fa-spin'></i>:'Register'} </m.button>
            <br />
            <span  className="login ">
                <Link className={style.Link} style={{color:"#fd7402"}} to="login" title="login" id="link-reset"> Already have account ? </Link>
             </span>
            </div>

         </form>
        </div>
      </div>  
        </div>

        {/* <Footer/> */}
    </>
  )
}