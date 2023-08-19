

import React from 'react'
import { Link, useParams } from 'react-router-dom/cjs/react-router-dom.min'

export default function Qr() {


   let userId = useParams().userId;
   console.log(userId)
  return (
  
    <div className="text-center rate p-5 m-5">
        <Link to=  {`/qrcodeRedirect/${userId}`}><button className='orangeButton btn btn-success'>Accept</button></Link>
        </div>
  )
}
