import axios from 'axios';
import Joi from 'joi';
import React, { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import Footer from '../Footer/Footer'
const BASE_URL = process.env.REACT_APP_API_URI;

export default function UpdateDetailsOfShipments(){
    let encodedToken = localStorage.getItem('userToken');
    const [request , setRequest] = useState([]);
    const [requests, SetRequests] = useState({
        to: request.to,
        from:request.from,
        item:request.item,
        weight:request.weight,
        location:request.location,
        targetLocation:request.targetLocation,
        category:request.category,
        storeLocation:request.storeLocation,
        storeName:request.storeName,
        price:request.price,
        reward:request.reward,
        date:request.date,
        anotherPhone:request.anotherPhone,
      });
    
 
      const handleChange = (e) => {
        let Request = {...requests};
        Request[e.target.name] = e.target.value;
        SetRequests(Request);
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
        axios.patch(`${BASE_URL}/v1/requests/`+requestId ,requests,{ headers: {"Authorization" : `Bearer ${encodedToken}`} })
        .then(
          res => {
           
            setLoading(false);
            setError('');
            setErrorList([]);
    
           history.push('/userShipment')
            
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
            reward: Joi.number().optional().allow(''),
            to: Joi.string().optional().allow(''),
            from: Joi.string().optional().allow(''),
            item: Joi.string().optional().allow(''),
            weight: Joi.number().optional().allow(''),
            location: Joi.string().optional().allow(''),
            targetLocation: Joi.string().optional().allow(''),
            anotherPhone:Joi.string().regex(/^[0-9]{11}$/).messages({'string.pattern.base': `Phone number must have 11 digits.`}).optional().allow(''),
            category: Joi.string().optional().allow(''),
            date: Joi.date().greater(Date.now() - 24 * 60 * 60 * 1000).iso().messages({
                'date.format': `Date format is YYYY-MM-DD`,
                'date.min': `Date should not be passed`
              }).optional().allow(''),
              storeLocation: Joi.string().optional().allow(''),
               
        storeName: Joi.string().optional().allow(''),
        price: Joi.number().optional().allow(''),
        });
       return scheme.validate(requests,{abortEarly:false});
      
      }
    const { requestId } = useParams();
  
    useEffect(() => {
      const fetch = async () => {
        axios.get(`${BASE_URL}/v1/requests/`+requestId,{ headers: {"Authorization" : `Bearer ${encodedToken}`} }).then(
        (response)=>{
            console.log("sss",response.data)
            setRequest(response.data)

        }
    ).catch(
        (error)=>{
            console.log(error)

        }
    )    
      };
      fetch();
    }, []);
   

    let history = useHistory();
    let [errorList , setErrorList] = useState([])
    let [error,setError] = useState('');
    let [loading,setLoading] = useState(false)

    return (
      <>
      <section >
      <div className="row mt-5 justify-content-center" data-aos="fade-up">
      <div className="col-lg-10">

      <form onSubmit={submitForm}  className="dataform">
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
            <input type="text" onChange={handleChange} className="form-control " name='buyOrdeliver' placeholder='Buy or deliver'  defaultValue={request.buyOrdeliver}   readOnly/>
        </div>

        <div className="col-md-6 pb-2 form-group">
        <label htmlFor="from" className='p-1'>From</label>
<select className='selector form-select '  name="from" onChange={handleChange} >
<option value="">Select</option>
{request.from === 'Alexandria' ? <option  value="Alexandria" selected >Alexandria</option>  : <option  value="Alexandria"  >Alexandria</option> }
    {request.from === 'Aswan' ? <option  value="Aswan" selected >Aswan</option>  : <option  value="Aswan"  >Aswan</option> }
    {request.from === 'Asyut' ? <option  value="Asyut" selected >Asyut</option>  : <option  value="Asyut"  >Asyut</option> }
    {request.from === 'Beheira' ? <option  value="Beheira" selected >Beheira</option>  : <option  value="Beheira"  >Beheira</option> }
    {request.from === 'Beni Suef' ? <option  value="Beni Suef" selected >Beni Suef</option>  : <option  value="Beni Suef"  >Beni Suef</option> }
    {request.from === 'Cairo' ? <option  value="Cairo" selected >Cairo</option>  : <option  value="Cairo"  >Cairo</option> }
    {request.from === 'Dakahlia' ? <option  value="Dakahlia" selected >Dakahlia</option>  : <option  value="Dakahlia"  >Dakahlia</option> }
    {request.from === 'Damietta' ? <option  value="Damietta" selected >Damietta</option>  : <option  value="Damietta"  >Damietta</option> }
    {request.from === 'Faiyum' ? <option  value="Faiyum" selected >Faiyum</option>  : <option  value="Faiyum"  >Faiyum</option> }
    {request.from === 'Gharbia' ? <option  value="Gharbia" selected >Gharbia</option>  : <option  value="Gharbia"  >Gharbia</option> }
    {request.from === 'Giza' ? <option  value="Giza" selected >Giza</option>  : <option  value="Giza"  >Giza</option> }
    {request.from === 'Ismailia' ? <option  value="Ismailia" selected >Ismailia</option>  : <option  value="Ismailia"  >Ismailia</option> }
    {request.from === 'Kafr El Sheikh' ? <option  value="Kafr El Sheikh" selected >Kafr El Sheikh</option>  : <option  value="Kafr El Sheikh"  >Kafr El Sheikh</option> }
    {request.from === 'Luxor' ? <option  value="Luxor" selected >Luxor</option>  : <option  value="Luxor"  >Luxor</option> }
    {request.from === 'Matruh' ? <option  value="Matruh" selected >Matruh</option>  : <option  value="Matruh"  >Matruh</option> }
    {request.from === 'Minya' ? <option  value="Minya" selected >Minya</option>  : <option  value="Minya"  >Minya</option> }
    {request.from === 'Monufia' ? <option  value="Monufia" selected >Monufia</option>  : <option  value="Monufia"  >Monufia</option> }
    {request.from === 'New Valley' ? <option  value="New Valley" selected >New Valley</option>  : <option  value="New Valley"  >New Valley</option> }
    {request.from === 'North Sinai' ? <option  value="North Sinai" selected >North Sinai</option>  : <option  value="North Sinai"  >North Sinai</option> }
    {request.from === 'Port Said' ? <option  value="Port Said" selected >Port Said</option>  : <option  value="Port Said"  >Port Said</option> }
    {request.from === 'Qalyubia' ? <option  value="Qalyubia" selected >Qalyubia</option>  : <option  value="Qalyubia"  >Qalyubia</option> }
    {request.from === 'Qena' ? <option  value="Qena" selected >Qena</option>  : <option  value="Qena"  >Qena</option> }
    {request.from === 'Red Sea' ? <option  value="Red Sea" selected >Red Sea</option>  : <option  value="Red Sea"  >Red Sea</option> }
    {request.from === 'Sharqia' ? <option  value="Sharqia" selected >Sharqia</option>  : <option  value="Sharqia"  >Sharqia</option> }
    {request.from === 'Sohag' ? <option  value="Sohag" selected >Sohag</option>  : <option  value="Sohag"  >Sohag</option> }
    {request.from === 'South Sinai' ? <option  value="South Sinai" selected >South Sinai</option>  : <option  value="South Sinai"  >South Sinai</option> }
    {request.from === 'Suez' ? <option  value="Suez" selected >Suez</option>  : <option  value="Suez"  >Suez</option> }
    
    </select>
    </div>
    <div className="col-md-6 pb-2 form-group">
        <label htmlFor="to" className='p-1'>To</label>
    <select className='selector form-select '  name="to" onChange={handleChange} >
    <option value="">Select</option>
    {request.to === 'Alexandria' ? <option  value="Alexandria" selected >Alexandria</option>  : <option  value="Alexandria"  >Alexandria</option> }
    {request.to === 'Aswan' ? <option  value="Aswan" selected >Aswan</option>  : <option  value="Aswan"  >Aswan</option> }
    {request.to === 'Asyut' ? <option  value="Asyut" selected >Asyut</option>  : <option  value="Asyut"  >Asyut</option> }
    {request.to === 'Beheira' ? <option  value="Beheira" selected >Beheira</option>  : <option  value="Beheira"  >Beheira</option> }
    {request.to === 'Beni Suef' ? <option  value="Beni Suef" selected >Beni Suef</option>  : <option  value="Beni Suef"  >Beni Suef</option> }
    {request.to === 'Cairo' ? <option  value="Cairo" selected >Cairo</option>  : <option  value="Cairo"  >Cairo</option> }
    {request.to === 'Dakahlia' ? <option  value="Dakahlia" selected >Dakahlia</option>  : <option  value="Dakahlia"  >Dakahlia</option> }
    {request.to === 'Damietta' ? <option  value="Damietta" selected >Damietta</option>  : <option  value="Damietta"  >Damietta</option> }
    {request.to === 'Faiyum' ? <option  value="Faiyum" selected >Faiyum</option>  : <option  value="Faiyum"  >Faiyum</option> }
    {request.to === 'Gharbia' ? <option  value="Gharbia" selected >Gharbia</option>  : <option  value="Gharbia"  >Gharbia</option> }
    {request.to === 'Giza' ? <option  value="Giza" selected >Giza</option>  : <option  value="Giza"  >Giza</option> }
    {request.to === 'Ismailia' ? <option  value="Ismailia" selected >Ismailia</option>  : <option  value="Ismailia"  >Ismailia</option> }
    {request.to === 'Kafr El Sheikh' ? <option  value="Kafr El Sheikh" selected >Kafr El Sheikh</option>  : <option  value="Kafr El Sheikh"  >Kafr El Sheikh</option> }
    {request.to === 'Luxor' ? <option  value="Luxor" selected >Luxor</option>  : <option  value="Luxor"  >Luxor</option> }
    {request.to === 'Matruh' ? <option  value="Matruh" selected >Matruh</option>  : <option  value="Matruh"  >Matruh</option> }
    {request.to === 'Minya' ? <option  value="Minya" selected >Minya</option>  : <option  value="Minya"  >Minya</option> }
    {request.to === 'Monufia' ? <option  value="Monufia" selected >Monufia</option>  : <option  value="Monufia"  >Monufia</option> }
    {request.to === 'New Valley' ? <option  value="New Valley" selected >New Valley</option>  : <option  value="New Valley"  >New Valley</option> }
    {request.to === 'North Sinai' ? <option  value="North Sinai" selected >North Sinai</option>  : <option  value="North Sinai"  >North Sinai</option> }
    {request.to === 'Port Said' ? <option  value="Port Said" selected >Port Said</option>  : <option  value="Port Said"  >Port Said</option> }
    {request.to === 'Qalyubia' ? <option  value="Qalyubia" selected >Qalyubia</option>  : <option  value="Qalyubia"  >Qalyubia</option> }
    {request.to === 'Qena' ? <option  value="Qena" selected >Qena</option>  : <option  value="Qena"  >Qena</option> }
    {request.to === 'Red Sea' ? <option  value="Red Sea" selected >Red Sea</option>  : <option  value="Red Sea"  >Red Sea</option> }
    {request.to === 'Sharqia' ? <option  value="Sharqia" selected >Sharqia</option>  : <option  value="Sharqia"  >Sharqia</option> }
    {request.to === 'Sohag' ? <option  value="Sohag" selected >Sohag</option>  : <option  value="Sohag"  >Sohag</option> }
    {request.to === 'South Sinai' ? <option  value="South Sinai" selected >South Sinai</option>  : <option  value="South Sinai"  >South Sinai</option> }
    {request.to === 'Suez' ? <option  value="Suez" selected >Suez</option>  : <option  value="Suez"  >Suez</option> }
    
      
              

           
    </select>

</div>
      
{/* //// */}
        <div className="col-md-6 pb-2 form-group">
            <label htmlFor="reward" className='p-1'>Reward :</label>
            <input onChange={handleChange} type="text"  className="form-control" placeholder='Reward' name='reward' defaultValue={request.reward }/>
        </div>

        <div className="col-md-6 pb-2 form-group">
            <label htmlFor="anotherPhone" className='p-1'>Another Phone : </label>
            <input onChange={handleChange} type="text"  className="form-control" placeholder='anotherPhone' name='anotherPhone' defaultValue={request.anotherPhone }/>
        </div>

        <div className="col-md-6 pb-2 form-group">
            <label htmlFor="item" className='p-1'>Item : </label>
            <input onChange={handleChange} type="text"  className="form-control" placeholder='Item' name='item' defaultValue={request.item }/>
        </div>

        <div className="col-md-6 pb-2 form-group">
            <label htmlFor="weight" className='p-1'>Weight : </label>
            <input onChange={handleChange} type="number" step="0.01"  className="form-control" placeholder='weight' name='weight' defaultValue={request.weight }/>
        </div>
        <div className="col-md-6 pb-2 form-group">
        <label htmlFor="date" className='p-1'>Date</label>
       
        <input  onChange={handleChange} type="date" name="date" className="form-control"   defaultValue= {request.date ? request.date.split('T')[0] : "" }/>
        </div>
        <div className="col-md-6 pb-2 form-group">
            <label htmlFor="location" className='p-1'>Location : </label>
            <input onChange={handleChange} type="text"  className="form-control" placeholder='location' name='location' defaultValue={request.location }/>
        </div>

        <div className="col-md-6 pb-2 form-group">
            <label htmlFor="category" className='p-1'>Category : </label>
            {/* <input onChange={handleChange} type="text"  className="form-control" placeholder='category' name='category' defaultValue={request.category }/> */}
            <select className='selector form-select '  name="category" onChange={handleChange} defaultValue={request.category} >
           
      
            {request.category === 'Electronics' ? <option  value="Electronics" selected >Electronics</option>  : <option  value="Electronics"  >Electronics</option> }
           
            {request.category === 'Books and Media' ? <option  value="Books and Media" selected >Books and Media</option>  : <option  value="Books and Media"  >Books and Media</option> }
            {request.category === 'Clothing and Accessories' ? <option  value="Clothing and Accessories" selected >Clothing and Accessories</option>  : <option  value="Clothing and Accessories"  >Clothing and Accessories</option> }
            {request.category === 'Papers' ? <option  value="Papers" selected >Papers</option>  : <option  value="Papers"  >Papers</option> }
            {request.category === 'Home and Garden' ? <option  value="Home and Garden" selected >Home and Garden</option>  : <option  value="Home and Garden"  >Home and Garden</option> }
            {request.category === 'Beauty and Personal Care' ? <option  value="Beauty and Personal Care" selected >Beauty and Personal Care</option>  : <option  value="Beauty and Personal Care"  >Beauty and Personal Care</option> }
            {request.category === 'Health and Wellness' ? <option  value="Health and Wellness" selected >Health and Wellness</option>  : <option  value="Health and Wellness"  >Health and Wellness</option> }
            {request.category === 'Food' ? <option  value="Food" selected >Food</option>  : <option  value="Food"  >Food</option> }
            {request.category === 'Toys and Games' ? <option  value="Toys and Games" selected >Toys and Games</option>  : <option  value="Toys and Games"  >Toys and Games</option> }
            {request.category === 'Automotive and Tools' ? <option  value="Automotive and Tools" selected >Automotive and Tools</option>  : <option  value="Automotive and Tools"  >Automotive and Tools</option> }
            {request.category === 'Office Supplies' ? <option  value="Office Supplies" selected >Office Supplies</option>  : <option  value="Office Supplies"  >Office Supplies</option> }
            {request.category === 'Sports and Fitness' ? <option  value="Sports and Fitness" selected >Sports and Fitness</option>  : <option  value="Sports and Fitness"  >Sports and Fitness</option> }
            
        
    </select>
        </div>







        {request.buyOrdeliver === 'deliver' ? 

<div className="col-md-6 pb-2 form-group">
<label htmlFor="targetLocation" className='p-1'>Target Location :  </label>
<input onChange={handleChange} type="text"  className="form-control" placeholder='category' name='targetLocation' defaultValue={request.targetLocation }/>
</div>

: 
<>

<div className="col-md-6 pb-2 form-group">
<label htmlFor="storeName" className='p-1'>Store Name:   </label>
<input onChange={handleChange} type="text"  className="form-control" placeholder='store Name' name='storeName' defaultValue={request.storeName }/>
</div>

<div className="col-md-6 pb-2 form-group">
<label htmlFor="storeLocation" className='p-1'>Store Location: </label>
<input onChange={handleChange} type="text"  className="form-control" placeholder='storeLocation' name='storeLocation' defaultValue={request.storeLocation }/>
</div>

<div className="col-md-6 pb-2 form-group">
<label htmlFor="price" className='p-1'>Price : </label>
<input onChange={handleChange} type="text"  className="form-control" placeholder='price' name='price' defaultValue={request.price }/>
</div>

</>
}
      <div className="col-lg-12 text-center">
        <button className='formButton'  type='submit' >{loading ?<i className='fas fa-spinner fa-spin'></i>:'UPDATE'}</button>
        <br />
        <br />
        <Link to="/userShipment"><button className='formButton' type='button' >BACK</button></Link>  

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

