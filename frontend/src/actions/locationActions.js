import Axios from "axios";
import { LOCATION_CREATE_FAIL, LOCATION_CREATE_REQUEST, LOCATION_CREATE_SUCCESS, LOCATION_DELETE_FAIL, LOCATION_DELETE_REQUEST, LOCATION_DELETE_SUCCESS, LOCATION_DETAILS_FAIL, LOCATION_DETAILS_REQUEST, LOCATION_DETAILS_SUCCESS, LOCATION_LIST_FAIL, LOCATION_LIST_REQUEST, LOCATION_LIST_SUCCESS, LOCATION_UPDATE_FAIL, LOCATION_UPDATE_REQUEST, LOCATION_UPDATE_SUCCESS } from "../constants/locationConstants"

export const listLocations = () => async (dispatch) =>{
    dispatch({ type: LOCATION_LIST_REQUEST });
    try {
        const { data } = await Axios.get('/api/locations');
        dispatch({ type: LOCATION_LIST_SUCCESS, payload: data });
    } catch(error){
        dispatch({ type: LOCATION_LIST_FAIL, payload: error.message });
    }
};

export const detailsLocation = (locationId) => async (dispatch) =>{
    dispatch({ type: LOCATION_DETAILS_REQUEST, payload: locationId });
    try {
        const { data } = await Axios.get(`/api/locations/${locationId}`);
        dispatch({ type: LOCATION_DETAILS_SUCCESS, payload: data});
    } catch(error){
        dispatch({ type: LOCATION_DETAILS_FAIL, payload: error.response && error.response.data.message
             ? error.response.data.message 
             : error.message,
            });
    }
};

export const createLocation = () => async (dispatch, getState) => {
    dispatch({ type: LOCATION_CREATE_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.post(
        '/api/locations',
        {},
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: LOCATION_CREATE_SUCCESS,
        payload: data.location,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: LOCATION_CREATE_FAIL, payload: message });
    }
  };

  export const updateLocation = (location) => async(dispatch, getState) => {
    dispatch({ type: LOCATION_UPDATE_REQUEST, payload: location });
      const { userSignin: { userInfo },} = getState();
      try{
        const { data } = await Axios.put(`/api/locations/${location._id}`, location, {
          headers: { Authorization: `Bearer ${userInfo.token}`},
        });
        dispatch({ type: LOCATION_UPDATE_SUCCESS, payload: data});
      } catch (error) {
        const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
          dispatch({ type: LOCATION_UPDATE_FAIL, error: message});

      }
  };

  export const deleteLocation = (locationId) => async (dispatch, getState) => {
    dispatch({ type: LOCATION_DELETE_REQUEST, payload: locationId });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = Axios.delete(`/api/locations/${locationId}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: LOCATION_DELETE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: LOCATION_DELETE_FAIL, payload: message });
    }
  };