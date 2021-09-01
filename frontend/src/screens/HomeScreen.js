import React, { useEffect } from 'react';
import Location from '../components/Location';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listLocations } from '../actions/locationActions';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const locationList = useSelector((state) => state.locationList);
  const { loading, error, locations } = locationList;

  useEffect(() => {
    dispatch(listLocations());
  }, [dispatch]);
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="row center">
          {locations.map(location => (
            <Location key={location._id} location={location}></Location>
          ))}
        </div>
      )}
    </div>
  );
}