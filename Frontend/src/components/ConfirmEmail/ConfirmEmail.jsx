import React, { useState } from 'react'

import { Link } from 'react-router-dom'
import axios from 'axios';

import { useParams } from 'react-router-dom/cjs/react-router-dom';
import {useHistory } from 'react-router-dom';

const BASE_URL = process.env.REACT_APP_API_URI;

export default function ConfirmEmail() {
    const [isConfirm, setIsConfirm] = useState(false);
  let history = useHistory();

    let token = useParams().token;
    const handleCofirm = () => {
      
    axios.get(`${BASE_URL}/v1/auth/confirmEmail/${token}`,{isUpdated: true} )
        .then(response => {
            setIsConfirm(true); 
            history.push('/login')
        })
        .catch(error => {
          console.log(error);
        });
    }

  

  return (
    <>

  <div className="email text-center">
    <button  onClick={handleCofirm} className='btn btn-success orangeButton'>
        Confirm Email
    </button>
  </div>

</>
)
}