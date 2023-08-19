import React, { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import Footer from "../Footer/Footer";
import { Link, useHistory, useParams } from "react-router-dom";
import DirectionsTransitIcon from '@mui/icons-material/DirectionsTransit';
import WhereToVoteIcon from '@mui/icons-material/WhereToVote';
import PaidIcon from '@mui/icons-material/Paid';
const BASE_URL = process.env.REACT_APP_API_URI;
export default function ViewRequestAfterAcceptance() {
  const [requestData, setRequestData] = useState([]);
  const [shipment , setShipment] = useState([]);
  const [isDeclined , setIsDeclined] = useState(false)
  
  const history = useHistory();
  const [activeButton, setActiveButton] = useState('first')
 let [userData, setUserData] = useState([]);
  let encodedToken = localStorage.getItem("userToken");
let {requestId}= useParams();
  async function getRequest() {
    axios
      .get(`${BASE_URL}/v1/requests/viewRequestAfterAcceptance/`+requestId, {
       
        headers: { Authorization: `Bearer ${encodedToken}` },
      })

      .then((response) => {
        console.log("ss", response.data.requestDetails);
        setRequestData(response.data.requestDetails);
        setShipment(response.data.requests)
   
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function DeclineRequest() {
    axios.post(`${BASE_URL}/v1/requests/declinetrip/${requestId}`,{isDeclined: true},{ headers: {"Authorization" : `Bearer ${encodedToken}`} }).then((response) => {
        console.log(response.message);
        setIsDeclined(true)
        history.push('/acceptedrequestsDeliver')
      })
      .catch((error) => {
        console.log("errrr",error.response.data.message);
        
      });
  }
  const clickedButtonHandler = (e) => {
    console.log(e.target);
    const { name } = e.target;
    setActiveButton(name);
    console.log(activeButton);
  };

  async function getUserData() {
    axios
      .get(`${BASE_URL}/v1/users/allusers`)
      .then((response) => {
        console.log("user", response.data);
        setUserData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    getRequest();
     getUserData();
  }, []);


  return (
    <>
     <section id="portfolio" className="portfolio sections-bg">
  <div className="container" data-aos="fade-up">
    <div className="section-header">
      <h2>Request After Acceptance</h2>
      </div>
    <div className="portfolio-isotope" data-portfolio-filter="*" data-portfolio-layout="masonry" data-portfolio-sort="original-order" data-aos="fade-up" data-aos-delay={100}>
      <div>
        <ul className="portfolio-flters">
      
       <Link to={`/viewRequestAfterAcceptanceBuy/${requestId}`}>
       <button name="second"  className={ activeButton === "second" ? `${activeButton}` : "ss"}
          onClick={clickedButtonHandler} >   
         Buy
       </button>
        </Link> 
        
    
          <Link to={`/viewRequestAfterAcceptance/${requestId}`}>
          <button name="first" className={activeButton === "first" ? `${activeButton}` : ""}
          onClick={clickedButtonHandler}> 
          Deliver
          </button>
         </Link>
        </ul>
      </div>
      
      <div  className="row gy-4 portfolio-container">
      
      
      {requestData.buyOrdeliver === "deliver" ? (
        <div className="col-xl-3 col-md-6 portfolio-item filter-app">
          <div  className="portfolio-wrap">
          {userData.map((user, i) =>
                              user.id === requestData.trip.Traveler.userId ? (
                                <img
                                  key={i}
                                  src={user.ProfileImage}
                                  alt="person"
                                />
                              ) : null
                            )}
         
            <div className="portfolio-info">
              <h4>{userData.map((user)=>user.id === requestData.trip.Traveler.userId ? user.name : '')}</h4>
              <h3>{requestData.item}</h3>
              <p><DirectionsTransitIcon/> From - {requestData.from}</p>
              <p><WhereToVoteIcon/>To - {requestData.to}</p>
              <p><PaidIcon/> Reward - {requestData.reward}</p>
              <p>Trip Request</p>
              <p> From : {requestData.trip.from} - To : {requestData.trip.to}  -  Date : { requestData.trip.TripDate ?  requestData.trip.TripDate.split('T')[0] : "" } - Time : {requestData.trip.TripTime} - Price : {requestData.price}</p>
            
              <button className="redButton btn btn-danger" onClick={DeclineRequest}>Decline Request</button>
            </div>
          </div>
          
       
        </div>      
        )  :null
      }
      </div>
   
    </div>
  </div>
</section>

      <Footer />
    </>
  );
}
