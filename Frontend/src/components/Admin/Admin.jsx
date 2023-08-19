import React,{useState,useEffect} from 'react'
import axios from 'axios'


const BASE_URL = process.env.REACT_APP_API_URI;



export default function Admin() {
    const [travelers,setTravelers]=useState([]);
    // const [isAccepted, setIsAccepted] = useState(false);
    let encodedToken = localStorage.getItem('userToken');
    async function getTravelers(){
        axios.get(`${BASE_URL}/v1/admins/getAllTravelers`,{ headers: {"Authorization" : `Bearer ${encodedToken}`} }).then(
            (response)=>{
                console.log(response.data.travelers)
                setTravelers(response.data.travelers)
    
            }
        ).catch(
            (error)=>{
                console.log(error)
    
            }
        )
    }
    const handleTravelerAcceptance = (travelerId) => {
      
        axios.patch(`${BASE_URL}/v1/admins/verifyDocuments/${travelerId}` ,{isStudentUpdated:true} , { headers: {"Authorization" : `Bearer ${encodedToken}`} })
          .then(response => {
            // setIsAccepted(true);
            getTravelers();
          })
          .catch(error => {
            console.log(error);
          });
      }
    
    useEffect(()=>{
        getTravelers();
        
          
          },[]);
        
  return (
    <>
   <section id="portfolio" className="portfolio sections-bg">
  <div className="container" data-aos="fade-up">
    <div className="section-header">
      <h2>Travelers Pending</h2>
     
      </div>
    <div className="portfolio-isotope" data-portfolio-filter="*" data-portfolio-layout="masonry" data-portfolio-sort="original-order" data-aos="fade-up" data-aos-delay={100}>
    

      <div  className="row gy-4 portfolio-container">
     
      <div >
     <div  className="card-container">
          
      {travelers.map((traveler,index)=>
     

     traveler.isAdminVerificationPending === false ?
  <div  key={index} className="card">
  <img src={traveler.NationalIdCard} alt="NationalIdCard" />
    {traveler.isStudent === false ?
     <img src={traveler.EmployeeCompanyId} alt="EmployeeCompanyId" />
    :
    <>
    <img src={traveler.StudentUniversityId} alt="StudentUniversityId" />
    <img src={traveler.CollegeEnrollmentStatement} alt="CollegeEnrollmentStatement" />
    </>
    }
    
   
  
    <p>Name : {traveler.userId.name}</p>
    <p>National id : 301025879944586</p>
    <div className="action-buttons">
      <button className="orangeButton btn btn-success " onClick={() => handleTravelerAcceptance(traveler._id)}>Accept</button>
    </div>
  </div>


 
        :null
      )}
      </div>

        
             
</div> 
      </div>
   
    </div>
  </div>
</section>

    </>
  )
}
