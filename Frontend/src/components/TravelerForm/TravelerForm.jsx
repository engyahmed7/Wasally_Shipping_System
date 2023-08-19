import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React, {useEffect, useState } from 'react'
import Footer from '../../components/Footer/Footer'
import { useHistory } from 'react-router-dom';
import Joi from 'joi';
const BASE_URL = process.env.REACT_APP_API_URI;
export default function TravelerForm()  {
 
  let history = useHistory();
  let [errorList , setErrorList] = useState([])
  let [error,setError] = useState('');
  let [loading,setLoading] = useState(false)
  const [profileData , setProfileDate] = useState([]);

  
  const [user, setUser] = useState({
    name: profileData.name,
    address:profileData.address,
    birthDate:profileData.birthDate,
    city:profileData.city,
    governorate:profileData.governorate

  });

  const handleChange = (e) => {
    let myUser = {...user};
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
  };



  let encodedToken = localStorage.getItem('userToken');
    let userData =  jwtDecode(encodedToken);

let userId = userData.id;
  async function submitForm(e){
    e.preventDefault();
  
    let validationResponse = validationUserForm();
    console.log(validationResponse);
    if(validationResponse.error){ 
      setLoading(false)
      setErrorList(validationResponse.error.details)
      return;
    }
    
    
    setLoading(true);
    axios.patch(`${BASE_URL}/v1/users/`+userId ,user,{ headers: {"Authorization" : `Bearer ${encodedToken}`} })
    .then(
      res => {
       
        setLoading(false);
        setError('');
        setErrorList([]);

       history.push('/profile2')
        
      })
    .catch(err => {
      setLoading(false);
      let errorMessage = err.response.data.message;
     let errMsg =  errorMessage.replace(/['"]/g, '');
         setError (errMsg);
  }
  );
}

function validationUserForm(){
  let scheme = Joi.object({
  
   
      name: Joi.string(),
      birthDate: Joi
        .date()
        .max('01-01-2003')
        .iso()
        .messages({
          'date.format': `Date format is YYYY-MM-DD`,
          'date.max': `Age must be 18+`
        }).optional().allow(''),
      city: Joi.string().optional().allow(''),
      governorate: Joi.string().optional().allow(''),
      address:Joi.string().optional().allow('')
  });
 return scheme.validate(user,{abortEarly:false});

}


  async function getProfile(){
    axios.get(`${BASE_URL}/v1/users/`+userId ,{ headers: {"Authorization" : `Bearer ${encodedToken}` } }).then(
        (response)=>{
            console.log(response.data)
            setProfileDate(response.data)

        }
    ).catch(
        (error)=>{
            console.log(error)

        }
    )
}
useEffect(() => {
  getProfile();
}, [])

    return (
      <>
    
        <section>
<div className="row mt-5 justify-content-center" data-aos="fade-up">

<div className="col-lg-10">
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




<form onSubmit={submitForm}  className="dataform">
  <div className="row">

    <h3 className='text-center'><span className='orange'>Update</span>Traveler info</h3>

    <div className="col-md-6 pb-2 form-group ">
    <label htmlFor="name" className='p-1'>Name:</label>
    <input onChange={handleChange} type="text" className="form-control" name="name" defaultValue={profileData.name} placeholder='Name'  />
    </div>

    <div className="col-md-6 pb-2 form-group ">
    <label htmlFor="address" className='p-1'>Address:</label>
    <input onChange={handleChange} type="text" className="form-control"  name='address' defaultValue={profileData.address} placeholder='Address'  />
    </div>

    <div className="col-md-6 pb-2 form-group ">
    <label htmlFor="birthDate" className='p-1'>BirthDate : </label>
    <input onChange={handleChange} type="date" className="form-control"name="birthDate" placeholder='Year-Month-Day' defaultValue={profileData.birthDate? profileData.birthDate.split('T')[0]:''}  />
    </div>

    <div className="col-md-6 pb-2 form-group ">
    <label htmlFor="city" className='p-1'> City Name : </label>
    <input onChange={handleChange} type="text" className="form-control" placeholder='City Name' name='city' defaultValue={profileData.city}  />
    </div>

    <div className="col-md-6 pb-2 form-group ">
    <label htmlFor="governorate" className='p-1'>Governorate: </label>
    <input onChange={handleChange} type="text" className="form-control" placeholder='Governate Name' name='governorate' defaultValue={profileData.governorate}  />
    </div>

  </div>

  {/* <div className="form-group pb-2 mt-3">
    <input type="text" className="form-control" name="subject" id="subject" placeholder="Subject" required />
  </div> */}

  <br />
  <div className="text-center  "><div><button type="submit" className="btn formButton">{loading ?<i className='fas fa-spinner fa-spin'></i>:'SAVE'}</button></div></div>
</form>
</div>
</div>

</section>




      <Footer/>
      </>
    )
  }








  
