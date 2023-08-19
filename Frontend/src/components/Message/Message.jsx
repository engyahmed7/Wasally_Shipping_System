import  './message.css'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useEffect, useState } from 'react';
import axios from 'axios';
import formatDistance from 'date-fns/formatDistance'
import {io} from 'socket.io-client'
import jwtDecode from 'jwt-decode'
import { useRef } from 'react';
const BASE_URL = process.env.REACT_APP_API_URI;

export default function Message() {
  let encodedToken = localStorage.getItem('userToken');
  let [error,setError] = useState('');
  let requestId = useParams().requestId;
  const socket = useRef();
  const [conversationId , setConversationId] = useState([]);
  const [textMessage , setTextMessage] = useState([])
  const [profileData , setProfileDate] = useState([]);
  let decodedToken = jwtDecode(encodedToken);
  let user = decodedToken;
  let userId = decodedToken.id;

  async function getconv() {
    axios.get(`${BASE_URL}/v1/requests/${requestId}`,{ headers: {"Authorization" : `Bearer ${encodedToken}`} }).then((response) => {
     
    console.log(response.data)
      setConversationId(response.data.conversation)
      let convId = response.data.conversation[0];
      getMessages(convId)
      getConversationById(convId)
      })
      .catch((error) => {
        console.log(error);
      });
  }


  
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
  const [arrivalMessage,setarrivalMessage]= useState(null)
  const [conversation , setconversation] = useState('')
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

  useEffect(()=>{

    getconv();
    if(decodedToken.role === 'traveler'){
      getProfile();
    }
      },[]);

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
    
      useEffect(()=>{
        getconv();
          },[]);
          

          useEffect(()=>{
            socket.current.emit("addUser",user.id)
            socket.current.on("getUsers",users=>{
              
            })
          },[user])


  return (
    <>
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

    </>
  )
}
