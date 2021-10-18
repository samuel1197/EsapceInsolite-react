import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder, listOrders } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_DELETE_RESET } from '../constants/orderConstants';

export default function OrderAdminListScreen(props) {
    const orderList = useSelector(state => state.orderList);
    const { loading, error, orders } = orderList;
    const orderDelete = useSelector(state => state.orderDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = orderDelete;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: ORDER_DELETE_RESET });
        dispatch(listOrders());
    }, [dispatch, successDelete]);
    const deleteHandler = (order) => {
        if (window.confirm('Êtes-vous sur de vouloir supprimer cette réservation?')) {
            dispatch(deleteOrder(order._id));
        }
    };
    return (
        <div>
            <h1>Réservations</h1>
            {loadingDelete && <LoadingBox></LoadingBox>}
            {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <table className="table">
                    <thead>
                    <tr>
                            <th>ID</th>
                            <th>UTILISATEUR</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAYER</th>
                            <th>ACTION</th>
                        </tr> 
                    </thead>
                    <tbody>
                        {orders.map((order) =>(
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.user.firstname} {order.user.lastname}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>{order.totalPrice.toFixed(2)} €</td>
                                <td>{order.isPaid ? order.paidAt.substring(0, 10): 'No'}</td>
                                <td>
                                    <button type="button" className="small" onClick={() => {props.history.push(`/order/${order._id}`)}}>
                                        Détails
                                    </button>
                                    <button className="small" onClick={() => deleteHandler(order)}>Supprimer</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}
