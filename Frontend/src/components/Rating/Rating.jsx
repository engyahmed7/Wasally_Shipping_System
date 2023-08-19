import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import {  useHistory , useParams } from 'react-router-dom'
const BASE_URL = process.env.REACT_APP_API_URI;
function Rating({ user }) {
  const [ratings, setRatings] = useState([]);
  const [hover, setHover] = useState(null);
  const [rating, setRating] = useState(0);
 let travelerId = useParams().travelerId;
 let encodedToken = localStorage.getItem('userToken');

 let history = useHistory();
  useEffect(() => {
    axios.get(`${BASE_URL}/v1/travelers/ViewRating/${travelerId}`,{ headers: {"Authorization" : `Bearer ${encodedToken}`} })
      .then((res) => setRatings(res.data)
      
      )
      .catch((err) => console.log(err));
  }, [user]);

  const handleRating = async (value) => {
    setRating(value);

    await axios.post(`${BASE_URL}/v1/travelers/AddRating/${travelerId}`, { rating: value },{ headers: {"Authorization" : `Bearer ${encodedToken}`} });
    setRatings([...ratings, { rating: value }]);
    history.push('/home')
  };

  return (
    <section className="rating">
    <div className='container'>
        <div className="row">
            <h1 className='text-center pt-5 pb-3'>Rate Traveler Trip</h1>
            <div className="col-sm-12 text-center">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <label key={ratingValue}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => handleRating(ratingValue)}
            />
            <FaStar
              className="star"
              color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
      <p>Average rating: {ratings.length ? (ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length).toFixed(1) : 'N/A'}</p>
      </div>
      </div>
    </div>
    </section>
  );
}

export default Rating;
