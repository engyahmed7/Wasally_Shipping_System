import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
const BASE_URL = process.env.REACT_APP_API_URI;
export default function QrCode() {
    let encodedToken = localStorage.getItem('userToken');
    const [userData,setUserData] =useState([])

    async function getUser(){

        axios.get(`${BASE_URL}/v1/users/qrCode` ,{ headers: {"Authorization" : `Bearer ${encodedToken}`} }).then(
            (response)=>{
                console.log(response.data)
                setUserData(response.data)
            }
        ).catch(
            (error)=>{
                console.log(error)
    
            }
        )
    }
let history = useHistory();


    async function getRequest(){

        axios.get(`${BASE_URL}/v1/users/redirectAfterDelivery` ,{ headers: {"Authorization" : `Bearer ${encodedToken}`} }).then(
            (response)=>{
                console.log(response.data)
               if(response.data.state === 'delivered'){
                let traveler = response.data.trip.Traveler;
                history.push(`/rating/${traveler}`)
               }
               else{
                history.push('/qrcode')
               }
            }
        ).catch(
            (error)=>{
                console.log(error)
    
            }
        )
    }



    useEffect(()=>{
        getUser();
        getRequest();
        
        },[]);

  return (
    <div className='text-center'>
        <h1>QR code</h1>
        <img src={userData.qrCode} alt="qrcode" />
    </div>
  )
}
