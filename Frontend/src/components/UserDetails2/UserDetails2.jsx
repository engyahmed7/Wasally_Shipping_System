import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../Footer/Footer'
const BASE_URL = process.env.REACT_APP_API_URI;
export default function UserDetails2  () {

 
  let history = useHistory();
  let [errorList , setErrorList] = useState([])
  let [error,setError] = useState('');
  let [loading,setLoading] = useState(false)
  let [request, setRequest] = useState({
    reward:'',
    to:'',
    from:'',
    item:'',
    weight:'',
    location:'',
    targetLocation:'',
    anotherPhone:'',
    category:'',
    date:'',
    storeLocation:'',
    storeName:'',
    price:'' ,
    buyOrdeliver:'deliver'
    

  });
 
  function getRequest(e){
    let myRequest = {...request};
    myRequest[e.target.name] = e.target.value;
    setRequest(myRequest);
    
   
  }
  async function formSubmit(e){
    e.preventDefault();
    let validationResponse = RequestValidation();
    console.log(validationResponse);
    if(validationResponse.error){ 
      setLoading(false)
      setErrorList(validationResponse.error.details)
      return;
    }
    let encodedToken = localStorage.getItem('userToken');
    setLoading(true);
  
   
    await axios.post(`${BASE_URL}/v1/requests/`,request,{ headers: {"Authorization" : `Bearer ${encodedToken}`} }).then(
      res => { 
        setLoading(false);
        setError('');
        setErrorList([]);

       history.push('/request')
        
      })
    .catch(err => {
      setLoading(false);
      console.log(err.response.data)
      let errorMessage = err.response.data.message;
     let errMsg =  errorMessage.replace(/['"]/g, '');
         setError (errMsg);
  }
  );
}

function RequestValidation(){
  let scheme = Joi.object({
   
 
    reward: Joi.number(),
    to: Joi.string().required(),
    from: Joi.string().required(),
    item: Joi.string().required(),
    weight: Joi.number().required(),
    location: Joi.string().required(),
    targetLocation: Joi.string().optional().allow(''),
    anotherPhone:Joi.string().regex(/^[0-9]{11}$/).messages({'string.pattern.base': `Phone number must have 10 digits.`}),
    category: Joi.string().required(),
    buyOrdeliver: Joi.string().required().valid('buy', 'deliver').default('deliver'),
    date: Joi.date().greater(Date.now() - 24 * 60 * 60 * 1000).iso().messages({
        'date.format': `Date format is YYYY-MM-DD`,
        'date.min': `should not be passed`
      }).required(),
    storeLocation: Joi.string().optional().allow(''),
    storeName: Joi.string().optional().allow(''),
    price: Joi.number().optional().allow(''),
      });
 return scheme.validate(request,{abortEarly:false});
}
    return (


        <>
      {/* <Navbar/> */}
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
  
      <section className="shippmentDetails">
      <div className="container">
        <div className="row">

 
<div>
<h4 className='text-center mt-5'>BUY<span className='orange'>Or</span>DELIVER </h4>
</div>
<section>

<div className="row mt-5 justify-content-center" data-aos="fade-up">
<div className="col-lg-10">
<form onSubmit={formSubmit}  className="dataform">
  <div className="row">

  <div className=' col-md-6 pb-2  '>
            <label className='p-1'> SELECT OPTION :</label>
            <select className='selector form-select '  name="buyOrdeliver" onChange={getRequest} value={request.buyOrdeliver} >
              <option  value="deliver" >Deliver something</option>
              <option  value="buy" >Buy something</option>
            </select>
  </div>

  <div className=' col-md-6 pb-2  '>
  </div>
  
    {/* <div className="col-md-6 pb-2 form-group">
        <label htmlFor="from" className='p-1'>From</label>
        <input onChange={getRequest} type="text" name="from" className="form-control" placeholder="From" required />
    </div>
    <div className="col-md-6 pb-2 form-group">
        <label htmlFor="to" className='p-1'>To</label>
        <input onChange={getRequest} type="text" className="form-control" name="to"  placeholder="To" required />
    </div> */}


  <div className="col-md-6 pb-2 form-group">
        <label htmlFor="from" className='p-1'>From</label>
<select className='selector form-select '  name="from" onChange={getRequest} >
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
    <select className='selector form-select '  name="to" onChange={getRequest} >
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
        <label htmlFor="date" className='p-1'>Date</label>
        <input onChange={getRequest} type="date" name="date" className="form-control"  placeholder="YEAR-MONTH-DAY" required />
    </div>

    {request.buyOrdeliver === 'buy' && (
      <>
          <div className="col-md-6 pb-2 form-group">
    <label htmlFor="storeName" className='p-1'>Store Name</label>
    <input onChange={getRequest} type="text" className="form-control" name="storeName"  placeholder="Store Name" required />
    </div>

    <div className="col-md-6 pb-2 form-group">
    <label htmlFor="storeLocation" className='p-1'>Store Location</label>
    <input onChange={getRequest} type="text" name="storeLocation" className="form-control"  placeholder="Store Location" required />
    </div>

    <div className="col-md-6 pb-2 form-group">
    <label htmlFor="price" className='p-1'>Price</label>
    <input onChange={getRequest} type="number" name="price" className="form-control"  placeholder="Price" required />
    </div>

      </>



)}

    <div className="col-md-6 pb-2 form-group ">
      <label htmlFor="item" className='p-1'>Item</label>
      <input onChange={getRequest} type="text" className="form-control" name="item"  placeholder="Item" required />
    </div> 

    <div className="col-md-6 pb-2 form-group">
    <label htmlFor="category" className='p-1'>Category</label>
    {/* <input onChange={getRequest} type="text" name="category" className="form-control"  placeholder="Category" required /> */}
    <select className='selector form-select '  name="category" onChange={getRequest}  >
      <option  value="" >select</option>
          <option  value="Electronics" >Electronics</option>
              <option  value="Books and Media" >Books and Media</option> 
              <option  value="Clothing and Accessories" >Clothing and Accessories</option>
              <option  value="Papers" >Papers</option>
              <option  value="Home and Garden" >Home and Garden</option>
              <option  value="Beauty and Personal Care" >Beauty and Personal Care</option>
              <option  value="Health and Wellness" >Health and Wellness</option>
              <option  value="Food" >Food</option>
              <option  value="Toys and Games" >Toys and Games</option>
              <option  value="Automotive and Tools" >Automotive and Tools</option>
              <option  value="Office Supplies" >Office Supplies</option>
              <option  value="Sports and Fitness" >Sports and Fitness</option>
    </select>
    </div>

    <div className="col-md-6 pb-2 form-group  ">
    <label htmlFor="weight" className='p-1'>Weight</label>
    <input onChange={getRequest} type="number"  step="0.01" className="form-control" name="weight"  placeholder="Weight" required />
    </div>

    <div className="col-md-6 pb-2 form-group ">
    <label htmlFor="reward" className='p-1'>Reward</label>
    <input onChange={getRequest} type="number" className="form-control" name="reward"  placeholder="Reward" required />
    </div>

    {request.buyOrdeliver === 'deliver' && (
      <>
      
      <div className="col-md-6 pb-2 form-group ">
      <label htmlFor="targetLocation" className='p-1'>Target Location</label>
      <input onChange={getRequest} type="text" className="form-control" name="targetLocation"  placeholder="Your Location" required />
      </div>

      </>
)}
    <div className="col-md-6 pb-2 form-group ">
    <label htmlFor="location" className='p-1'>Your Location</label>
    <input onChange={getRequest} type="text" className="form-control" name="location"  placeholder="Your Location" required />
    </div>

    <div className="col-md-6 pb-2 form-group ">
    <label htmlFor="anotherPhone" className='p-1'>Another Phone </label>
    <input onChange={getRequest} type="tel" className="form-control" name="anotherPhone"  placeholder="Another Phone" required />
    </div>

  </div>

  {/* <div className="form-group pb-2 mt-3">
    <input type="text" className="form-control" name="subject" id="subject" placeholder="Subject" required />
  </div> */}

  <br />
  <div className="text-center  "><div><button className='formButton' type="submit">{loading ?<i></i>:'ADD REQUEST'} </button>
</div></div>
</form>
</div>
</div>

</section>


      


      </div>
      
      </div>
      
      </section>
      
      <Footer/>
   </>
   )
}