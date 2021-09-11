import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import MessageBox from '../components/MessageBox';

export default function CartScreen(props) {
  const locationId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split('=')[1])
    : 1;
    const debut = props.location.search
    ? Number(props.location.search.split('=')[2])
    : 2;
    const fin = props.location.search
    ? Number(props.location.search.split('=')[3])
    : 3;
    const nuit = props.location.search
    ? Number(props.location.search.split('=')[4])
    : 4;
    
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();
  useEffect(() => {
    if (locationId) {
      dispatch(addToCart(locationId, qty));
    }
  }, [dispatch, locationId, qty]);

  const removeFromCartHandler = (id) => {
    // delete action
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    props.history.push('/signin?redirect=shipping');
  };
  return (
    <div className="row top">
      <div className="col-2">
        <h1>Panier</h1>
        {cartItems.length === 0 ? (
          <MessageBox>
            Panier vide. <Link to="/">Aller au catalogue</Link>
          </MessageBox>
        ) : (
          <ul>
            {cartItems.map((item) => (
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
                  <div className="min-30">
                    Début : {debut}
                  </div>
                  <div className="min-30">
                    Fin : {fin}
                  </div>
                  <div>
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.location, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>{item.price} x {nuit}</div>
                  <div>
                    <button
                      type="button"
                      onClick={() => removeFromCartHandler(item.location)}
                    >
                      Retirer
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="col-1">
        <div className="card card-body left">
          <ul>
            <li>
              <h2>
                Total ({cartItems.reduce((a, c) => a + c.nuit, 0)} location) :&nbsp;
                {cartItems.reduce((a, c) => a + c.price * c.nuit, 0)} €
              </h2>
            </li>
            <li>
              <button
                type="button"
                onClick={checkoutHandler}
                className="primary block"
                disabled={cartItems.length === 0}
              >
                Procéder au paiement
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}