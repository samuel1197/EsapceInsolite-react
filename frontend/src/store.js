import {  createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from 'redux-thunk';
import { cartReducer } from "./reducers/cartReducers";
import { orderCreateReducer, orderDeleteReducer, orderDetailsReducer, orderListReducer, orderMineListReducer, orderPayReducer } from "./reducers/orderReducers";
import { locationCreateReducer, locationDeleteReducer, locationDetailsReducer, locationListReducer, locationUpdateReducer } from "./reducers/locationReducers";
import { userDeleteReducer, userDetailsReducer, userListReducer, userRegisterReducer, userSinginReducer, userUpdateProfileReducer, userUpdateReducer } from "./reducers/userReducers";
import { optionDetailsReducer, optionListReducer } from "./reducers/optionReducers";

const initialState = {
    userSignin: {
        userInfo: localStorage.getItem('userInfo')? JSON.parse(localStorage.getItem('userInfo')):null,
    },
    cart: {
        cartItems: localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems'))
        : [],
        shippingAddress: localStorage.getItem('shippingAddress') 
        ? JSON.parse(localStorage.getItem('shippingAddress'))
        : {},
        paymentMethod: 'paypal',
    },
};
const reducer = combineReducers({
    locationList: locationListReducer,
    locationDetails: locationDetailsReducer,
    cart: cartReducer,
    userSignin: userSinginReducer,
    userRegister: userRegisterReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderMineList: orderMineListReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    locationCreate: locationCreateReducer,
    locationUpdate: locationUpdateReducer,
    locationDelete: locationDeleteReducer,
    orderList: orderListReducer,
    orderDelete: orderDeleteReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    optionList: optionListReducer,
    optionDetails: optionDetailsReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;