import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Footer from '../Footer/Footer'
import { Link } from 'react-router-dom'
import DirectionsTransitIcon from '@mui/icons-material/DirectionsTransit';
import WhereToVoteIcon from '@mui/icons-material/WhereToVote';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ScheduleIcon from '@mui/icons-material/Schedule';
import jwtDecode from 'jwt-decode';
const BASE_URL = process.env.REACT_APP_API_URI;
export default function TravelerTrip() {

  let encodedToken = localStorage.getItem('userToken');
  let decodedToken = jwtDecode(encodedToken);
  let userId = decodedToken.id;

  const [trips,setTrips]=useState([]);


  async function getTrip(){
    axios.get(`${BASE_URL}/v1/trips/viewtravelertrips`,{ headers: {"Authorization" : `Bearer ${encodedToken}`} }).then(
        (response)=>{
            console.log(response.data.trips)
            setTrips(response.data.trips)

        }
    ).catch(
        (error)=>{
             console.log(error.response)

        }
    )
}
let [userData , setUserData] = useState([])
async function getUserData(){


  axios.get(`${BASE_URL}/v1/users/allusers`).then(
      (response)=>{
          console.log('use',response.data)
          setUserData(response.data)
      }
  ).catch(
      (error)=>{
          console.log(error)

      }
  )
}
useEffect(()=>{
  getTrip();
  getUserData();
    },[]);
  
    const [error,setError] = useState("")
    const deleteTrip = (id) => {
      axios.delete(`${BASE_URL}/v1/trips/delete/${id}`  , {headers: { Authorization: `Bearer ${encodedToken}` }})
        .then(response => {
          console.log(response.date)
          getTrip();
        })
        .catch(error => {
         console.log("ss",error.response.data.message);
         setError(error.response.data.message)
        });
    }
  return (
    <>
<section id="portfolio" className="portfolio sections-bg">
  <div className="container" data-aos="fade-up">
    <div className="section-header">
      <h2>Your Trips</h2>
      {
        error &&
        <div className="alert alert-danger">
          {error}
        </div>
        }
      </div>
    <div className="portfolio-isotope" data-portfolio-filter="*" data-portfolio-layout="masonry" data-portfolio-sort="original-order" data-aos="fade-up" data-aos-delay={100}>
      <div  className="row gy-4 portfolio-container">
      {trips ? trips.map((trip,index)=>

        <div key={index} className="col-xl-3 col-md-6 portfolio-item filter-app">
          <div  className="portfolio-wrap">
          
          {
           userData.map((user,i)=>user.id===userId ? 
            <img key={i} src={user.ProfileImage ? user.ProfileImage : 'No'} className="img-fluid" alt="img" />
            :null)
          }
            <div className="portfolio-info">
            <h4>{userData.map((user)=>user.name ===decodedToken.name ? user.name : '')}</h4>
             
              <p><DirectionsTransitIcon/> From - {trip.from}  &nbsp; <WhereToVoteIcon/>To - {trip.to}</p>
              <p></p>
              <p><CalendarMonthIcon/>Date - {trip.TripDate ? trip.TripDate.split('T')[0] : ""}</p>
              <p><ScheduleIcon/>Time -{trip.TripTime}</p>
              
              <Link to={`/updateDetailsOfTrips/${trip._id}`}>   <button className=" orangeButton btn btn-success ">View Details</button></Link>
              <button className="redButton btn btn-danger " onClick={() => deleteTrip(trip._id)}>Delete</button>
            </div>
          </div>
          
       
        </div> 
 )
 : null
}     
       
      </div>
   
    </div>
  </div>
</section>


    <Footer/>
    </>
  )
}

