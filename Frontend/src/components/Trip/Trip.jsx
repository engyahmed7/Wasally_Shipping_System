import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Footer from '../Footer/Footer'
import { Link } from 'react-router-dom'
import DirectionsTransitIcon from '@mui/icons-material/DirectionsTransit';
import WhereToVoteIcon from '@mui/icons-material/WhereToVote';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import noImage from '../../assets/images/def.jpg'
import ScheduleIcon from '@mui/icons-material/Schedule';
const BASE_URL = process.env.REACT_APP_API_URI;

export default function Trip() {
  
  const [nameList] = useState([])
  const [search, setSearch] = useState("")
  

 
    const [requestData,setRequestData]=useState([]);
    let [userData , setUserData] = useState([])
    let [filteredTrips , setFilteredTrips] = useState([])
    let encodedToken = localStorage.getItem('userToken');

  async function getRequest(){
    axios.get(`${BASE_URL}/v1/trips/view`,{ headers: {"Authorization" : `Bearer ${encodedToken}`} })
    .then(
        (response)=>{
            console.log("ay 7aga",response.data.trips)
            setRequestData(response.data.trips)

  }
        
    )
    .catch(
        (error)=>{
            console.log(error)

        }
    )
}


async function getUserData(){


  axios.get(`${BASE_URL}/v1/travelers/viewAllTravelers`,{ headers: {"Authorization" : `Bearer ${encodedToken}`} }).then(
      (response)=>{
          console.log('bl7',response.data.travelers)
          setUserData(response.data.travelers)
       


      }
  ).catch(
      (error)=>{
          console.log(error)

      }
  )
}
useEffect(()=>{
  getRequest();
  getUserData();
    },[]);

    function filter(searchTerm) {
      setRequestData(prev=>prev.filter(prev.includes(searchTerm)))
    }

    useEffect(()=>{
      const matched = searchCities(search,requestData)
      setFilteredTrips(matched)
    },[requestData, search])

    function searchCities(search, trips) {
      const matching = [];
      if(trips)
   {   trips.forEach(trip => {
        if (trip.to.toLowerCase().includes(search.toLowerCase())||trip.from.toLowerCase().includes(search.toLowerCase())) {
          matching.push(trip);
        }
      });
    }else{
      console.log('no trips')
    }
      return matching;
    }



    
    
  

  

  return (
    <>
<section id="portfolio" className="portfolio sections-bg">
  <div className="container" data-aos="fade-up">
    <div className="section-header">
      <h2>Trips</h2>

      <div className='searchbox'>
      <input className='search-box'  id='search' type='search' placeholder='TO' onChange={(e)=>setSearch(e.target.value)} pattern=".*\S.*" required/>
      <input className='search-box ms-3'  id='search' type='search' placeholder='FROM' onChange={(e)=>setSearch(e.target.value)} pattern=".*\S.*" required/>

      </div>
      <br/>

      </div>
    <div className="portfolio-isotope" data-portfolio-filter="*" data-portfolio-layout="masonry" data-portfolio-sort="original-order" data-aos="fade-up" data-aos-delay={100}>
      <div  className="row gy-4 portfolio-container">
      {filteredTrips && filteredTrips.map((request,index)=>
        <div key={index} className="col-xl-3 col-md-6 portfolio-item filter-app">
          <div  className="portfolio-i">
          
          {
            
          userData.map((traveler,i)=>traveler._id === request.Traveler ? 
          traveler.userId.ProfileImage ?
            <img key={i} src={traveler.userId.ProfileImage }  alt="person" /> 
            
            :
            <img key={i} src={noImage}  alt="person" /> 
            :null)
            }
            <div className="portfolio-info">
            <h4>{userData.map((traveler)=>traveler._id === request.Traveler ? traveler.userId.name : '')}</h4>
           
              <p><DirectionsTransitIcon/> From - {request.from}</p>
              <p><WhereToVoteIcon/>To - {request.to}</p>
              <p><CalendarMonthIcon/>Date -{request.TripDate ? request.TripDate.split('T')[0] : ""}</p>
              <p><ScheduleIcon/>Time -{request.TripTime}</p>
              
              <Link to={`/detailspfshippmentuser/${request._id}`}>   <button className=" orangeButton btn btn-success ">View Details</button></Link>
             
            </div>
          </div>
          
       
        </div> 
      )
}     
       
      </div>
   
    </div>
  </div>
</section>


        <Footer/>

    </>
  )
}
