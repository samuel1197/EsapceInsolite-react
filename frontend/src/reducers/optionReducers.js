import { OPTION_DETAILS_FAIL, OPTION_DETAILS_REQUEST, OPTION_DETAILS_SUCCESS, OPTION_LIST_FAIL, OPTION_LIST_REQUEST, OPTION_LIST_SUCCESS } from '../constants/optionConstants.js';

export const optionListReducer = (state = { loading: true, options: [] }, action) => {
    switch (action.type) {
        case OPTION_LIST_REQUEST:
            return { loading: true };
        case OPTION_LIST_SUCCESS:
            return { loading: false, options: action.payload };
        case OPTION_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const optionDetailsReducer = (state = { option: {}, loading: true }, action) => {
    switch (action.type) {
        case OPTION_DETAILS_REQUEST:
            return { loading: true };
        case OPTION_DETAILS_SUCCESS:
            return { loading: false, option: action.payload };
        case OPTION_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}