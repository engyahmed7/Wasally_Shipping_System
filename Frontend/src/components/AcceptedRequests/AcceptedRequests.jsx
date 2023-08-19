import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Footer from '../Footer/Footer'
import { Link } from 'react-router-dom'
import DirectionsTransitIcon from '@mui/icons-material/DirectionsTransit';
import WhereToVoteIcon from '@mui/icons-material/WhereToVote';
import PaidIcon from '@mui/icons-material/Paid';
const BASE_URL = process.env.REACT_APP_API_URI;
export default function AcceptedRequests() {

  const [requestData,setRequestData]=useState([]);
  const [activeButton, setActiveButton] = useState('first')
  let [userData , setUserData] = useState([])
  let encodedToken = localStorage.getItem('userToken');


  async function getRequest(){
    axios.get(`${BASE_URL}/v1/requests/ViewAllAcceptedRequests`,{ headers: {"Authorization" : `Bearer ${encodedToken}`} }).then(
        (response)=>{
            console.log(response.data)
            setRequestData(response.data.requests)
            if(response.data.requests.length !== 0)
            paybuy();


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



const [Pay,setPay] = useState(false);

const [linkkBuy,setLinkkbuy] = useState('')


   async function paybuy() {
       axios.post(`${BASE_URL}/v1/requests/createCheckoutSessionWithPrice`,{Pay:true},{ headers: {"Authorization" : `Bearer ${encodedToken}`} }).then((response) => {
         
        console.log(response.data)
        setPay(true);
        setLinkkbuy(response.data.session)
          
          })
          .catch((error) => {
            console.log(error);
          });
      }



useEffect(()=>{
  getRequest();
  getUserData();
    
  
    
    },[]);
  

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
      <h2>Accepted Requests   <Link to="/qrcode">   <button className="  qrButton  btn btn-success ">Qr code</button></Link> 
      
     
      </h2>
     
      </div>
    <div className="portfolio-isotope" data-portfolio-filter="*" data-portfolio-layout="masonry" data-portfolio-sort="original-order" data-aos="fade-up" data-aos-delay={100}>
      <div>
        <ul className="portfolio-flters">
      
       <Link to="/acceptedrequests">
       <button name="first"  className={ activeButton === "first" ? `${activeButton}` : ""}
          onClick={clickedButtonHandler} > 
        Buy
       </button>
        </Link> 
        
    
          <Link to="/acceptedrequestsDeliver">
          <button name="second" className={activeButton === "second" ? `${activeButton}` : "ss"}
          onClick={clickedButtonHandler}> 
         Deliver
          </button>
         </Link>
        </ul>
      </div>
      
      
      <div  className="row gy-4 portfolio-container">
      {requestData.map((request,index)=>

        request.buyOrdeliver ==='buy' ? 
        <div key={index} className="col-xl-3 col-md-6 portfolio-item filter-app">
          <div  className="portfolio-wrap">
{
           userData.map((user,i)=>user.id===request.userId ? 
           <img key={i} src={user.ProfileImage ? user.ProfileImage : 'No'} className="img-fluid" alt="img" />
            :null)
          }
         
            <div className="portfolio-info">
              <h4>{userData.map((user)=>user.id ===request.userId ? user.name : '')}</h4>
              <h3>{request.item}</h3>
              <p><DirectionsTransitIcon/> From - {request.from}</p>
              <p><WhereToVoteIcon/>To - {request.to}</p>
              <p><PaidIcon/> Reward - {request.reward}</p>
              {request.buyOrdeliver == 'buy'  ?   <Link to={`/viewRequestAfterAcceptanceBuy/${request.id}`}>   <button className=" orangeButton btn btn-success ">View Details</button></Link> : 
                            <Link to={`/viewRequestAfterAcceptance/${request.id}`}>   <button className=" orangeButton btn btn-success ">View Details</button></Link>
              }  

            <Link to={`/tracking/${request.id}`}>   <button className=" orangeButton btn btn-success ">Tracking Request</button></Link>
            <Link to={`/chat/${request.id}`}>   <button className=" orangeButton btn btn-success ">Chat</button></Link>

{
  request.state === 'delivered'?'':
  <a  href={`${linkkBuy}`} target="_blank" rel="noopener noreferrer">
  <button className=' orangeButton btn btn-success' onClick={paybuy}>Pay</button>
 </a>
}

           
            </div>
          </div>
          
       
        </div>      
        :null
      )}
      </div>
           
    </div>
  </div>
</section>

    <Footer/>
    </>
  )
}

