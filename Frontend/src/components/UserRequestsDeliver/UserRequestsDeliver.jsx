import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import DirectionsTransitIcon from '@mui/icons-material/DirectionsTransit';
import WhereToVoteIcon from '@mui/icons-material/WhereToVote';
import PaidIcon from '@mui/icons-material/Paid';
const BASE_URL = process.env.REACT_APP_API_URI;
export default function UserRequestsDeliver() {
  const [requestData, setRequestData] = useState([]);
  const [shipment , setShipment] = useState([]);
  const [activeButton, setActiveButton] = useState('first')
 let [userData, setUserData] = useState([]);
  let encodedToken = localStorage.getItem("userToken");

  async function getRequest() {
    axios
      .get(`${BASE_URL}/v1/requests/viewTravelersRequests`, {
       
        headers: { Authorization: `Bearer ${encodedToken}` },
      })

      .then((response) => {
        console.log(response.data.requests.TripOfferedPrice);
        setRequestData(response.data.requests.TripOfferedPrice);
        setShipment(response.data.requests)
   
      })
      .catch((error) => {
        console.log(error);
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
      <h2>Your Shipment Request</h2>
      </div>
 
    <div className="portfolio-isotope" data-portfolio-filter="*" data-portfolio-layout="masonry" data-portfolio-sort="original-order" data-aos="fade-up" data-aos-delay={100}>
      <div>
        <ul className="portfolio-flters">
      
       <Link to="/userRequests">
       <button name="second"  className={ activeButton === "second" ? `${activeButton}` : "ss"}
          onClick={clickedButtonHandler} > 
        Buy
       </button>
        </Link> 
        
    
          <Link to="/userRequestsDeliver">
          <button name="first" className={activeButton === "first" ? `${activeButton}` : ""}
          onClick={clickedButtonHandler}> 
         Deliver
          </button>
         </Link>
        </ul>
      </div>
      {requestData && requestData.map((request, ind) => {
        return(
      <div key={ind}  className="row gy-4 portfolio-container">
      
        <div className="col-xl-3 col-md-6 portfolio-item filter-app">
        {shipment.buyOrdeliver === "deliver" ? (
        <div>
            <div className="portfolio-wrap">
            {userData.map((user, i) =>
                              user.id === request.trip.Traveler.userId.id ? (
                                <img
                                  key={i}
                                  src={user.ProfileImage}
                                  alt="person"
                                />
                              ) : null
              )}
            
                <div className="portfolio-info">
                <h4> {userData.map((user,indexx) =>
                                <span key={indexx}> {user.id ==request.trip.Traveler.userId.id ? user.name : ""}</span>
                                )}{" "}</h4>

                
                 <p> From : {request.trip.from} - To : {request.trip.to}  -  Date : { request.trip.TripDate ?  request.trip.TripDate.split('T')[0] : "" } - Time : {request.trip.TripTime} - Price : {request.price}</p>
            

                <p >Your Shipment</p>
                <h3>{shipment.item}</h3>
            <p><DirectionsTransitIcon/> From - {shipment.from}</p>
                <p><WhereToVoteIcon/>To - {shipment.to}</p>
                <p><PaidIcon/> Reward - {shipment.reward}</p>
                <Link to={`/acceptOrDeclineTrip/${request.trip._id}`}>   <button className=" orangeButton btn btn-success ">View Details</button></Link>
                </div>
            </div>
    
            </div>
                      ) : (
                        null
                      )}

        </div>     
           
          
       
      </div>
        );
})}
    </div>
  </div>
</section>

      <Footer />
    </>
  );
}
