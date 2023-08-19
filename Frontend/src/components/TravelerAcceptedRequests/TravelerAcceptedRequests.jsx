import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Footer from '../Footer/Footer'
import { Link } from 'react-router-dom'
import DirectionsTransitIcon from '@mui/icons-material/DirectionsTransit';
import WhereToVoteIcon from '@mui/icons-material/WhereToVote';
import PaidIcon from '@mui/icons-material/Paid';
const BASE_URL = process.env.REACT_APP_API_URI;
export default function TravelerAcceptedRequests() {

  const [requestData,setRequestData]=useState([]);
  const [activeButton, setActiveButton] = useState('first')
  let [userData , setUserData] = useState([])
  let encodedToken = localStorage.getItem('userToken');


  async function getRequest(){
    axios.get(`${BASE_URL}/v1/requests/getAceeptedRequest`,{ headers: {"Authorization" : `Bearer ${encodedToken}`} }).then(
        (response)=>{
            console.log(response.data)
            setRequestData(response.data.requests)

        }
    ).catch(
        (error)=>{
            console.log(error)

        }
           )
}
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
  getRequest();
  getUserData();
    
    },[]);
  return (
 
    <>
<section id="portfolio" className="portfolio sections-bg">
  <div className="container" data-aos="fade-up">
    <div className="section-header">
      <h2>Shipments</h2>
      </div>
    <div className="portfolio-isotope" data-portfolio-filter="*" data-portfolio-layout="masonry" data-portfolio-sort="original-order" data-aos="fade-up" data-aos-delay={100}>
    
      
      <div  className="row gy-4 portfolio-container">
      {requestData.map((request,index)=>


        <div key={index} className="col-xl-3 col-md-6 portfolio-item filter-app">
          <div  className="portfolio-wrap">
          {
           userData.map((user,i)=>user.id===request.userId.id ? 
            <img key={i} src={user.ProfileImage ? user.ProfileImage : 'No'} className="img-fluid" alt="img" />
            :null)
          }
         
            <div className="portfolio-info">
              <h4>{userData.map((user)=>user.id ===request.userId.id ? user.name : '')}</h4>
              <h3>{request.item}</h3>
              <p><DirectionsTransitIcon/> From - {request.from}</p>
              <p><WhereToVoteIcon/>To - {request.to}</p>
              <p><PaidIcon/> Reward - {request.reward}</p>
              <Link to={`/detailsofacceptedrequest/${request.id}`}>   <button className=" orangeButton btn btn-success ">View Details</button></Link>
              <Link to={`/chat/${request.id}`}>   <button className=" orangeButton btn btn-success ">Chat</button></Link>
            </div>
          </div>
          
       
        </div>      
     
      )}
      </div>
   
    </div>
  </div>
</section>



    <Footer/>
    </>
  )
}

