import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { createOrder } from '../actions/orderActions';

export default function PlaceOrderScreen(props) {
    const cart = useSelector((state) => state.cart);
    if (!cart.paymentMethod) {
      props.history.push('/payment');
    }
    const orderCreate = useSelector(state => state.orderCreate);
    const { loading, success, error, order } = orderCreate;
    const toPrice = (num) => Number(num.toFixed(2)); // arrondire à 2 chiffres apres la virgule
    cart.itemsPrice = toPrice(cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0 ));

    cart.shippingPrice = cart.itemsPrice > 100? toPrice(0): toPrice(10);
    cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
    const dispatch = useDispatch();
    const PlaceOrderHandler = () =>{
        dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
    };
    useEffect(() => {
        if (success) {
        props.history.push(`/order/${order._id}`);
        dispatch({ type: ORDER_CREATE_RESET });
        }
    }, [dispatch, order, props.history, success]);
    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 ></CheckoutSteps>
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                               <h2>Panier</h2> 
                               <p>
                                   <strong>Nom : </strong> {cart.shippingAddress.fullName} <br/>
                                   <strong>Adresse : </strong> {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}, {cart.shippingAddress.country} <br/>
                               </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Paiement</h2>
                                <p>
                                    <strong>Mode de paiement:</strong> {cart.paymentMethod}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                               <h2>Récapitulatif du panier</h2> 
                               <ul>
                                    {cart.cartItems.map((item) => (
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
                                    <div>{cart.itemsPrice.toFixed(2)} €</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Frais de service</div>
                                    <div>{cart.shippingPrice.toFixed(2)} €</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Taxe</div>
                                    <div>{cart.taxPrice.toFixed(2)} €</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div><strong>Total</strong></div>
                                    <div><strong>{cart.totalPrice.toFixed(2)} €</strong></div>
                                </div>
                            </li>
                            <li>
                                <button type="button" onClick={PlaceOrderHandler} className="primary block" disabled={cart.cartItems.length === 0}>Payer</button>
                            </li>
                            {loading && <LoadingBox></LoadingBox>}
                            {error && <MessageBox variant="danger">{error}</MessageBox>}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
