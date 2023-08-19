

import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Footer extends Component {
  render() {
    return (
      <>
<footer>
  <div className="container footer">
    <div className="row upp">
      <div className="col-lg-6">
      <h4> <div id="circle" className='d-inline-block'></div> Wasally</h4>
      <p>Help you to ship your<br/> packages</p>
       
      </div>
      <div className="col-lg-2">
   
        <ul>
          <li className='head'>   <h4>Our Services</h4></li>
          <li><Link to="">Web Design</Link></li>
          <li><Link to="">Web Development</Link></li>
          <li><Link to="">Product Management</Link></li>
          <li><Link to="">Marketing</Link></li>
        </ul>
      </div>
      <div className="col-lg-2">
       
       <ul>
       <li className='head'>   <h4>Social Media</h4></li>
         <li><Link to="">Facebook</Link></li>
         <li><Link to="">Instagram</Link></li>
         <li><Link to="">LinkedIn</Link></li>
         <li><Link to="">Whatsapp</Link></li>
       </ul>
       </div>
      <div className="col-lg-2">
 
        <ul>
        <li className='head'>   <h4>Contact Us</h4></li>
        <li>  Cleopatra, Alexandria </li>
        <li>   Egypt </li> 
        <li>   01210357541 </li> 
        <li>  Wassally.inc@gmail.com </li> 
        
        </ul>
        </div>
     
    </div>
    <div className="row">
      <div className="col-lg-4">
    <p>2023 ©  Wassally Inc. Copyright & All rights reserved</p> 
      </div>
      <div className="col-lg-2 offset-lg-4">
      <p> Terms and conditions</p> 
      </div>
      <div className="col-lg-2">
      <p>  Privacy Policy</p> 
      </div>
    </div>
  </div>
</footer>
      </>
    )
  }
}
