import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import UserForm from '../UserForm/UserForm';
import EmployeeForm from '../EmployeeForm/EmployeeForm';
import Home from "../Home/Home";
import Navbar from '../Navbar/Navbar';
import StudentForm from '../StudentForm/StudentForm';
import DetailsOfShippmentUser from '../DetailsOfShippmentUser/DetailsOfShippmentUser';
import DetailsOfShipmentOfUser1 from '../DetailsOfShipmentOfUser1/DetailsOfShipmentOfUser1';
import UserDetails2 from '../UserDetails2/UserDetails2';
import TripDetails from '../TripDetails/TripDetails';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Chat from '../Chat/Chat';
import Request from '../Requests/Request'
import Request2 from '../Requests/Request2'
import Profile from '../Profile/Profile';
import Profile2 from '../Profile2/Profile2';
import Work from '../Work/Work';
import jwtDecode from 'jwt-decode';
import TravelerForm from '../TravelerForm/TravelerForm';
import Trip from '../Trip/Trip';
import TravelerTrip from '../TravelerTrip/TravelerTrip';


import userShipment from '../UserShipments/UserShipments'
import userShipment2 from '../UserShipments2/UserShipments2'
import UpdateDetailsOfShipments from '../UpdateDetailsOfShipments/UpdateDetailsOfShipments';
import UpdateDetailsOfTrips from '../UpdateDetailsOfTrips/UpdateDetailsOfTrips';
import ShipmentSendTrip from '../ShipmentSendTrip/ShipmentSendTrip';
import RequestSendBuy from '../RequestSendBuy/RequestSendBuy';
import RequestSendDeliver from '../RequestSendDeliver/RequestSendDeliver';
import AcceptOrDeclineShipment from '../AcceptOrDeclineShipment/AcceptOrDeclineShipment';
import PasswordReset from '../PasswordReset/PasswordReset';
import QrCode from '../QrCode/QrCode';
import QrcodeRedirect from '../qrcodeRedirect/QrcodeRedirect';
import UserRequests from '../UserRequests/UserRequests';
import UserRequestsDeliver from '../UserRequestsDeliver/UserRequestsDeliver';
import AcceptOrDeclineTrip from '../AcceptOrDeclineTrip/AcceptOrDeclineTrip';
import AcceptedRequests from '../AcceptedRequests/AcceptedRequests';
import AcceptedrequestsDeliver from '../AcceptedRequestsDeliver/AcceptedRequestsDeliver';
import ViewRequestAfterAcceptance from '../ViewRequestAfterAcceptance/ViewRequestAfterAcceptance';
import ViewRequestAfterAcceptanceBuy from '../ViewRequestAfterAcceptanceBuy/ViewRequestAfterAcceptanceBuy.jsx';
import Rating from '../Rating/Rating';
import Qr from '../qr/Qr';
import TravelerAcceptedRequests from '../TravelerAcceptedRequests/TravelerAcceptedRequests';
import DetailsOfaccepted from '../DetailsOfaccepted/DetailsOfaccepted';
import Tracking from '../Tracking/Tracking';
import PasswordReset2 from '../PasswordReset2/PasswordReset2';
import ConfirmEmail from '../ConfirmEmail/ConfirmEmail';
import Admin from '../Admin/Admin';



const App = () => {

  let history = useHistory();
  let [loginUser , setLoginUser] = useState(null);

  function getUserInfo(){
    let encodedToken = localStorage.getItem('userToken');
   let userData =  jwtDecode(encodedToken);
   setLoginUser(userData);
  }


  useEffect(()=>{
    if(localStorage.getItem('userToken')){
      getUserInfo();
    }
  },[])


function logOut(){
  localStorage.removeItem('userToken');
  setLoginUser(null);
  history.push('/login');

}
  return (
    
    <Router>
        <Navbar loginUser={loginUser} logOut={logOut}/>
    
      <Switch>
        
        
        <PrivateRoute path="/profile" component={Profile} allowedRoles={['user']} />
        <PrivateRoute path='/userform' component={UserForm}  allowedRoles={['user']}/> 

        <PrivateRoute path="/profile2" component={Profile2} allowedRoles={['traveler']} />
        <PrivateRoute path='/acceptOrDeclineShipment/:requestId' component={AcceptOrDeclineShipment} allowedRoles={['traveler']}/> 
           <PrivateRoute path='/updateDetailsOfTrips/:tripId' component={UpdateDetailsOfTrips} allowedRoles={['traveler']}/> 
           <PrivateRoute path='/profile2'  component={Profile2} allowedRoles={['traveler']}/>
           <PrivateRoute path='/travelerForm' component={TravelerForm} allowedRoles={['traveler']}/> 
              <PrivateRoute path='/tripdetails' component={TripDetails} allowedRoles={['traveler']}/> 
              <PrivateRoute path='/travelertrips' component={TravelerTrip} allowedRoles={['traveler']}/> 
              <PrivateRoute path='/requestSendBuy' component={RequestSendBuy} allowedRoles={['traveler']}/>
              <PrivateRoute path='/requestSendDeliver' component={RequestSendDeliver} allowedRoles={['traveler']}/> 




        <PrivateRoute path="/request" component={Request} allowedRoles={['user', 'traveler']} />
        <PrivateRoute path="/request2" component={Request2} allowedRoles={['user', 'traveler']} />
   


        <PrivateRoute path='/UpdateDetailsOfShipments/:requestId' component={UpdateDetailsOfShipments} allowedRoles={['user', 'traveler']}/>   
              <PrivateRoute path='/acceptOrDeclineTrip/:tripId' component={AcceptOrDeclineTrip}  allowedRoles={['user', 'traveler']}/>   
           
              <PrivateRoute path='/userdetails2' component={UserDetails2} allowedRoles={['user', 'traveler']}/>  
              <PrivateRoute path='/shipmentSendTrip/:tripId' component={ShipmentSendTrip} allowedRoles={['user', 'traveler']}/> 
              <PrivateRoute path='/chat/:requestId' component={Chat} allowedRoles={['user', 'traveler']}/> 
              
              <PrivateRoute path='/request' component={Request} allowedRoles={['user', 'traveler']}/> 
              <PrivateRoute path='/request2' component={Request2} allowedRoles={['user', 'traveler']}/> 
       
              <PrivateRoute path='/rating/:travelerId' component={Rating} allowedRoles={['user', 'traveler']}/>
              <PrivateRoute path='/work' component={Work} allowedRoles={['user', 'traveler']}/> 
             
              <PrivateRoute path='/trip' component={Trip} allowedRoles={['user', 'traveler']}/> 
              <PrivateRoute path='/traveleracceptedrequests' component={TravelerAcceptedRequests} allowedRoles={['traveler']}/> 
              <PrivateRoute path='/detailsofacceptedrequest/:requestId' component={DetailsOfaccepted} allowedRoles={['traveler']}/> 

              <PrivateRoute path='/qrcode' component={QrCode} allowedRoles={['user']}/> 
             
           
             
              <PrivateRoute path='/tracking/:requestId' component={Tracking} allowedRoles={['user','traveler']}/> 
              
              <PrivateRoute path='/qrcodeRedirect/:userId' component={QrcodeRedirect} allowedRoles={['user', 'traveler']}/> 
              <PrivateRoute path='/qr/:userId' component={Qr} allowedRoles={['user', 'traveler']}/> 
              <PrivateRoute path='/userShipment' component={userShipment} allowedRoles={['user', 'traveler']}/> 
              <PrivateRoute path='/userShipment2' component={userShipment2} allowedRoles={['user', 'traveler']}/>
              <PrivateRoute path='/employeeform' component={EmployeeForm} allowedRoles={['user', 'traveler']}/>  
              <PrivateRoute path='/studentform' component={StudentForm} allowedRoles={['user', 'traveler']}/>   
              <PrivateRoute path='/detailspfshippmentuser/:tripId' component={DetailsOfShippmentUser} allowedRoles={['user', 'traveler']}/> 
              <PrivateRoute path='/detailspfshippmentuser1/:requestId' component={DetailsOfShipmentOfUser1} allowedRoles={['user', 'traveler']}/>
              <PrivateRoute path='/userRequests' component={UserRequests} allowedRoles={['user', 'traveler']}/> 
              <PrivateRoute path='/userRequestsDeliver' component={UserRequestsDeliver} allowedRoles={['user', 'traveler']}/> 
              <PrivateRoute path='/acceptedrequests' component={AcceptedRequests} allowedRoles={['user', 'traveler']}/> 
              <PrivateRoute path='/acceptedrequestsDeliver' component={AcceptedrequestsDeliver} allowedRoles={['user', 'traveler']}/> 
              {/* <PrivateRoute path='/PasswordReset' component={PasswordReset} allowedRoles={['user', 'traveler']}/>  */}
              <PrivateRoute path='/viewRequestAfterAcceptance/:requestId' component={ViewRequestAfterAcceptance} allowedRoles={['user', 'traveler']}/>
              <PrivateRoute path='/ViewRequestAfterAcceptanceBuy/:requestId' component={ViewRequestAfterAcceptanceBuy} allowedRoles={['user', 'traveler']}/>

              <PrivateRoute path='/admin' component={Admin} allowedRoles={['admin']}/> 
        <Route path="/passwordReset" component={PasswordReset} />
        <Route path="/resetPassword/:token" component={PasswordReset2} />
        <Route path="/confirmEmail/:token" component={ConfirmEmail} />
        <Route path="/Register" render={(props)=> <Register{...props}/>}  /> 
        <Route path="/login"  render={(props)=><Login{...props} getUserInfo={getUserInfo}/>}/>
        <Route path="/home" component={Home} /> 
        <Route path="/" component={Home} />



      </Switch>
    </Router>
  );
};

export default App;
