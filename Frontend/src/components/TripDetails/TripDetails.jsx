import React, { useState } from 'react'
// import Footer from '../Footer/Footer'
import { useHistory } from 'react-router-dom';
import Joi from 'joi';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
const BASE_URL = process.env.REACT_APP_API_URI;


export default function TripDetails() {

    
  let history = useHistory();
  let [errorList , setErrorList] = useState([])
  let [error,setError] = useState('');
  let [loading,setLoading] = useState(false)

  
  const [trip, setTrip] = useState({
    from:'',
    to:'',
    TripDate:'',
    AvailableWeight:'',
    unAcceptablaPackage:'',
    TripTime:''

  });

  const handleChange = (e) => {
    let myTrip = {...trip};
    myTrip[e.target.name] = e.target.value;
    setTrip(myTrip);
  };



  let encodedToken = localStorage.getItem('userToken');
  let decodedToken = jwtDecode(encodedToken);
  let travelerVerification = decodedToken.travelerVerification;
  


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
    axios.post(`${BASE_URL}/v1/trips/add` ,trip,{ headers: {"Authorization" : `Bearer ${encodedToken}`} })
    .then(
      res => {
       
        setLoading(false);
        setError('');
        setErrorList([]);

       history.push('/trip')
        
      })
    .catch(err => {
      setLoading(false);
      console.log(err.response)
      let errorMessage = err.response.data.message;
     let errMsg =  errorMessage.replace(/['"]/g, '');
         setError (errMsg);
  }
  );
}

function validationUserForm(){
  let scheme = Joi.object({
  
    from: Joi.string().required(),
      to: Joi.string().required(),
      TripDate: Joi.date().greater(Date.now() - 24 * 60 * 60 * 1000).iso().messages({
        'date.format': `Date format is YYYY-MM-DD`,
        'date.min': `Date should not be passed`
      }).required(),
      TripTime: Joi.string().required(),
      AvailableWeight: Joi.number().required(),
      unAcceptablaPackage: Joi.string().required(),
  });
 return scheme.validate(trip,{abortEarly:false});

}

    return (
        <>

        <section >

        <div className="container">
        <div className="row mt-5 justify-content-center">
        <div className="col-lg-10">
        <h3 className='text-center fw-bold'><span style={{color:"#fd7402"}}>Trip</span>Details</h3>
        
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



    <section>

<div className="row mt-5 justify-content-center" data-aos="fade-up">
<div className="col-lg-10">
<form  className="dataform" onSubmit={submitForm}>
  <div className="row">
  <div className="col-md-6 pb-2 form-group">
        <label htmlFor="from" className='p-1'>From</label>
<select className='selector form-select '  name="from" onChange={handleChange} >
<option value="">Select</option>
              <option value="Alexandria">Alexandria</option>
              <option value="Aswan">Aswan</option>
              <option value="Asyut">Asyut</option>
              <option value="Beheira">Beheira</option>
              <option value="Beni Suef">Beni Suef</option>
              <option value="Cairo">Cairo</option>
              <option value="Dakahlia">Dakahlia</option>
              <option value="Damietta">Damietta</option>
              <option value="Faiyum">Faiyum</option>
              <option value="Gharbia">Gharbia</option>
              <option value="Giza">Giza</option>
              <option value="Ismailia">Ismailia</option>
              <option value="Kafr El Sheikh">Kafr El Sheikh</option>
              <option value="Luxor">Luxor</option>
              <option value="Matruh">Matruh</option>
              <option value="Minya">Minya</option>
              <option value="Monufia">Monufia</option>
              <option value="New Valley">New Valley</option>
              <option value="North Sinai">North Sinai</option>
              <option value="Port Said">Port Said</option>
              <option value="Qalyubia">Qalyubia</option>
              <option value="Qena">Qena</option>
              <option value="Red Sea">Red Sea</option>
              <option value="Sharqia">Sharqia</option>
              <option value="Sohag">Sohag</option>
              <option value="South Sinai">South Sinai</option>
              <option value="Suez">Suez</option>
    </select>
    </div>
    <div className="col-md-6 pb-2 form-group">
        <label htmlFor="to" className='p-1'>To</label>
    <select className='selector form-select '  name="to" onChange={handleChange} >
    <option value="">Select</option>
    <option value="Alexandria">Alexandria</option>
              <option value="Aswan">Aswan</option>
              <option value="Asyut">Asyut</option>
              <option value="Beheira">Beheira</option>
              <option value="Beni Suef">Beni Suef</option>
              <option value="Cairo">Cairo</option>
              <option value="Dakahlia">Dakahlia</option>
              <option value="Damietta">Damietta</option>
              <option value="Faiyum">Faiyum</option>
              <option value="Gharbia">Gharbia</option>
              <option value="Giza">Giza</option>
              <option value="Ismailia">Ismailia</option>
              <option value="Kafr El Sheikh">Kafr El Sheikh</option>
              <option value="Luxor">Luxor</option>
              <option value="Matruh">Matruh</option>
              <option value="Minya">Minya</option>
              <option value="Monufia">Monufia</option>
              <option value="New Valley">New Valley</option>
              <option value="North Sinai">North Sinai</option>
              <option value="Port Said">Port Said</option>
              <option value="Qalyubia">Qalyubia</option>
              <option value="Qena">Qena</option>
              <option value="Red Sea">Red Sea</option>
              <option value="Sharqia">Sharqia</option>
              <option value="Sohag">Sohag</option>
              <option value="South Sinai">South Sinai</option>
              <option value="Suez">Suez</option>
    </select>
</div>
    <div className="col-md-6 pb-2 form-group">
        <label htmlFor="TripDate" className='p-1'>Trip Date</label>
        <input onChange={handleChange}  type="date" name="TripDate" className="form-control" placeholder="Trip Date" required />
    </div>

    <div className="col-md-6 pb-2 form-group">
        <label htmlFor="TripTime" className='p-1'>Trip Time</label>
        <input onChange={handleChange}  type="time" name="TripTime" className="form-control" placeholder="Trip Time" required />
    </div>

    <div className="col-md-6 pb-2 form-group ">
      <label htmlFor="AvailableWeight"  className='p-1'>Available Weight</label>
      <input onChange={handleChange}  type="number" step="0.01" className="form-control" name="AvailableWeight"  placeholder="Available Weight" required />
    </div> 

    <div className="col-md-6 pb-2 form-group">
    <label htmlFor="unAcceptablaPackage" className='p-1'>unAcceptable Package</label>
    <input onChange={handleChange}  type="text" className="form-control" name="unAcceptablaPackage" placeholder="unAcceptable Package" required />
    </div>
  </div>

  <br />
  <div>
  <div className="text-center  ">
    {travelerVerification === true?
   <button className="formButton" type='submit' >{loading ?<i></i>:'ADD TRIP'}</button>
   :
   <>
   <button className="formButton" disabled >{loading ?<i></i>:'ADD TRIP'}</button>  
   <p style={{color:'red'}}>You are still not verified by admin</p>
   </>
  }
         
  </div>
  </div>

</form>
</div>
</div>

</section>

        </div>
       
     
        </div>
        
        </div>  
        </section>
    
        {/* <Footer/> */}
        </>
    )
  }

