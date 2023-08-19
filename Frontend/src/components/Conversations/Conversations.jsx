import './Conversation.css'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useEffect, useState } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const BASE_URL = process.env.REACT_APP_API_URI;



export default function Conversations() {

  let encodedToken = localStorage.getItem('userToken');
  let decodedToken = jwtDecode(encodedToken)
  let requestId = useParams().requestId;
  const [conversationId , setConversationId] = useState([]);
  const [textMessage , setTextMessage] = useState([])

  async function getconv() {
    axios.get(`${BASE_URL}/v1/requests/${requestId}`,{ headers: {"Authorization" : `Bearer ${encodedToken}`} }).then((response) => {
     
    console.log(response.data)
      setConversationId(response.data.conversation)
      let convId = response.data.conversation[0];
      getMessages(convId);
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
    }); 
}


  useEffect(()=>{
    getconv();
    
      },[]);

  return (
    <>
     
    <div className="conversation">
 
  <h1>

    </h1>
 

      {/* <img className="conversationImg" src={chatImg} alt="" />   */}
      
      <hr/>
    </div>

    </>
  )
}
