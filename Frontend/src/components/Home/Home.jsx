import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import homeImg from '../../assets/images/deliver.svg'
import Img from '../../assets/images/hom.jpg'
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PaidIcon from '@mui/icons-material/Paid';
import Footer from '../Footer/Footer';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarsIcon from '@mui/icons-material/Stars';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import HandshakeIcon from '@mui/icons-material/Handshake';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import HailIcon from '@mui/icons-material/Hail';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {  motion as m } from "framer-motion"



export default class Home extends Component {
  render() {
    return (
      <>
<section className="intro">
  <div className="container">
    <div className="row">
      <div className="col-lg-4">
        <m.h1
                    initial={{opacity:0 , x:5}}
                    whileInView={{opacity:1, x:0 ,type:'spring'}}
                    transition={{type:'tween',duration:1}}
                    className=''
                    >Whether you're we can help you transfer packages anywhere.</m.h1>
                    <m.p 
                                initial={{opacity:0 , x:10}}
                                whileInView={{opacity:1, x:0 ,type:'spring'}}
                                transition={{type:'tween',duration:1}}
                          >Wasally is a social network that 
                          connects shoppers to travellers. 
                          Shoppers can buy their needs from all around the conutry & ship with a Traveller heading 
                          their way.</m.p>
          
              <div className="row">
                  <div className=" col-sm-5 introo">
                  <Link to="/register"><m.button
                              initial={{opacity:0 , x:15}}
                              whileInView={{opacity:1, x:0 ,type:'spring'}}
                              transition={{type:'tween',duration:1}}
                   className='btn btn-success orangeButton'>Get Started</m.button></Link>
                  </div>
                  <div className="col-sm-5 introo ">
                  <Link to="/login"><m.button
                              initial={{opacity:0 , x:20}}
                              whileInView={{opacity:1, x:0 ,type:'spring'}}
                              transition={{type:'tween',duration:1}}
                   className='btn btn-outline-danger transparentButton'>Login</m.button></Link>
                    </div>
             </div>

             <m.div
                         initial={{opacity:0 , x:30}}
                         whileInView={{opacity:1, x:0 ,type:'spring'}}
                         transition={{type:'tween',duration:1}}
              className="row registered">
              <div className="col-sm-6 introo">
                <h2 className='d-inline-block'>120K</h2> <p className='d-inline-block reg'>Shipments  <br/> Posted</p>
              </div>
              <div className="col-sm-6 introo">
                <h2 className='d-inline-block'>32K</h2> <p className='d-inline-block reg'>Trips  <br/> Posted</p>
              </div>
             </m.div>

      </div>
    
      <div className="col-lg-6 offset-lg-2 introimg">
      <m.img 
                  initial={{opacity:0 , x:-20}}
                  whileInView={{opacity:1, x:0 ,type:'spring'}}
                  transition={{type:'tween',duration:1}}
      className='img-thumbnail p-lg-0 border-0' src={homeImg} alt="profile img" />
        </div>
    </div>
  </div>
</section>

<section className="about">
  <div className="container">
  <div className="row">
    <div className="col-lg-4">
      <m.img
                  initial={{opacity:0 , x:20}}
                  whileInView={{opacity:1, x:0 ,type:'spring'}}
                  transition={{type:'tween',duration:1}}
       className='img-thumbnail p-lg-0 border-0' src={Img} alt="" />
    </div>
    <div className="offset-lg-1 col-lg-7">
      <m.h1
                  initial={{opacity:0 , x:-20}}
                  whileInView={{opacity:1, x:0 ,type:'spring'}}
                  transition={{type:'tween',duration:1}}
      >Simple Step, Big Move</m.h1>
      <m.p
                  initial={{opacity:0 , x:20}}
                  whileInView={{opacity:1, x:0 ,type:'spring'}}
                  transition={{type:'tween',duration:1}}
      >Wasally aims to reduce estimated delivery time with the least amount of money with more secure way guaranteeing an express service to your customers they've never experienced before!</m.p>
      <div className="row">
        <m.div
                    initial={{opacity:0 , x:20}}
                    whileInView={{opacity:1, x:0 ,type:'spring'}}
                    transition={{type:'tween',duration:1}}
         className="col-lg-3 box ">
          <TimeToLeaveIcon fontSize="large" />
          <p>Searching for Trip</p>
        </m.div>
        <m.div
                    initial={{opacity:0 , x:-20}}
                    whileInView={{opacity:1, x:0 ,type:'spring'}}
                    transition={{type:'tween',duration:1}}
         className="col-lg-3 box offset-lg-1">
        <LocalShippingIcon fontSize="large" />
        <p>Adding a Shipment</p>
          </m.div>
          <m.div
                      initial={{opacity:0 , x:20}}
                      whileInView={{opacity:1, x:0 ,type:'spring'}}
                      transition={{type:'tween',duration:1}}
           className="col-lg-3 box offset-lg-1">
            <PaidIcon fontSize="large"/>
          <p>Deal and Pay</p>
          </m.div>
      </div>
      <div className="row">
        {/* <div className="col-lg-3">
          <m.button
                      initial={{opacity:0 , x:20}}
                      whileInView={{opacity:1, x:0 ,type:'spring'}}
                      transition={{type:'tween',duration:1}}
           className='btn btn-success orangeButton'>Learn More</m.button>
        </div> */}
      </div>
    </div>
  </div>
  </div>
</section>


<section className="whywasally">
<div  className="image"  >
  <div className="container">
    <div className="row">
      <div className="col-lg-12">
<m.h1
            initial={{opacity:0 , x:20}}
            whileInView={{opacity:1, x:0 ,type:'spring'}}
            transition={{type:'tween',duration:1}}
 className='text-center'>Define Your Goals <br/>Using Wasally</m.h1>
</div>
</div>
<div className="row">
      <div className="col-sm-12 text-center">
<m.p
            initial={{opacity:0 , x:-20}}
            whileInView={{opacity:1, x:0 ,type:'spring'}}
            transition={{type:'tween',duration:1}}
 className='text-center'>Wasally, which lets users ship items for each other, is to <br/>
provide a convenient and cost-effective way for people to send <br/>
packages and items to one another.</m.p>
</div>
</div>

</div>
</div>
</section>


<section className="services">
<div className="container-xxl py-5">
  <div className="container">
    <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
      <m.h1
                  initial={{opacity:0 , x:20}}
                  animate={{ opacity: 1 }}
                  whileInView={{opacity:1, x:0 ,type:'spring'}}
                  transition={{type:'tween',duration:1}}
       className="section-title text-center  text-uppercase">Our Services</m.h1>
      <m.h4
                        initial={{opacity:0 , x:-20}}
                        animate={{ opacity: 1 }}
                        whileInView={{opacity:1, x:0 ,type:'spring'}}
                        transition={{type:'tween',duration:1}}
       className="mb-5">Explore Our Services </m.h4>
    </div>
    <div className="row g-4">
      <m.div      initial={{opacity:0 , x:5}}
                  animate={{ opacity: 1 }}
                  whileInView={{opacity:1, x:0 ,type:'spring'}}
                  transition={{type:'tween',duration:1}} className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
        <div className="service-item rounded" >
          <div className="service-icon bg-transparent border rounded p-1">
            <div className="w-100 h-100 border rounded d-flex align-items-center justify-content-center">
            <StarsIcon  className="star" fontSize="larger"/>
            </div>
          </div>
          <h5 className="mb-3">Save Money Shopping</h5>
          <p className="text-body mb-0">Shop from anywhere around the world and don't worry about the shipping headache. Our travellers will handle it.</p>
        </div>
      </m.div>
      <m.div 
                        initial={{opacity:0 , x:10}}
                        animate={{ opacity: 1 }}
                        whileInView={{opacity:1, x:0 ,type:'spring'}}
                        transition={{type:'tween',duration:1}}
      className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.2s">
        <div className="service-item rounded" >
          <div className="service-icon bg-transparent border rounded p-1">
            <div className="w-100 h-100 border rounded d-flex align-items-center justify-content-center">
            <AttachMoneyIcon className="star" fontSize="larger"/>
            </div>
          </div>
          <h5 className="mb-3">Make Money Traveling</h5>
          <p className="text-body mb-0">Make money while traveling and let your rewards from deliveries cover your travel expenses.</p>
        </div>
      </m.div>
      <m.div
                        initial={{opacity:0 , x:15}}
                        animate={{ opacity: 1 }}
                        whileInView={{opacity:1, x:0 ,type:'spring'}}
                        transition={{type:'tween',duration:1}}
       className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
        <div className="service-item rounded" >
          <div className="service-icon bg-transparent border rounded p-1">
            <div className="w-100 h-100 border rounded d-flex align-items-center justify-content-center">
              <HandshakeIcon className="star" fontSize="larger"/>
            </div>
          </div>
          <h5 className="mb-3">Verified Shoppers &amp; Travelers</h5>
          <p className="text-body mb-0">Trust is our top priority in wasally.</p>
        </div>
      </m.div>
      <m.div 
                        initial={{opacity:0 , x:-20}}
                        animate={{ opacity: 1 }}
                        whileInView={{opacity:1, x:0 ,type:'spring'}}
                        transition={{type:'tween',duration:1}}
      className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.4s">
        <div className="service-item rounded" >
          <div className="service-icon bg-transparent border rounded p-1">
            <div className="w-100 h-100 border rounded d-flex align-items-center justify-content-center">
            <LocalShippingIcon  className="star" fontSize="larger"/>
            </div>
          </div>
          <h5 className="mb-3">Guaranteed Delivery</h5>
          <p className="text-body mb-0">The travellers buy the items which guarantees delivery for the shopper.</p>
        </div>
      </m.div>
      <m.div
                        initial={{opacity:0 , x:-25}}
                        animate={{ opacity: 1 }}
                        whileInView={{opacity:1, x:0 ,type:'spring'}}
                        transition={{type:'tween',duration:1}}
       className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
        <div className="service-item rounded" >
          <div className="service-icon bg-transparent border rounded p-1">
            <div className="w-100 h-100 border rounded d-flex align-items-center justify-content-center">
           <CreditCardIcon  className="star" fontSize="larger" />
            </div>
          </div>
          <h5 className="mb-3">Several Payment Options</h5>
          <p className="text-body mb-0">Cash Collect , Visa , MasterCard</p>
        </div>
      </m.div>
      <m.div 
                        initial={{opacity:0 , x:-30}}
                        animate={{ opacity: 1 }}
                        whileInView={{opacity:1, x:0 ,type:'spring'}}
                        transition={{type:'tween',duration:1}}
      className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.6s">
        <div className="service-item rounded" >
          <div className="service-icon bg-transparent border rounded p-1">
            <div className="w-100 h-100 border rounded d-flex align-items-center justify-content-center">
            <HailIcon  className="star" fontSize="larger" />
            </div>
          </div>
          <h5 className="mb-3">Safe For Travellers</h5>
          <p className="text-body mb-0">The travellers know exactly what they are buying and transporting in their luggage and their payment is guaranteed upon delivery.</p>
        </div>
      </m.div>
    </div>
  </div>
</div>
</section>



<section id="faq" className="faq">
      <div className="container" data-aos="fade-up">

        <div className="section-title">
          <m.h2
                            initial={{opacity:0 , x:20}}
                            animate={{ opacity: 1 }}
                            whileInView={{opacity:1, x:0 ,type:'spring'}}
                            transition={{type:'tween',duration:1}}
          >SHOPPER<span className='orange'>AND</span>TRAVELER<span className='orange bold'> FAQ</span> </m.h2>
        </div>

        <m.ul
                          initial={{opacity:0 , x:-20}}
                          animate={{ opacity: 1 }}
                          whileInView={{opacity:1, x:0 ,type:'spring'}}
                          transition={{type:'tween',duration:1}}
         className="faq-list accordion" data-aos="fade-up">

          <li>
            <a data-bs-toggle="collapse" className="collapsed" data-bs-target="#faq1">How does it work for travelers ? <KeyboardArrowDownIcon className='arr'/> </a>
            <div id="faq1" className="collapse" data-bs-parent=".faq-list">
              <p>
              Step #1: Click on work. 
              <br />
              Step #2: Choose if you are a student or an employee.
              <br />
              Step #3: Enter your information (national ID , a photo of your national ID card, and an enrollment statement).
              </p>
            </div>
          </li>

          <li>
            <a data-bs-toggle="collapse" data-bs-target="#faq2" className="collapsed"> How to add trip ?<KeyboardArrowDownIcon className='arr'/></a>
            <div id="faq2" className="collapse" data-bs-parent=".faq-list">
            <p>
              Step #1: Click on your profile. 
              <br />
              Step #2: Choose add trip button.
              <br />
              Step #3: Enter information about your trip.
              </p>
            </div>
          </li>

          <li>
            <a data-bs-toggle="collapse" data-bs-target="#faq2" className="collapsed"> How can you buy or deliver something ?<KeyboardArrowDownIcon className='arr'/></a>
            <div id="faq2" className="collapse" data-bs-parent=".faq-list">
            <p>
              Step #1: Click on your profile. 
              <br />
              Step #2: Choose buy - deliver Button.
              <br />
              Step #3: Enter information about the item you want to buy or deliver and click on add request button.
              </p>
            </div>
          </li>


          <li>
            <a data-bs-toggle="collapse" data-bs-target="#faq3" className="collapsed"> What if the traveler delays or cancels his trip ?  <KeyboardArrowDownIcon className='arr'/></a>
            <div id="faq3" className="collapse" data-bs-parent=".faq-list">
              <p>
              In case of traveler or user delay you can cancel the deal and ship your items with another traveler.
              <br />
              Step #1: Click on your profile . 
              <br />
              Step #2: Choose your shipments button.
              <br />
              Step #3: Update or delete your shipment or trip .
              </p>
            </div>
          </li>

          <li>
            <a data-bs-toggle="collapse" data-bs-target="#faq4" className="collapsed">How To track your shipment ? <KeyboardArrowDownIcon className='arr'/></a>
            <div id="faq4" className="collapse" data-bs-parent=".faq-list">
              <p>
              Once the shipment is approved , the tracking of the shipment begins by Checkpoint tracker .
              </p>
            </div>
          </li>

          <li>
            <a data-bs-toggle="collapse" data-bs-target="#faq6" className="collapsed">What if the shipment is not sent or any damages occur to it ?<KeyboardArrowDownIcon className='arr'/></a>
            <div id="faq6" className="collapse" data-bs-parent=".faq-list">
              <p>
              Wassali will take responsibility for compensating customers with financial compensation for any losses they have incurred due to the shipment not being sent or any damages that may have occurred.
              </p>
            </div>
          </li>

          
        </m.ul>


      </div>
    </section>


<section id="contact" className="contact">
  <div className="container">
    <div className="section-title">
      <m.h2
                        initial={{opacity:0 , x:20}}
                        animate={{ opacity: 1 }}
                        whileInView={{opacity:1, x:0 ,type:'spring'}}
                        transition={{type:'tween',duration:1}}
      >Contact Us</m.h2>
  </div>
  </div> 
  <div className="container">
    <div className="row mt-5">
      <div className="col-lg-4">
      <div className="info">
          <m.div
                            initial={{opacity:0 , x:20}}
                            animate={{ opacity: 1 }}
                            whileInView={{opacity:1, x:0 ,type:'spring'}}
                            transition={{type:'tween',duration:1}}
           className="address">
            <h4><LocationOnIcon/> Location</h4>
            <p>Cleopatra, Alexandria Egypt</p>
          </m.div>

          <m.div
                            initial={{opacity:0 , x:-20}}
                            animate={{ opacity: 1 }}
                            whileInView={{opacity:1, x:0 ,type:'spring'}}
                            transition={{type:'tween',duration:1}}
           className="email">
         
            <h4><EmailIcon/> Email</h4>
            <p>Wassally.inc@gmail.com</p>
          </m.div>
          <m.div
                            initial={{opacity:0 , x:20}}
                            animate={{ opacity: 1 }}
                            whileInView={{opacity:1, x:0 ,type:'spring'}}
                            transition={{type:'tween',duration:1}}
           className="phone">
            
            <h4> <LocalPhoneIcon /> Call</h4>
            <p>01210357541</p>
          </m.div>
        </div>
      </div>
      <div className="col-lg-8 mt-5 mt-lg-0">
        <m.form
                          initial={{opacity:0 , x:-20}}
                          animate={{ opacity: 1 }}
                          whileInView={{opacity:1, x:0 ,type:'spring'}}
                          transition={{type:'tween',duration:1}}
         className="php-email-form">
          <div className="row">
            <div className="col-md-6 form-group">
              <input type="text" name="name" className="form-control" id="name" placeholder="Your Name" required />
            </div>
            <div className="col-md-6 form-group mt-3 mt-md-0">
              <input type="email" className="form-control" name="email" id="email" placeholder="Your Email" required />
            </div>
          </div>
          <div className="form-group mt-3">
            <input type="text" className="form-control" name="subject" id="subject" placeholder="Subject" required />
          </div>
          <div className="form-group mt-3">
            <textarea className="form-control" name="message" rows={5} placeholder="Message" required defaultValue={""} />
          </div>
          <div className="my-3">
            <div className="loading">Loading</div>
            <div className="error-message" />
            <div className="sent-message">Your message has been sent. Thank you!</div>
          </div>
          <div className="text-center"><button type="submit">Send Message</button></div>
        </m.form>
      </div>
    </div>
  </div>
</section>



<Footer/>
</>

)
}
}