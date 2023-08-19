import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Footer from '../Footer/Footer'
// import Navbar from '../Navbar/Navbar'
const BASE_URL = process.env.REACT_APP_API_URI;
export default function DetailsOfShippmentUser  () {

  let encodedToken = localStorage.getItem('userToken');
  
  const { tripId } = useParams();

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


    return (
        <>
        
        <section > 
        <div className="row mt-5 justify-content-center" data-aos="fade-up">
        <div className="col-lg-10">

        <form className="dataform" action="">
        <div className="row">

        <div className="col-md-6 pb-2 form-group">
            <label htmlFor="from" className='p-1'>From</label>
            <input type="text" className="form-control" name="from" placeholder='To'  defaultValue={request.from} readOnly />
        </div>
        <div className="col-md-6 pb-2 form-group">
            <label htmlFor="to" className='p-1'>To</label>
            <input type="text" className="form-control" name="to" placeholder='To'  defaultValue={request.to} readOnly />
        </div>
        <div className="col-md-6 pb-2 form-group">
            <label htmlFor="date" className='p-1'>Date</label>
            <input type="date"  className="form-control" placeholder='Date' name='date' defaultValue={request.TripDate ? request.TripDate.split('T')[0] : "" } readOnly/>
        </div>

        <div className="col-md-6 pb-2 form-group ">
          <label htmlFor="time" className='p-1'>Trip Time :</label>
          <input type="text"  className="form-control " name='time' placeholder='time'  defaultValue={request.TripTime} readOnly/>
        </div> 

        <div className="col-md-6 pb-2 form-group  ">
        <label htmlFor="AvailableWeight" className='p-1'>Available weight :</label>
        <input type="number" step="0.01" className="form-control" name="AvailableWeight" placeholder='Available Weight'  defaultValue={request.AvailableWeight} readOnly />
        </div>

        <div className="col-md-6 pb-2 form-group">
        <label htmlFor="unAcceptablaPackage" className='p-1'>UnAcceptable package:</label>
        <input type="text"  className="form-control" name='unAcceptablaPackage' placeholder='unAcceptable Package'  defaultValue={request.unAcceptablaPackage} readOnly />
        </div>

        <div className="col-lg-12 text-center">
   
          <Link to={`/shipmentSendTrip/${tripId}`}> <button className='formButton' type='button'>Send Request</button> </Link>
        </div>

        </div>

        </form>
        </div>
        </div>
        </section>
        <Footer/>
        </>
    )
  }

