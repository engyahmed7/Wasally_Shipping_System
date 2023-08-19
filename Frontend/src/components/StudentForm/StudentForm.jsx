import React, {useState} from 'react'
import Footer from '../Footer/Footer'
import {useHistory } from 'react-router-dom';
import Joi from 'joi';
import axios from 'axios';
const BASE_URL = process.env.REACT_APP_API_URI;
export default function StudentForm (){
  let encodedToken = localStorage.getItem('userToken');
  let history = useHistory();
  let [errorList , setErrorList] = useState([])
  let [error,setError] = useState('');
  let [loading,setLoading] = useState(false);
  let [student, setStudent] = useState({
    NationalId: '',
    StudentUniversityId:'',
    CollegeEnrollmentStatement:'',
    NationalIdCard:''


  });
  const handleChange = (e) => {
    let myStudent = {...student};
    myStudent[e.target.name] = e.target.value;
    setStudent(myStudent);
  };

  const handleImageChange = (e)=>{
    let myStudent = {...student};
    myStudent[e.target.name] = e.target.files[0];
    setStudent(myStudent);
  }
  async function formSubmit(e){
    e.preventDefault();
    let validationResponse = validationForm();
    console.log(validationResponse);
    if(validationResponse.error){ 
      setLoading(false)
      setErrorList(validationResponse.error.details)
      return;
    }

    setLoading(true);
     await axios.patch(`${BASE_URL}/v1/travelers/create`,student,{ headers: {"Authorization" : `Bearer ${encodedToken}` ,'Content-Type': 'multipart/form-data'} }).then(
      res => {
       
        setLoading(false);
        setError('');
        setErrorList([]);

       history.push('/profile2')
        
      })
    .catch(err => {
      setLoading(false);
      setError(err.response.data.message);
      console.log(err)
  }
  );
}

function validationForm(){
  let scheme = Joi.object({
    NationalId: Joi.string().regex(/^([1-9]{1})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})[0-9]{3}([0-9]{1})[0-9]{1}$/).messages({
      'string.pattern.base': `National Id must have 14 digits.`
    }).required(),
    StudentUniversityId: Joi.object(),
    CollegeEnrollmentStatement:Joi.object(),
    NationalIdCard: Joi.object().required().messages({
      'string.empty': `National Id Card is required.`
    })
  });
 return scheme.validate(student,{abortEarly:false});
}

    return (
      <>



<section>
<div className="row mt-5 justify-content-center" data-aos="fade-up">
<div className="col-lg-10">
    {
        error &&
        <div className="alert alert-danger">
          {error}
        </div>
        }

{
  errorList.map((err,i)=>{
    return <div key={i} className="alert alert-danger">
    {err.message}
  </div>
  }
  )
}




<form onSubmit={formSubmit}  className="dataform">
  <div className="row">

    <h3 className='text-center'><span className='orange'>STUDENT</span>DATA</h3>

    <div className="col-md-6 pb-2 form-group ">
    <label htmlFor="NationalId" className='p-1'>National ID :</label>
    <input onChange={handleChange} type="text" className="form-control" name="NationalId"  placeholder="National ID" required />
    </div>

    <div className="col-md-6 pb-2 form-group ">
    <label htmlFor="NationalIdCard" className='p-1'>National ID Card :</label>
    <input onChange={handleImageChange} type="file" className="form-control" name="NationalIdCard"  placeholder="National Id Card" required />
    </div>

    <div className="col-md-6 pb-2 form-group ">
    <label htmlFor="StudentUniversityId" className='p-1'>University ID :  </label>
    <input onChange={handleImageChange} type="file" className="form-control" name="StudentUniversityId"  placeholder="University ID :" required />
    </div>

    <div className="col-md-6 pb-2 form-group ">
    <label htmlFor="CollegeEnrollmentStatement" className='p-1'>College enrollment Statement : </label>
    <input onChange={handleImageChange} type="file" className="form-control" name="CollegeEnrollmentStatement"  placeholder="College enrollment Statement " required />
    </div>

  </div>

  {/* <div className="form-group pb-2 mt-3">
    <input type="text" className="form-control" name="subject" id="subject" placeholder="Subject" required />
  </div> */}

  <br />
  <div className="text-center  "><div><button type="submit" className="btn formButton">{loading ?<i className='fas fa-spinner fa-spin'></i>:'SAVE'}</button></div></div>
</form>
</div>
</div>

</section>

    <Footer/>
      </>
    )
}
