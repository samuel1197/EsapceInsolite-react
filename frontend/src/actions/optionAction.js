import Axios from 'axios';
import { OPTION_DETAILS_FAIL, OPTION_DETAILS_REQUEST, OPTION_DETAILS_SUCCESS, OPTION_LIST_FAIL, OPTION_LIST_REQUEST, OPTION_LIST_SUCCESS } from '../constants/optionConstants.js';

export const listOptions = () => async (dispatch) => {
    dispatch({ type: OPTION_LIST_REQUEST });
    try {
        const { data } = await Axios.get('/api/options');
        dispatch({ type: OPTION_LIST_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: OPTION_LIST_FAIL, error: message });
    }
};

export const detailsOption = (optionId) => async (dispatch) => {
    dispatch({ type: OPTION_DETAILS_REQUEST, payload: optionId });
    try {
        const { data } = await Axios.get(`/api/options/${optionId}`);
        dispatch({ type: OPTION_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: OPTION_DETAILS_FAIL, payload: message });
    }
}