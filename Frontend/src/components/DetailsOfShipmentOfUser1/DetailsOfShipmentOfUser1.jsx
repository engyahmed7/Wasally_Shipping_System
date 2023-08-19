import axios from 'axios';
import Joi from 'joi';
import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import Footer from '../Footer/Footer'
const BASE_URL = process.env.REACT_APP_API_URI;

export default function DetailsOfShipmentOfUser1(){
  let encodedToken = localStorage.getItem('userToken');
  const history = useHistory();
  let decodedToken = jwtDecode(encodedToken)
let role = decodedToken.role;
console.log(role)
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
  




    let [errorList , setErrorList] = useState([])
  let [error,setError] = useState('');
    let [price, setPrice] = useState({
      price: '',
    });
    const handleChange = (e) => {
      let myPrice = {...price};
      myPrice[e.target.name] = e.target.value;
      setPrice(myPrice);
    };
    function validationForm(){
      let scheme = Joi.object({
       
        price: Joi.number().required(),
       
      });
     return scheme.validate(price,{abortEarly:false});
    }
  async function formSubmit(e){
    e.preventDefault();
    let validationResponse = validationForm();
    console.log(validationResponse);
    if(validationResponse.error){ 
      setErrorList(validationResponse.error.details)
      return;
    }
    axios.post(`${BASE_URL}/v1/requests/TravelerAcceptRequest/${requestId}`,price,{ headers: {"Authorization" : `Bearer ${encodedToken}`} }).then((response) => {
      console.log(response.message);
      // setIsAccepted(true)
      setError('');
    setErrorList([]);
      history.push('/chat')
      
    })
    .catch((error) => {
      console.log(error);
      setError(error.response.data.message);
    });
    
  }



    return (
      <>
   <section >
      <div className="row mt-5 justify-content-center" data-aos="fade-up">
      <div className="col-lg-10">

      <div className="dataform">
        <div className="row">

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

        <div className="col-md-6 pb-2 form-group">
            <label htmlFor="buyOrdeliver" className='p-1'>Buy or deliver :  </label>
            <input type="text"  className="form-control " name='buyOrdeliver' placeholder='Buy or deliver'  defaultValue={request.buyOrdeliver}   readOnly/>
        </div>

        <div className="col-md-6 pb-2 form-group">
            <label htmlFor="from" className='p-1'>From</label>
            <input type="text" readOnly className="form-control" name="from" placeholder='To'  defaultValue={request.from}  />
        </div>

        <div className="col-md-6 pb-2 form-group">
            <label htmlFor="to" className='p-1'>To</label>
            <input type="text" readOnly className="form-control" name="to" placeholder='To'  defaultValue={request.to}  />
        </div>
      

        <div className="col-md-6 pb-2 form-group">
            <label htmlFor="reward" className='p-1'>Reward :</label>
            <input readOnly type="text"  className="form-control" placeholder='Reward' name='reward' defaultValue={request.reward }/>
        </div>
        
        <div className="col-md-6 pb-2 form-group">
        <label htmlFor="date" className='p-1'>Date</label>
       
        <input  type="date" name="date" className="form-control"  readOnly defaultValue= {request.date ? request.date.split('T')[0] : "" }/>
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
    

</div>
{role ==='traveler' ?
      <>
      <form onSubmit={formSubmit} >
   <div className="col-lg-4 ">
  <label htmlFor="price" className="col-form-label">Price : </label>
</div>
<div className="col-lg-12">
  <input  onChange={handleChange} type="number"  className="form-control" placeholder='Price' name='price' />
</div> 
<br/>
<div className='d-flex justify-content-center align-items-center flex-column'>
<button className="formButton" type='submit'> Accept Request</button>
</div>  
   </form>
   </>:null
}
      </div>

    



</div>

      
      </div>
      
      </section>
      
      
      <Footer/>
      </>
    )
  }

