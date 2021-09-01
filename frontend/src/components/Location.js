import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';

export default function Location(props){
  const { location } = props;
  return (
    <div key={location._id} className="card">
      <Link to={`/location/${location._id}`}>
        <img src={location.image} alt="bulle" />
      </Link>
      <div className="card-body">
        <Link to={`/location/${location._id}`}>
          <h2>{location.name}</h2>
        </Link>
        <Rating rating={location.rating} numReviews={location.numReviews}></Rating>
        <div className="price">
          {location.price}€
        </div>
      </div>
    </div>
  );
}