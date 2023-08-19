



import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import DirectionsTransitIcon from '@mui/icons-material/DirectionsTransit';
import WhereToVoteIcon from '@mui/icons-material/WhereToVote';
import PaidIcon from '@mui/icons-material/Paid';
const BASE_URL = process.env.REACT_APP_API_URI;
export default function RequestSendBuy() {
  const [requestData, setRequestData] = useState([]);

  const [activeButton, setActiveButton] = useState("first");
  let [userData, setUserData] = useState([]);
  let encodedToken = localStorage.getItem("userToken");

  async function getRequest() {
    axios
      .get(`${BASE_URL}/v1/travelers/getTravellerOwnRequests`, {
       
        headers: { Authorization: `Bearer ${encodedToken}` },
      })

      .then((response) => {
        console.log(response.data.trips);
        setRequestData(response.data.trips);
   
      })
      .catch((error) => {
        console.log(error);
      });
  }

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

  const clickedButtonHandler = (e) => {
    console.log(e.target);
    const { name } = e.target;
    setActiveButton(name);
    console.log(activeButton);
  };
  return (
    <>
      <section id="portfolio" className="portfolio sections-bg">
  <div className="container" data-aos="fade-up">
    <div className="section-header">
      <h2>Your Trip Requests</h2>
      </div>
 
    <div className="portfolio-isotope" data-portfolio-filter="*" data-portfolio-layout="masonry" data-portfolio-sort="original-order" data-aos="fade-up" data-aos-delay={100}>
      <div>
        <ul className="portfolio-flters">
      
       <Link to="/requestSendBuy">
       <button name="second"  className={ activeButton === "second" ? `${activeButton}` : "ss"}
          onClick={clickedButtonHandler} > 
       Buy
       </button>
        </Link> 
        
    
          <Link to="/requestSendDeliver">
          <button name="first" className={activeButton === "first" ? `${activeButton}` : ""}
          onClick={clickedButtonHandler}> 
         Deliver
          </button>
         </Link>
        </ul>
      </div>
      {requestData.map((request, ind) => {
        return(
      <div key={ind}  className="row gy-4 portfolio-container">
        {request.RequestsList.map((item, index) => {
        return(
        <div  key={'test-'+index} className="col-xl-3 col-md-6 portfolio-item filter-app">
        {item.buyOrdeliver === "deliver" ? (
        <div>
            <div className="portfolio-wrap">
            
                
                {userData.map((user, i) =>
                user.id === item.userId ? (
                    <img
                    key={i}
                    src={user.ProfileImage}
                    alt="person"
                    />
                ) : null
                )}
            
                <div className="portfolio-info">
                <h4>{userData.map((user,indexx) =>
                                <span key={indexx}> {user.id ==item.userId ? user.name : ""}</span>
                                )}{" "}</h4>
                <h3>{item.item}</h3>
                <p><DirectionsTransitIcon/> From - {item.from}</p>
                <p><WhereToVoteIcon/>To - {item.to}</p>
                <p><PaidIcon/> Reward - {item.reward}</p>

                <p >Trip</p>
            <p> To : {request.to} - From : {request.from} -  Date : {request.TripTime ? request.TripDate.split('T')[0] : "" } - Time : {request.TripTime}</p>
            
                <Link to={`/acceptOrDeclineShipment/${item.id}`}>   <button className=" orangeButton btn btn-success ">View Details</button></Link>
                </div>
            </div>
    
            </div>
                      ) : (
                        null
                      )}

        </div>     
           
           );
        })}
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

