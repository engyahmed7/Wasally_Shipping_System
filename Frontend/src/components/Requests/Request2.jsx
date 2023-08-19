import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Footer from '../Footer/Footer'
import DirectionsTransitIcon from '@mui/icons-material/DirectionsTransit';
import WhereToVoteIcon from '@mui/icons-material/WhereToVote';
import { Link } from 'react-router-dom'
import PaidIcon from '@mui/icons-material/Paid';
import noImage from '../../assets/images/def.jpg'
const BASE_URL = process.env.REACT_APP_API_URI;
export default function Request2() {

  const [nameList] = useState([])
  const [search, setSearch] = useState("")

  const [requestData,setRequestData]=useState([]);
  const [activeButton, setActiveButton] = useState('first')
  let [userData , setUserData] = useState([])
    let [filteredRequest , setFilteredRequests] = useState([])
  let encodedToken = localStorage.getItem('userToken');
  async function getRequest(){
    axios.get(`${BASE_URL}/v1/requests/viewAllRequests`,{ headers: {"Authorization" : `Bearer ${encodedToken}`} }).then(
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
 
  const clickedButtonHandler = (e) => {
    console.log(e.target);
    const { name } = e.target;
    setActiveButton(name);
    console.log(activeButton);
  };

    function filter(searchTerm) {
    setRequestData(prev=>prev.filter(prev.includes(searchTerm)))
  }

  useEffect(()=>{
    const matched = searchCities(search,requestData)
    setFilteredRequests(matched)
  },[requestData, search])

  function searchCities(search, trips) {
    const matching = [];
    
    trips.forEach(trip => {
      if (trip.to.toLowerCase().includes(search.toLowerCase())||trip.from.toLowerCase().includes(search.toLowerCase())) {
        matching.push(trip);
      }
    });
    
    return matching;
  }
  




  
  return (
 
    <>

<section id="portfolio " className="portfolio sections-bg">
  <div className="container" data-aos="fade-up">
    <div className="section-header">
      <h2>Shipments</h2>
            {nameList.filter((item)=>{
        if (search===""){
          return item
        }
        else if(item.name.tolowercase().includes(search.tolowercase())){
          return item
        }
      })
      .map((item)=>{
        return <h4> {item.name} </h4>
      })
      }
      </div>
    <div className="portfolio-isotope" data-portfolio-filter="*" data-portfolio-layout="masonry" data-portfolio-sort="original-order" data-aos="fade-up" data-aos-delay={100}>
      <div>
        <ul className="portfolio-flters">
      
       <Link to="/request">
       <button name="second"  className={ activeButton === "second" ? `${activeButton}` : "ss"}
          onClick={clickedButtonHandler} > 
         Buy
       </button>
        </Link> 
        
    
          <Link to="/request2">
          <button name="first" className={activeButton === "first" ? `${activeButton}` : ""}
          onClick={clickedButtonHandler}> 
          Deliver
          </button>
         </Link>
        </ul>
      </div>
      <div className='searchbox'>
      <input className='search-box'  id='search' type='search' placeholder='TO' onChange={(e)=>setSearch(e.target.value)} pattern=".*\S.*" required/>
      <input className='search-box ms-3'  id='search' type='search' placeholder='FROM' onChange={(e)=>setSearch(e.target.value)} pattern=".*\S.*" required/>

      </div>

      <br />
      
      <div  className="row gy-4 portfolio-container">
      {filteredRequest.map((request,index)=>

request.buyOrdeliver ==='deliver' ? 
        <div key={index} className="col-xl-3 col-md-6 portfolio-item filter-app">
          <div  className="portfolio-i ">
          {/* {
           userData.map((user,i)=>user.id===request.userId ? 
            <img key={i} src={user.ProfileImage ? user.ProfileImage : 'No'} className="img-fluid" alt="img" />
            :null)
          } */}
           { 
          userData.map((user,i)=>user.id === request.userId ? 
          user.ProfileImage ?
            <img key={i} src={user.ProfileImage }  alt="person" /> 
            
            :
            <img key={i} src={noImage}  alt="person" /> 
            :null)
            }
         
         
            <div className="portfolio-info">
              <h4>{userData.map((user)=>user.id ===request.userId ? user.name : '')}</h4>
              <h3>{request.item}</h3>
              <p><DirectionsTransitIcon/> From - {request.from}</p>
              <p><WhereToVoteIcon/>To - {request.to}</p>
              <p><PaidIcon/>Reward - {request.reward}</p>
              <Link to={`/detailspfshippmentuser1/${request.id}`}>   <button className=" orangeButton btn btn-success ">View Details</button></Link>
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
