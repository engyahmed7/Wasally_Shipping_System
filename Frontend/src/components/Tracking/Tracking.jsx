import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
const BASE_URL = process.env.REACT_APP_API_URI;
export default function Tracking() {
    let encodedToken = localStorage.getItem('userToken');
const { requestId } = useParams();
    
    const [request, SetRequest] = useState({});
    useEffect(() => {
      const fetch = async () => {
        axios.get(`${BASE_URL}/v1/requests/`+requestId,{ headers: {"Authorization" : `Bearer ${encodedToken}`} }).then(
        (response)=>{
            console.log("sss",response.data)
            SetRequest(response.data)

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
   <div className="container p-5 mb-1">
  <div>

    <div className="d-flex flex-wrap flex-sm-nowrap justify-content-between py-3 px-2 bg-secondary">
    
      <div className="w-100 text-center py-1 px-2"><span className="text-medium">Status:</span> {request.state}</div>
     
    </div>
    <div className="card-body">
      <div className="steps d-flex flex-wrap flex-sm-nowrap justify-content-between padding-top-2x padding-bottom-1x">
     

<div className= {request.state ===  ( 'processing' || 'accepted'  || 'onmyway' || 'delivered')   ? 'step completed' : 'step'}>
          <div className="step-icon-wrap">
            <div className="step-icon"><i className="pe-7s-cart" /></div>
          </div>
          <h4 className="step-title">Processing</h4>
        </div>
     
        
<div className= {request.state === ('accepted' || 'onmyway' || 'delivered')  ? 'step completed' : 'step'} >
          <div className="step-icon-wrap">
            <div className="step-icon"><i className="pe-7s-cart" /></div>
          </div>
          <h4 className="step-title">Accepted Shipment</h4>
        </div>
      
       
<div className= {request.state ===  ('onmyway' || 'delivered') ? 'step completed' : 'step'}>
          <div className="step-icon-wrap">
            <div className="step-icon"><i className="pe-7s-cart" /></div>
          </div>
          <h4 className="step-title">On My Way</h4>
        </div>
      



<div className= {request.state ===  'delivered'  ? 'step completed' : 'step'}>
          <div className="step-icon-wrap">
            <div className="step-icon"><i className="pe-7s-cart" /></div>
          </div>
          <h4 className="step-title">Delivered</h4>
        </div>
   
        
      </div>
    </div>
  </div>
  
</div>

    </>
  )
}
