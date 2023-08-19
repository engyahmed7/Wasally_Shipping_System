import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../Footer/Footer";
import { Link,useHistory, useParams } from "react-router-dom";
import DirectionsTransitIcon from '@mui/icons-material/DirectionsTransit';
import WhereToVoteIcon from '@mui/icons-material/WhereToVote';
import PaidIcon from '@mui/icons-material/Paid';
const BASE_URL = process.env.REACT_APP_API_URI;
export default function ViewRequestAfterAcceptanceBuy() {
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
        console.log(response.data.requestDetails);
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
      {/* <section className="request">
        <div className="container">
          <div className="row">
          </div>
          <div className="navL">
    <Link to={`/viewRequestAfterAcceptanceBuy/${requestId}`}>
      
 <button name="first"  className={ activeButton === "first" ? `${activeButton}` : ""}
          onClick={clickedButtonHandler}>
          Buy Something
          </button>
    </Link>
    <Link to={`/viewRequestAfterAcceptance/${requestId}`}>
    <button name="second"
          className={activeButton === "second" ? `${activeButton}` : ""}
          onClick={clickedButtonHandler}>
            Deliver Something
          </button>
      </Link>
  </div>
            
                      {requestData.buyOrdeliver === "buy" ? (
                       <div  >
                    
                        <div   className="row mt-3">
                          
                    <div className="preview-card ">
                      
                      <div className="preview-card__wrp ">
                        <div className="preview-card__item">
                          <div className="preview-card__img">
                    
                            {userData.map((user, i) =>
                              user.id === requestData.trip.Traveler.userId ? (
                                <img
                                  key={i}
                                  src={user.ProfileImage}
                                  alt="person"
                                />
                              ) : null
                            )}
                          </div>

                          <div className="preview-card__content">


                          <h2 className="previewcardh5 fw-bold ">Your Shipment Data</h2>
                          <h5 className="previewcardh5 fw-bold"> From <span className='green'>|</span> {requestData.from}</h5>
                          <h5 className="previewcardh5 fw-bold"> To <span className='green'>|</span> {requestData.to}</h5>
                          <h5 className="previewcardh5 fw-bold"> Item <span className='green'>|</span> {requestData.item}</h5>
                          <h5 className="previewcardh5 fw-bold"> Location <span className='green'>|</span> {requestData.location}</h5>
                          <h5 className="previewcardh5 fw-bold"> Weight <span className='green'>|</span> {requestData.weight}</h5>
                          <h5 className="previewcardh5 fw-bold"> Category <span className='green'>|</span> {requestData.category}</h5>
                 
                    
                          <hr className="previewcardh5 fw-bold " />
                          <h2 className="previewcardh5 fw-bold ">Trip Data</h2>
                                    

              
                          <h5 className="previewcardh5 fw-bold"> <i className="fa-solid fa-train-subway"></i>  From <span className='green'>|</span>  {requestData.trip.from}   <span className='space'>  To <span className='green'>|</span>  {requestData.trip.to}</span></h5>
                          <h5 className="previewcardh5 fw-bold"> Trip Date <span className='green'>|</span> {requestData.trip.TripDate ? requestData.trip.TripDate.split('T')[0] : "" }</h5>
                          <h5 className="previewcardh5 fw-bold"> Trip Time <span className='green'>|</span> {requestData.trip.TripTime}</h5>
                  </div>
                          <br />

                          <button type='button' onClick={DeclineRequest}>DECLINE TRIP REQUEST</button>
                        </div>
                      </div>
                    </div>
                  </div>
                       </div>
                   
                   
                  
                      ):null}

           
              
          
  
        </div>
      </section> */}





<section id="portfolio" className="portfolio sections-bg">
  <div className="container" data-aos="fade-up">
    <div className="section-header">
      <h2>Request After Acceptance</h2>
      </div>
    <div className="portfolio-isotope" data-portfolio-filter="*" data-portfolio-layout="masonry" data-portfolio-sort="original-order" data-aos="fade-up" data-aos-delay={100}>
      <div>
        <ul className="portfolio-flters">
      
       <Link to={`/viewRequestAfterAcceptanceBuy/${requestId}`}>
       <button name="first"  className={ activeButton === "first" ? `${activeButton}` : ""}
          onClick={clickedButtonHandler} >   
         Buy
       </button>
        </Link> 
        
    
          <Link to={`/viewRequestAfterAcceptance/${requestId}`}>
          <button name="second" className={activeButton === "second" ? `${activeButton}` : "ss"}
          onClick={clickedButtonHandler}> 
          Deliver
          </button>
         </Link>
        </ul>
      </div>
      
      <div  className="row gy-4 portfolio-container">
      

      {requestData.buyOrdeliver === "buy" ? (
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
              <h4>{userData.map((user)=>user.id ===requestData.trip.Traveler.userId ? user.name : '')}</h4>
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
