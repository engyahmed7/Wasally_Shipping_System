import React, { useState } from 'react'
import style from "./Work.module.css"
import { Link } from 'react-router-dom'
import axios from 'axios';
import student from '../../assets/images/student.png'
import employee from '../../assets/images/employee.png'

const BASE_URL = process.env.REACT_APP_API_URI;

export default function Work() {
    const [isUpdated, setIsUpdated] = useState(false);
    const [isStudentUpdated , setIsStudentUpdated] = useState(false)
    let encodedToken = localStorage.getItem('userToken');
    
    const handleUpdateEmployee = () => {
        const config = {
            headers: { Authorization: `Bearer ${encodedToken}` }
        };
      axios.patch(`${BASE_URL}/v1/travelers/employee`,{isUpdated: true} ,config )
        .then(response => {
          setIsUpdated(true); 
        })
        .catch(error => {
          console.log(error);
        });
    }

    const handleUpdateStudent = () => {
        axios.put(`${BASE_URL}/v1/travelers/student` ,{isStudentUpdated:true} , { headers: {"Authorization" : `Bearer ${encodedToken}`} })
          .then(response => {
            setIsStudentUpdated(true);
            
          })
          .catch(error => {
            console.log(error);
          });
      }


  return (
    <>
<div className="container">
<div className={style.spliter}>
  <div className={style.splitleft}>
    {isUpdated ? <p>Successfully updated to true!</p> : null}
    <Link to="/employeeform" onClick={handleUpdateEmployee}>
    <div className={style.centered}>
    <img style={{border:"2px solid #fd7402ed"}}  className='mb-2  img-thumbnail' src={ employee } alt="profile img" />
      <h2 style={{color:"#fd7402ed"}}>Employee</h2>
      <p style={{color:"#fd7402ed"}}>Join Us</p>
    </div>
    </Link>

  </div>
  

  <div className={style.splitright}>
    {isStudentUpdated ? <p>Successfully updated to true!</p> : null}  
    <Link  to="/studentform" onClick={handleUpdateStudent}>
    <div className={style.centered}>
    <img style={{border:"5px solid #ffffff"}} className='mb-2  img-thumbnail ' src={ student } alt="profile img" />
      <h2 style={{color:"white"}} >STUDENT</h2>
      <p style={{color:"white"}}>Join Us</p>
    </div>
    </Link>

  </div>
</div>
</div>
    </>
  )
}