import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import Footer from '../Footer/Footer'
const BASE_URL = process.env.REACT_APP_API_URI;
export default function AcceptOrDeclineTrip  () {

  let encodedToken = localStorage.getItem('userToken');
  const [isAccepted, setIsAccepted] = useState(false);
  const { tripId } = useParams();
  const history = useHistory();
  console.log("id"+ tripId)
  
  const [request, SetRequest] = useState({});
  useEffect(() => {
    const fetch = async () => {
      axios.get(`${BASE_URL}/v1/trips/viewtrip/`+tripId,{ headers: {"Authorization" : `Bearer ${encodedToken}`} }).then(
      (response)=>{
          console.log("sss",response.data)
          SetRequest(response.data.trip)

      }
  ).catch(
      (error)=>{
          console.log(error)

      }
  ) 
    
      
    };
    fetch();
  }, []);


  async function AcceptRequest() {
    axios.post(`${BASE_URL}/v1/requests/userAcceptTravelerRequest/${tripId}`,{isAccepted: true},{ headers: {"Authorization" : `Bearer ${encodedToken}`} }).then((response) => {
        console.log(response.message);
        setIsAccepted(true)
        history.push('/chat')
      })
      .catch((error) => {
        console.log(error);
      });
  }


    return (
        <>
<section >

<div className="container">
<div className="row mt-5 justify-content-center">
<div className="col-lg-10">
<h3 className='text-center fw-bold'><span style={{color:"#fd7402"}}>Accept</span>Trip</h3>

<section>

<div className="row mt-5 justify-content-center" data-aos="fade-up">
<div className="col-lg-10">
<form  className="dataform" >
<div className="row">
<div className="col-md-6 pb-2 form-group">
<label htmlFor="from" className='p-1'>From</label>
<input type="text"  className="form-control " name='from' placeholder='From'  defaultValue={request.from} readOnly />
</div>
<div className="col-md-6 pb-2 form-group">
<label htmlFor="to" className='p-1'>To</label>
<input type="text"    className="form-control" name="to" placeholder='To'  defaultValue={request.to} readOnly />
</div>
<div className="col-md-6 pb-2 form-group">
<label htmlFor="TripDate" className='p-1'>Trip Date</label>
<input type="date"   className="form-control" placeholder='Date' name='TripDate' defaultValue={request.TripDate ? request.TripDate.split('T')[0] : "" }  readOnly/>
</div>

<div className="col-md-6 pb-2 form-group">
<label htmlFor="TripTime" className='p-1'>Trip Time</label>
<input   type="text" name="TripTime" className="form-control" placeholder="Trip Time" defaultValue={request.TripTime} readOnly  />
</div>

<div className="col-md-6 pb-2 form-group ">
<label htmlFor="AvailableWeight"  className='p-1'>Available Weight</label>
<input   type="number" step="0.01" className="form-control" name="AvailableWeight"  placeholder="Available Weight" defaultValue={request.AvailableWeight}   readOnly/>
</div> 

<div className="col-md-6 pb-2 form-group">
<label htmlFor="unAcceptablaPackage" className='p-1'>unAcceptable Package</label>
<input   type="text" className="form-control" name="unAcceptablaPackage" placeholder="unAcceptable Package" defaultValue={request.unAcceptablaPackage} readOnly />
</div>


</div>

<br />
<div>
<div className="col-lg-12 text-center">

</div>
</div>
<div className='d-flex justify-content-center align-items-center flex-column'>
<button className='formButton'  onClick={AcceptRequest} type='button' >ACCEPT REQUEST</button>
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

