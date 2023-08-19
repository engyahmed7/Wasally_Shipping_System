import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Joi from 'joi';
const BASE_URL = process.env.REACT_APP_API_URI;
export default function UpdateDetailsOfTrips  () {

  let encodedToken = localStorage.getItem('userToken');
  let history = useHistory();
  let [errorList , setErrorList] = useState([])
  let [error,setError] = useState('');
  let [loading,setLoading] = useState(false)
  
  const [trip, SetTrip] = useState([]);

  const [trips, SetTrips] = useState({
    to: trip.to,
    from:trip.from,
    TripDate:trip.TripDate,
    AvailableWeight:trip.AvailableWeight,
    unAcceptablaPackage:trip.unAcceptablaPackage,
    TripTime:trip.TripTime
  });


  const handleChange = (e) => {
    let Trip = {...trips};
    Trip[e.target.name] = e.target.value;
    SetTrips(Trip);
  };
 
async function submitForm(e){
    e.preventDefault();
    let validationResponse = validationRequestForm();
    console.log(validationResponse);
    if(validationResponse.error){ 
      setLoading(false)
      setErrorList(validationResponse.error.details)
      return;
    }
    
    
    setLoading(true);
    axios.put(`${BASE_URL}/v1/trips/update/`+tripId ,trips,{ headers: {"Authorization" : `Bearer ${encodedToken}`} })
    .then(
      res => {
       
        setLoading(false);
        setError('');
        setErrorList([]);

       history.push('/travelertrips')
        
      })
    .catch(err => {
      setLoading(false);
      let errorMessage = err.response.data.message;
     let errMsg =  errorMessage.replace(/['"]/g, '');
         setError (errMsg);
  }
  );
}

function validationRequestForm(){
    let scheme = Joi.object({
        from: Joi.string().optional().allow(''),
        to: Joi.string().optional().allow(''),
        TripDate: Joi.date().greater(Date.now() - 24 * 60 * 60 * 1000).iso().messages({
          'date.format': `Date format is YYYY-MM-DD`,
          'date.min': `Date should not be passed`
        }).optional().allow(''),
        TripTime: Joi.string().optional().allow(''),
        AvailableWeight: Joi.number().optional().allow(''),
        unAcceptablaPackage: Joi.string().optional().allow(''),
    });
   return scheme.validate(trips,{abortEarly:false});
  
  }


  const { tripId } = useParams();

  useEffect(() => {
    const fetch = async () => {
      axios.get(`${BASE_URL}/v1/trips/viewtrip/`+tripId,{ headers: {"Authorization" : `Bearer ${encodedToken}`} }).then(
      (response)=>{
          console.log("sss",response.data)
          SetTrip(response.data.trip)

      }
  ).catch(
      (error)=>{
          console.log(error)

      }
  ) 
    
      
    };
    fetch();
  }, []);

 
    return (
        <>
          {/* <form onSubmit={submitForm}>
        <section className="shippmentDetails">
            
        <div className="container">
        <div className="row">
        <div className="col-md-6 col-sm-12">
            <h3 className='text-center'>Details</h3>
            <section className="userForm">
     
     
   
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
        <div className="border">
     <div className="row g-3 align-items-center group">
 <div className="col-lg-4">
   <label htmlFor="from" className="col-form-label">From : </label>
 </div>
 <div className="col-lg-8">
   <input type="text" onChange={handleChange} className="form-control " name='from' placeholder='From'  defaultValue={trip.from} />
 </div>
 
</div>

<div className="row g-3 align-items-center group">
 <div className="col-lg-4">
   <label htmlFor="to" className="col-form-label">To : </label>
 </div>
 <div className="col-lg-8">
   <input type="text"   onChange={handleChange} className="form-control" name="to" placeholder='To'  defaultValue={trip.to} />
 </div>
</div>
</div>

<div className="row g-3 align-items-center group">
 <div className="col-lg-4">
   <label htmlFor="TripDate" className="col-form-label">Date : </label>
 </div>
 <div className="col-lg-8">
   <input type="text" onChange={handleChange}  className="form-control" placeholder='Date' name='TripDate' defaultValue={trip.TripDate ? trip.TripDate.split('T')[0] : "" } />
 </div> 
</div>
     
       </section>
        </div>
   

        <div className="col-md-6 col-sm-12">
        <h3 className='text-center'>Shopping Item</h3>
        <section className="userForm">
     
    
      <div className="row g-3 align-items-center group">
  <div className="col-lg-4">
    <label htmlFor="TripTime" className="col-form-label">Trip Time : </label>
  </div>
  <div className="col-lg-8">
    <input type="text" onChange={handleChange} className="form-control " name='TripTime' placeholder='time'  defaultValue={trip.TripTime} />
  </div>
  
</div>

<div className="row g-3 align-items-center group">
  <div className="col-lg-4">
    <label htmlFor="AvailableWeight" className="col-form-label">Available weight : </label>
  </div>
  <div className="col-lg-8">
    <input onChange={handleChange} type="text"  className="form-control" name="AvailableWeight" placeholder='Available Weight'  defaultValue={trip.AvailableWeight}  />
  </div>
</div>

<div className="row g-3 align-items-center group">
  <div className="col-lg-4">
    <label htmlFor="unAcceptablaPackage" className="col-form-label">UnAcceptable package: </label>
  </div>
  <div className="col-lg-8">
    <input type="text" onChange={handleChange}  className="form-control" name='unAcceptablaPackage' placeholder='unAcceptable Package'  defaultValue={trip.unAcceptablaPackage} />
  </div> 
</div>
        </section>
        </div>
        <div className="col-lg-12 text-center">
   
    <button  type='submit' >{loading ?<i className='fas fa-spinner fa-spin'></i>:'UPDATE'}</button>
    <br/>
    <Link to="/travelertrips"><button type='button' >BACK</button></Link>  
      </div>
        </div>
        </div>
        </section>
        </form> */}

                <section >

        <div className="container">
        <div className="row mt-5 justify-content-center">
        <div className="col-lg-10">
        <h3 className='text-center fw-bold'><span style={{color:"#fd7402"}}>Trip</span>Update</h3>
        
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
<select className='selector form-select '  name="from" onChange={handleChange} defaultValue={trip.from} >
<option value="">Select</option>
{trip.from === 'Alexandria' ? <option  value="Alexandria" selected >Alexandria</option>  : <option  value="Alexandria"  >Alexandria</option> }
    {trip.from === 'Aswan' ? <option  value="Aswan" selected >Aswan</option>  : <option  value="Aswan"  >Aswan</option> }
    {trip.from === 'Asyut' ? <option  value="Asyut" selected >Asyut</option>  : <option  value="Asyut"  >Asyut</option> }
    {trip.from === 'Beheira' ? <option  value="Beheira" selected >Beheira</option>  : <option  value="Beheira"  >Beheira</option> }
    {trip.from === 'Beni Suef' ? <option  value="Beni Suef" selected >Beni Suef</option>  : <option  value="Beni Suef"  >Beni Suef</option> }
    {trip.from === 'Cairo' ? <option  value="Cairo" selected >Cairo</option>  : <option  value="Cairo"  >Cairo</option> }
    {trip.from === 'Dakahlia' ? <option  value="Dakahlia" selected >Dakahlia</option>  : <option  value="Dakahlia"  >Dakahlia</option> }
    {trip.from === 'Damietta' ? <option  value="Damietta" selected >Damietta</option>  : <option  value="Damietta"  >Damietta</option> }
    {trip.from === 'Faiyum' ? <option  value="Faiyum" selected >Faiyum</option>  : <option  value="Faiyum"  >Faiyum</option> }
    {trip.from === 'Gharbia' ? <option  value="Gharbia" selected >Gharbia</option>  : <option  value="Gharbia"  >Gharbia</option> }
    {trip.from === 'Giza' ? <option  value="Giza" selected >Giza</option>  : <option  value="Giza"  >Giza</option> }
    {trip.from === 'Ismailia' ? <option  value="Ismailia" selected >Ismailia</option>  : <option  value="Ismailia"  >Ismailia</option> }
    {trip.from === 'Kafr El Sheikh' ? <option  value="Kafr El Sheikh" selected >Kafr El Sheikh</option>  : <option  value="Kafr El Sheikh"  >Kafr El Sheikh</option> }
    {trip.from === 'Luxor' ? <option  value="Luxor" selected >Luxor</option>  : <option  value="Luxor"  >Luxor</option> }
    {trip.from === 'Matruh' ? <option  value="Matruh" selected >Matruh</option>  : <option  value="Matruh"  >Matruh</option> }
    {trip.from === 'Minya' ? <option  value="Minya" selected >Minya</option>  : <option  value="Minya"  >Minya</option> }
    {trip.from === 'Monufia' ? <option  value="Monufia" selected >Monufia</option>  : <option  value="Monufia"  >Monufia</option> }
    {trip.from === 'New Valley' ? <option  value="New Valley" selected >New Valley</option>  : <option  value="New Valley"  >New Valley</option> }
    {trip.from === 'North Sinai' ? <option  value="North Sinai" selected >North Sinai</option>  : <option  value="North Sinai"  >North Sinai</option> }
    {trip.from === 'Port Said' ? <option  value="Port Said" selected >Port Said</option>  : <option  value="Port Said"  >Port Said</option> }
    {trip.from === 'Qalyubia' ? <option  value="Qalyubia" selected >Qalyubia</option>  : <option  value="Qalyubia"  >Qalyubia</option> }
    {trip.from === 'Qena' ? <option  value="Qena" selected >Qena</option>  : <option  value="Qena"  >Qena</option> }
    {trip.from === 'Red Sea' ? <option  value="Red Sea" selected >Red Sea</option>  : <option  value="Red Sea"  >Red Sea</option> }
    {trip.from === 'Sharqia' ? <option  value="Sharqia" selected >Sharqia</option>  : <option  value="Sharqia"  >Sharqia</option> }
    {trip.from === 'Sohag' ? <option  value="Sohag" selected >Sohag</option>  : <option  value="Sohag"  >Sohag</option> }
    {trip.from === 'South Sinai' ? <option  value="South Sinai" selected >South Sinai</option>  : <option  value="South Sinai"  >South Sinai</option> }
    {trip.from === 'Suez' ? <option  value="Suez" selected >Suez</option>  : <option  value="Suez"  >Suez</option> }
    
    </select>
    </div>
    <div className="col-md-6 pb-2 form-group">
        <label htmlFor="to" className='p-1'>To</label>
    <select className='selector form-select '  name="to" onChange={handleChange}  defaultValue={trip.to}>
    <option value="">Select</option>
    {trip.to === 'Alexandria' ? <option  value="Alexandria" selected >Alexandria</option>  : <option  value="Alexandria"  >Alexandria</option> }
    {trip.to === 'Aswan' ? <option  value="Aswan" selected >Aswan</option>  : <option  value="Aswan"  >Aswan</option> }
    {trip.to === 'Asyut' ? <option  value="Asyut" selected >Asyut</option>  : <option  value="Asyut"  >Asyut</option> }
    {trip.to === 'Beheira' ? <option  value="Beheira" selected >Beheira</option>  : <option  value="Beheira"  >Beheira</option> }
    {trip.to === 'Beni Suef' ? <option  value="Beni Suef" selected >Beni Suef</option>  : <option  value="Beni Suef"  >Beni Suef</option> }
    {trip.to === 'Cairo' ? <option  value="Cairo" selected >Cairo</option>  : <option  value="Cairo"  >Cairo</option> }
    {trip.to === 'Dakahlia' ? <option  value="Dakahlia" selected >Dakahlia</option>  : <option  value="Dakahlia"  >Dakahlia</option> }
    {trip.to === 'Damietta' ? <option  value="Damietta" selected >Damietta</option>  : <option  value="Damietta"  >Damietta</option> }
    {trip.to === 'Faiyum' ? <option  value="Faiyum" selected >Faiyum</option>  : <option  value="Faiyum"  >Faiyum</option> }
    {trip.to === 'Gharbia' ? <option  value="Gharbia" selected >Gharbia</option>  : <option  value="Gharbia"  >Gharbia</option> }
    {trip.to === 'Giza' ? <option  value="Giza" selected >Giza</option>  : <option  value="Giza"  >Giza</option> }
    {trip.to === 'Ismailia' ? <option  value="Ismailia" selected >Ismailia</option>  : <option  value="Ismailia"  >Ismailia</option> }
    {trip.to === 'Kafr El Sheikh' ? <option  value="Kafr El Sheikh" selected >Kafr El Sheikh</option>  : <option  value="Kafr El Sheikh"  >Kafr El Sheikh</option> }
    {trip.to === 'Luxor' ? <option  value="Luxor" selected >Luxor</option>  : <option  value="Luxor"  >Luxor</option> }
    {trip.to === 'Matruh' ? <option  value="Matruh" selected >Matruh</option>  : <option  value="Matruh"  >Matruh</option> }
    {trip.to === 'Minya' ? <option  value="Minya" selected >Minya</option>  : <option  value="Minya"  >Minya</option> }
    {trip.to === 'Monufia' ? <option  value="Monufia" selected >Monufia</option>  : <option  value="Monufia"  >Monufia</option> }
    {trip.to === 'New Valley' ? <option  value="New Valley" selected >New Valley</option>  : <option  value="New Valley"  >New Valley</option> }
    {trip.to === 'North Sinai' ? <option  value="North Sinai" selected >North Sinai</option>  : <option  value="North Sinai"  >North Sinai</option> }
    {trip.to === 'Port Said' ? <option  value="Port Said" selected >Port Said</option>  : <option  value="Port Said"  >Port Said</option> }
    {trip.to === 'Qalyubia' ? <option  value="Qalyubia" selected >Qalyubia</option>  : <option  value="Qalyubia"  >Qalyubia</option> }
    {trip.to === 'Qena' ? <option  value="Qena" selected >Qena</option>  : <option  value="Qena"  >Qena</option> }
    {trip.to === 'Red Sea' ? <option  value="Red Sea" selected >Red Sea</option>  : <option  value="Red Sea"  >Red Sea</option> }
    {trip.to === 'Sharqia' ? <option  value="Sharqia" selected >Sharqia</option>  : <option  value="Sharqia"  >Sharqia</option> }
    {trip.to === 'Sohag' ? <option  value="Sohag" selected >Sohag</option>  : <option  value="Sohag"  >Sohag</option> }
    {trip.to === 'South Sinai' ? <option  value="South Sinai" selected >South Sinai</option>  : <option  value="South Sinai"  >South Sinai</option> }
    {trip.to === 'Suez' ? <option  value="Suez" selected >Suez</option>  : <option  value="Suez"  >Suez</option> }
    
      
    </select>

</div>
    <div className="col-md-6 pb-2 form-group">
        <label htmlFor="TripDate" className='p-1'>Trip Date</label>
        <input type="date" onChange={handleChange}  className="form-control" placeholder='Date' name='TripDate' defaultValue={trip.TripDate ? trip.TripDate.split('T')[0] : "" } />
    </div>

    <div className="col-md-6 pb-2 form-group">
        <label htmlFor="TripTime" className='p-1'>Trip Time</label>
        <input onChange={handleChange}  type="text" name="TripTime" className="form-control" placeholder="Trip Time" defaultValue={trip.TripTime}  />
    </div>

    <div className="col-md-6 pb-2 form-group ">
      <label htmlFor="AvailableWeight"  className='p-1'>Available Weight</label>
      <input onChange={handleChange}  type="number" step="0.01" className="form-control" name="AvailableWeight"  placeholder="Available Weight" defaultValue={trip.AvailableWeight}  />
    </div> 

    <div className="col-md-6 pb-2 form-group">
    <label htmlFor="unAcceptablaPackage" className='p-1'>unAcceptable Package</label>
    <input onChange={handleChange}  type="text" className="form-control" name="unAcceptablaPackage" placeholder="unAcceptable Package" defaultValue={trip.unAcceptablaPackage}  />
    </div>


  </div>

  <br />
  <div>
        <div className="col-lg-12 text-center">
          <button className='formButton'  type='submit' >{loading ?<i className='fas fa-spinner fa-spin'></i>:'UPDATE'}</button>
    <br/>
    <br />
          <Link to="/travelertrips"><button className='formButton' type='button' >BACK</button></Link>  
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


        <Footer/>
        </>
    )
  }

