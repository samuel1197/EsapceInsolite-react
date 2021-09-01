import Axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsOrder, payOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_PAY_RESET } from '../constants/orderConstants';


export default function OrderScreen(props) {
    
    const orderId = props.match.params.id;
    const [sdkReady, setSdkReady] = useState(false);
    const orderDetails = useSelector(state => state.orderDetails);
    const { order, loading, error} = orderDetails;

    const orderPay = useSelector(state => state.orderPay);
    const {loading: loadingPay, error: errorPay, success: successPay } = orderPay;
    const dispatch = useDispatch();
    
    useEffect(() => {
        const addPayPalScript = async () => {
            const { data } = await Axios.get('/api/config/paypal');
            const script = document.createElement('script');
            script.type="text/javascript";
            script.src=`https://www.paypal.com/sdk/js?client-id=${data}`; 
            script.async = true;
            script.onload = () =>{
                setSdkReady(true);
            };
            document.body.appendChild(script);
        };
        if (!order || successPay || (order && order._id !== orderId)) {
            dispatch({ type: ORDER_PAY_RESET });
            dispatch(detailsOrder(orderId));
        } else {
            if (!order.isPaid) {
              if (!window.paypal) {
                addPayPalScript();
              } else {
                setSdkReady(true);
              }
            }
          }
    },      [dispatch, order, orderId, sdkReady, successPay]);
    const successPaymentHandler = (paymentResult) =>{
        dispatch(payOrder(order, paymentResult));
    };
    return loading? (<LoadingBox></LoadingBox>):
    error? <MessageBox variant="danger">{error}</MessageBox>
    :  (
        <div>
            <h1>Commande : {order._id}</h1>
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                               <h2>Information personnel</h2> 
                               <p>
                                   <strong>Nom : </strong> {order.shippingAddress.fullName} <br/>
                                   <strong>Adresse : </strong> {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country} <br/>
                               </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Paiement</h2>
                                <p>
                                    <strong>Mode de paiement:</strong> {order.paymentMethod}
                                </p>
                                {order.isPaid ? (
                                    <MessageBox variant="success">Payer à {order.paidAt}</MessageBox>
                                    ) : (
                                    <MessageBox variant="danger">Non payer</MessageBox>
                                )}
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                               <h2>Récapitulatif du panier</h2> 
                               <ul>
                                    {order.orderItems.map((item) => (
                                    <li key={item.location}>
                                        <div className="row">
                                            <div>
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="small"
                                                ></img>
                                            </div>
                                            <div className="min-30">
                                                <Link to={`/location/${item.location}`}>{item.name}</Link>
                                            </div>
                                            
                                            <div>{item.price} €</div>
                                            
                                        </div>
                                    </li>
                                ))}
                                </ul>
                            </div>
                        </li>
                    </ul>

                </div>
                <div className="col-1">
                    <div className="card card-body">
                        <ul>
                            <li>
                                <h2>Récapitulatif de la commande</h2>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Panier</div>
                                    <div>{order.itemsPrice.toFixed(2)} €</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Frais de service</div>
                                    <div>{order.shippingPrice.toFixed(2)} €</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Taxe</div>
                                    <div>{order.taxPrice.toFixed(2)} €</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div><strong>Total</strong></div>
                                    <div><strong>{order.totalPrice.toFixed(2)} €</strong></div>
                                </div>
                            </li>
                            { !order.isPaid && (
                                <li>
                                    {!sdkReady ? (
                                        <LoadingBox></LoadingBox>
                                    ) : (
                                        <>
                                            {errorPay && (
                                                <MessageBox variant="danger">{errorPay}</MessageBox>
                                            )}
                                            {loadingPay && <LoadingBox></LoadingBox>}
                                            <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler}></PayPalButton>
                                        </>
                                    )
                                    }
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
