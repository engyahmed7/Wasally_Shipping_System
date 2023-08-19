// import { auto } from '@popperjs/core'
import React, { useRef } from 'react'

import formatDistance from 'date-fns/formatDistance'

import  './Chat.css'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useEffect, useState } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode'
import {io} from 'socket.io-client'
const BASE_URL = process.env.REACT_APP_API_URI;
export default function Chat() {
    let encodedToken = localStorage.getItem('userToken');
  let requestId = useParams().requestId;
  const [conversationId , setConversationId] = useState([]);
  const [messageBody , setMessageBody] = useState([])
  const [arrivalMessage,setarrivalMessage]= useState(null)
  const socket = useRef();
  const [textMessage , setTextMessage] = useState([])
  let decodedToken = jwtDecode(encodedToken);
  let user = decodedToken;

  let userId = decodedToken.id;
  const [profileData , setProfileDate] = useState([]);


  useEffect(()=>{
   socket.current =  io(BASE_URL)
   socket.current.on("getMessage",data=>{
    setarrivalMessage({
      sender: data.senderId,
      text: data.text,
      createdAt: Date.now()
    })
   })
  },[])

  let useId = decodedToken.role ===  'user'  ? user.id : decodedToken.role=== 'traveler' ? profileData._id: ''
  useEffect(()=>{
    socket.current.emit("addUser",useId)
    socket.current.on("getUsers",users=>{
      
    })
  },[user])

  async function getconv() {
    axios.get(`${BASE_URL}/v1/requests/${requestId}`,{ headers: {"Authorization" : `Bearer ${encodedToken}`} }).then((response) => {
     
    console.log(response.data)
      setConversationId(response.data.conversation)
      let convId = response.data.conversation[0];
      getMessages(convId)
      getConversationById(convId);
      })
      .catch((error) => {
        console.log(error);
      });
  }
 
  // async function getMessages(convId){
  //   axios.get(`${BASE_URL}/v1/messages/${convId}`,{ headers: {"Authorization" : `Bearer ${encodedToken}`} }).then((response) => {
  //     console.log(response.data)
     
  //   })
//   .catch((error) => {
  //     console.log("ssw",error);
  //   }); 
  // }

  async function getProfile(){
  
      axios.get(`${BASE_URL}/v1/travelers/get` ,{ headers: {"Authorization" : `Bearer ${encodedToken}`} }).then(
          (response)=>{
              console.log("a",response.data)
              setProfileDate(response.data.traveler)
             
          }
      ).catch(
          (error)=>{
              console.log(error)
  
          }
      )
  }
  
const [conversation , setconversation] = useState('')

  async function getConversationById(convId){
    axios.get(`${BASE_URL}/v1/conversations/find/${convId}`,{ headers: {"Authorization" : `Bearer ${encodedToken}`} }).then((response) => {
      console.log("yat",response.data)
      setconversation(response.data)
    })
    .catch((error) => {
      console.log("ssw",error);
    }); 
  }

  useEffect(()=>{
    arrivalMessage && conversation?.members.includes(arrivalMessage.sender) &&
    setTextMessage(prev=>[...prev,arrivalMessage])
  },[arrivalMessage,conversation])

  let [error,setError] = useState('');
 let send =  decodedToken.role ===  'user'  ? userId : decodedToken.role=== 'traveler' ? profileData._id: ''
  const handleChange = (e) => {
    setMessageBody(e.target.value);
    
  };
  async function formSubmit(e){
    e.preventDefault();
    const messageToBeSend ={
      conversationId:conversationId[0],
      text:messageBody,
      sender : send

     }
 
    const receiverId = conversation.members.find(member=>member !==useId);
    socket.current.emit("sendMessage",{
      senderId : useId,
      receiverId:receiverId,
      text : messageBody
    })
     await axios.post(`${BASE_URL}/v1/messages`,messageToBeSend,{ headers: {"Authorization" : `Bearer ${encodedToken}` }})
     .then(res => {
        getMessages(conversationId[0])
        setMessageBody()
        
     })
    .catch(err => {
     
      setError(err.response.data.message);
      console.log(err)
  }
  );
}

  useEffect(()=>{
    getconv();
    if(decodedToken.role === 'traveler'){
    getProfile();
    }
   
    
      },[]);


      async function getMessages(convId){
        axios.get(`${BASE_URL}/v1/messages/${convId}`,{ headers: {"Authorization" : `Bearer ${encodedToken}`} }).then((response) => {
          console.log(response.data)
          setTextMessage(response.data)
        })
        .catch((error) => {
          console.log("ssw",error);
          setError(error.response.data)
        }); 
      }

  return (
    <>

        <div className="messenger" >
        {
        error &&
        <div className="alert alert-danger">
          {error}
        </div>
        }

            <div className="chatMenu">
                <div className="chatMenuWrapper">
                  
                </div>
            </div>

            <div className="chatBox">
                <div  className="chatBoxWrapper">
                    <div style={{overflowY:'scroll'}} className="chatBoxTop">
                        {/* <Message/> */}
                        {
        error &&
        <div className="alert alert-danger">
          {error}
        </div>
        }
        
        { textMessage && textMessage.map((t,index)=>      
       
    <div key={index} className={t.sender ===  userId  ? 'message own' : t.sender ===  profileData._id ? 'message own' : 'message'}>
    <div className= "messageTop">
  <>
  <p className="messageText">{t.text}</p>
 
  <div className="messageBottom">{ formatDistance(
       new Date(t.createdAt),
       new Date()
   )}
   </div>
  </> 
    </div>
    </div>
    )}
                    </div>
                </div>
                <div className="chatBoxBottom">
                    <form onSubmit={formSubmit} className='w-100'>
                    <input type='text' name='sender' onChange={handleChange} defaultValue={decodedToken.role ===  'user'  ? userId : decodedToken.role=== 'traveler' ? profileData._id: ''} style={{"display": "none"}} />
                    <input type='text' name='conversationId' onChange={handleChange} defaultValue={conversationId[0]}  style={{"display": "none"}}/>
                        <textarea  name="text" style={{color:'black' , resize:'none' ,textAlign:'center'}} className='chatMessageInput' placeholder='Write a message' onChange={handleChange}></textarea>
                      <button type='submit' className='chatSubmitButton'>Send</button>
                    </form>
                </div>
            </div>
            <div className="chatOnline">
                <div className="chatOnlineWrapper">
                    
                </div>
            </div>
        </div>
    </>

  )
}
