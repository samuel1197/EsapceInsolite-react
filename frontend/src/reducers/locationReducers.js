import { LOCATION_LIST_FAIL, LOCATION_LIST_REQUEST, LOCATION_LIST_SUCCESS, LOCATION_DETAILS_REQUEST, LOCATION_DETAILS_SUCCESS, LOCATION_DETAILS_FAIL, LOCATION_CREATE_REQUEST, LOCATION_CREATE_FAIL, LOCATION_CREATE_SUCCESS, LOCATION_CREATE_RESET, LOCATION_UPDATE_REQUEST, LOCATION_UPDATE_SUCCESS, LOCATION_UPDATE_FAIL, LOCATION_UPDATE_RESET, LOCATION_DELETE_REQUEST, LOCATION_DELETE_SUCCESS, LOCATION_DELETE_FAIL, LOCATION_DELETE_RESET } from "../constants/locationConstants";

export const locationListReducer = (state = { loading: true, locations: [] }, action) => {
    switch(action.type){
        case LOCATION_LIST_REQUEST:
            return { loading: true };
        case LOCATION_LIST_SUCCESS:
            return { loading: false, locations: action.payload };
        case LOCATION_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const locationDetailsReducer = (state = { loading: true}, action) =>{
    switch(action.type){
        case LOCATION_DETAILS_REQUEST:
            return { loading: true };
        case LOCATION_DETAILS_SUCCESS:
            return { loading: false, location: action.payload };
        case LOCATION_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const locationCreateReducer =  (state= {}, action) =>{
    switch(action.type){
        case LOCATION_CREATE_REQUEST:
            return { loading: true };
        case LOCATION_CREATE_SUCCESS:
            return { loading: false, success: true, location: action.payload };
        case LOCATION_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case LOCATION_CREATE_RESET:
            return {};    
        default:
            return state;
    }
};

export const locationUpdateReducer = (state={}, action) =>{
    switch(action.type){
        case LOCATION_UPDATE_REQUEST:
            return { loading: true };
        case LOCATION_UPDATE_SUCCESS:
            return { loading: false, success: true};
        case LOCATION_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        case LOCATION_UPDATE_RESET:
            return {};    
        default:
            return state;
    }
};

export const locationDeleteReducer = (state={}, action) =>{
    switch(action.type){
        case LOCATION_DELETE_REQUEST:
            return { loading: true };
        case LOCATION_DELETE_SUCCESS:
            return { loading: false, success: true};
        case LOCATION_DELETE_FAIL:
            return { loading: false, error: action.payload }; 
        case LOCATION_DELETE_RESET:
            return {};   
        default:
            return state;
    }
};