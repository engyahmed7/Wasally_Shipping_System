import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom'
import axios from 'axios'
import noImage from '../../assets/images/noImage.png'
import Joi from 'joi';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
const BASE_URL = process.env.REACT_APP_API_URI;
// import jwtDecode from 'jwt-decode'

export default function Profile2() {
    const [profileData , setProfileDate] = useState([]);
    const [userDataa,setUserDataa]=useState([])
    let encodedToken = localStorage.getItem('userToken');
    const [ratings, setRatings] = useState([]);
  let [errorList , setErrorList] = useState([])
  let [error,setError] = useState('');
  let [loading,setLoading] = useState(false);
  let [image, setImage] = useState({ProfileImage: ''});





  const handleImageChange = (e)=>{
    let myStudent = {...image};
    myStudent[e.target.name] = e.target.files[0];
    setImage(myStudent);
  }
  async function formSubmit(e){
    e.preventDefault();
    let validationResponse = validationForm();
    console.log(validationResponse);
    if(validationResponse.error){ 
      setLoading(false)
      setErrorList(validationResponse.error.details)
      return;
    }

    setLoading(true);
     await axios.patch(`${BASE_URL}/v1/users/profileImage`,image,{ headers: {"Authorization" : `Bearer ${encodedToken}` ,'Content-Type': 'multipart/form-data'} }).then(
      res => {
       
        setLoading(false);
        setError('');
        setErrorList([]);
        console.log("s",image)
        getProfile();
      })
    .catch(err => {
      setLoading(false);
      setError(err.response.data.message);
      console.log(err)
  }
  );
}

function validationForm(){
    let scheme = Joi.object({
        ProfileImage: Joi.object(),
    });
   return scheme.validate(image,{abortEarly:false});
  }
  



async function getProfile(){

    axios.get(`${BASE_URL}/v1/travelers/get` ,{ headers: {"Authorization" : `Bearer ${encodedToken}`} }).then(
        (response)=>{
            console.log("a",response.data)
            setProfileDate(response.data.traveler)
            setUserDataa(response.data.user)
            axios.get(`${BASE_URL}/v1/travelers/ViewRating/${response.data.traveler._id}`,{ headers: {"Authorization" : `Bearer ${encodedToken}`} })
            .then((res) => setRatings(res.data)
            
            )
            .catch((err) => console.log(err));

      
        }
    ).catch(
        (error)=>{
            console.log(error)

        }
    )
}


useEffect(()=>{
    getProfile();
   
    },[]);


  return (
    <>
    


<section className="profile">
<div className="container-fluid min-vh-100 d-flex flex-column">
  <div className="row">
    <div className="offset-md-1 col-md-2">
  <img className='rounded rounded-circle firstImage' src={userDataa.ProfileImage ? userDataa.ProfileImage : noImage} alt="profile img" />
  <h3>{userDataa.name} </h3>
  
  </div>


  </div>
  <hr />
    <div className="row flex-grow-1 ">
        <div className="left offset-md-1 col-md-3 ">
        <div>
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
                   
                    <form onSubmit={formSubmit}>
                    <div className="contain">
                    <label htmlFor="file-upload">
                    <img className='imgg rounded rounded-2' src={userDataa.ProfileImage ? userDataa.ProfileImage : noImage } alt="profile img" />
                 </label>
                   </div>

                        <input type="file" onChange={handleImageChange} name="ProfileImage"  id="file-upload"  style={{display:'none'}}/> 
                    <button className='text-center profileBtn' type='submit' href="" ><AddPhotoAlternateIcon/> {loading ?<i className='fas fa-spinner fa-spin'></i>:'Change Profile Image'}</button>
                    </form>
                 

        </div>
        <p>Average rating: {ratings.length ? (ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length).toFixed(1) : 'N/A'}</p>
       
        <div className="menu">
        <Link className="link" to="/userForm">    <li className='mediabutton' style={{display:"none"}}>    
                      Edit your Details
                     
            </li> 
            </Link>
        <Link  className="link" to="/travelertrips"> <li>
                      Your Trips     
            </li>
            </Link>
        <Link className="link" to="/userShipment">    <li>    
                      Your Shipments
                     
            </li> 
            </Link>
            
            <Link  className="link" to="/tripdetails"> <li>
                      Add Trip    
            </li>
            </Link>
            <Link className="link" to="/requestSendBuy">  <li>  
                      Traveler Requests
                   
            </li>
            </Link>
         
            <Link  className="link" to="/userdetails2"> <li>
                      Buy - Deliver      
            </li>
            </Link>

         
            <Link  className="link" to="/userRequests"> <li>
            User Requests      
            </li>
            </Link>
            <Link className="link" to="/acceptedrequests">  <li>  
                     User  Accepted Requests    
            </li>
            </Link>
            <Link className="link" to="/traveleracceptedrequests">  <li>  
                     Traveler Accepted Requests 
            </li>
            </Link>
         
        </div>
        </div>
        
        <div className="col-md-8 editsection">
            
          <div className="row rooo">
            <div className="offset-md-8 col-md-4">    <Link to='/travelerForm' className="edit2"> <EditIcon/> Edit</Link></div>
    
        </div>
    <br/>
    <form  className="form  ">
    <h4> {userDataa.role} - {profileData.isStudent === false ? 'Employee' : 'Student'}</h4>
      <div className="row">
      <div className="col-md-12 pb-2 form-group">
            <label className='p-1'>Name</label>
            <input  className="form-control" defaultValue={userDataa.name} readOnly/>
        </div>
        <div className="col-md-12 pb-2 form-group">
            <label className='p-1'>Phone Number</label>
            <input  className="form-control" defaultValue={userDataa.phoneNumber ? userDataa.phoneNumber :''} readOnly/>
        </div>

        <div className="col-md-12 pb-2 form-group">
            <label className='p-1'>Email</label>
            <input  className="form-control"  defaultValue={userDataa.email} readOnly/>
        </div>
        <div className="col-md-12 pb-2 form-group">
            <label className='p-1'>National ID</label>
            <input  className="form-control"  defaultValue={profileData.NationalId} readOnly/>
        </div>
        <div className="col-md-12 pb-2 form-group">
            <label className='p-1'>Birth Date</label>
            <input type='date'  className="form-control" defaultValue={userDataa.birthDate ? userDataa.birthDate.split('T')[0] : "" } readOnly/>
        </div>
        <div className="col-md-12 pb-2 form-group">
            <label className='p-1'>Address</label>
            <input  className="form-control" defaultValue={userDataa.address?userDataa.address:''} readOnly/>
        </div>
        <div className="col-md-12 pb-2 form-group">
            <label className='p-1'>Governorate</label>
            <input  className="form-control" defaultValue={userDataa.governorate} readOnly/>
        </div>

        <div className="col-md-12 pb-2 form-group">
            <label className='p-1'>City</label>
            <input  className="form-control"  defaultValue={userDataa.city} readOnly/>
        </div>
      

       
  
      </div>

   
     
    </form>


   
        </div>
    </div>
</div>
</section>
    </>
  )
}
