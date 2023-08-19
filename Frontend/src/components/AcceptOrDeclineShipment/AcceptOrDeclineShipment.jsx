import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {  useHistory, useParams } from 'react-router-dom'
import Footer from '../Footer/Footer'
const BASE_URL = process.env.REACT_APP_API_URI;
export default function AcceptOrDeclineShipment(){
  const history = useHistory();
  let encodedToken = localStorage.getItem('userToken');
  const [isAccepted, setIsAccepted] = useState(false);
  const [isDeclined , setIsDeclined] = useState(false)
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




    async function AcceptRequest() {
      axios.post(`${BASE_URL}/v1/requests/acceptrequest/${requestId}`,{isAccepted: true},{ headers: {"Authorization" : `Bearer ${encodedToken}`} }).then((response) => {
          console.log(response.message);
          setIsAccepted(true)
          history.push(`/chat/${requestId}`)
        })
        .catch((error) => {
          console.log(error);
        });
    }


    async function DeclineRequest() {
      axios.post(`${BASE_URL}/v1/requests/declinerequest/${requestId}`,{isDeclined: true},{ headers: {"Authorization" : `Bearer ${encodedToken}`} }).then((response) => {
          console.log(response.message);
          setIsDeclined(true)
        })
        .catch((error) => {
          console.log(error);
        });
    }

  
    return (
      <>
    <section >
      <div className="row mt-5 justify-content-center" data-aos="fade-up">
      <div className="col-lg-10">

      <div className="dataform">
        <div className="row">

        <div className="col-md-6 pb-2 form-group">
            <label htmlFor="buyOrdeliver" className='p-1'>Buy or deliver :  </label>
            <input type="text"  className="form-control " name='buyOrdeliver' placeholder='Buy or deliver'  defaultValue={request.buyOrdeliver}   readOnly/>
        </div>

        <div className="col-md-6 pb-2 form-group">
            <label htmlFor="from" className='p-1'>From</label>
            <input type="text" readOnly className="form-control" name="from" placeholder='To'  defaultValue={request.from}   />
        </div>

        <div className="col-md-6 pb-2 form-group">
            <label htmlFor="to" className='p-1'>To</label>
            <input type="text" readOnly className="form-control" name="to" placeholder='To'  defaultValue={request.to}  />
        </div>

        <div className="col-md-6 pb-2 form-group">
            <label htmlFor="reward" className='p-1'>Reward :</label>
            <input readOnly type="text"  className="form-control" placeholder='Reward' name='reward' defaultValue={request.reward } />
        </div>

        <div className="col-md-6 pb-2 form-group">
            <label htmlFor="anotherPhone" className='p-1'>Another Phone : </label>
            <input readOnly type="text"  className="form-control" placeholder='anotherPhone' name='anotherPhone' defaultValue={request.anotherPhone }/>
        </div>

        <div className="col-md-6 pb-2 form-group">
            <label htmlFor="item" className='p-1'>Item : </label>
            <input readOnly type="text"  className="form-control" placeholder='Item' name='item' defaultValue={request.item }/>
        </div>

        <div className="col-md-6 pb-2 form-group">
            <label htmlFor="weight" className='p-1'>Weight : </label>
            <input readOnly type="number" step="0.01"  className="form-control" placeholder='weight' name='weight' defaultValue={request.weight }/>
        </div>

        <div className="col-md-6 pb-2 form-group">
            <label htmlFor="location" className='p-1'>Location : </label>
            <input readOnly type="text"  className="form-control" placeholder='location' name='location' defaultValue={request.location }/>
        </div>

        <div className="col-md-6 pb-2 form-group">
            <label htmlFor="category" className='p-1'>Category : </label>
            <input readOnly type="text"  className="form-control" placeholder='category' name='location' defaultValue={request.category }/>
        </div>







        {request.buyOrdeliver === 'deliver' ? 

<div className="col-md-6 pb-2 form-group">
<label htmlFor="targetLocation" className='p-1'>Target Location :  </label>
<input readOnly type="text"  className="form-control" placeholder='category' name='targetLocation' defaultValue={request.targetLocation }/>
</div>

: 
<>

<div className="col-md-6 pb-2 form-group">
<label htmlFor="storeName" className='p-1'>Store Name:   </label>
<input readOnly type="text"  className="form-control" placeholder='store Name' name='storeName' defaultValue={request.storeName }/>
</div>

<div className="col-md-6 pb-2 form-group">
<label htmlFor="storeLocation" className='p-1'>Store Location: </label>
<input readOnly type="text"  className="form-control" placeholder='storeLocation' name='storeLocation' defaultValue={request.storeLocation }/>
</div>

<div className="col-md-6 pb-2 form-group">
<label htmlFor="price" className='p-1'>Price : </label>
<input readOnly type="text"  className="form-control" placeholder='price' name='price' defaultValue={request.price }/>
</div>



</>
}
<div className="col-lg-6 text-center" >
      <button type='button' className='formButton' onClick={AcceptRequest}>ACCEPT REQUEST</button>
      </div>
      <div className="col-lg-6 text-center ">
      <button type='button' className=' redButton' onClick={DeclineRequest}>Decline REQUEST</button>

      </div>

</div>
   </div>

    



</div>

      
      </div>
      
      </section>
      
      
      <Footer/>
      </>
    )
  }

