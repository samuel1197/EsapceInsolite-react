import React from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import LocationScreen from './screens/LocationScreen';
import CartScreen from './screens/CartScreen';
import { useDispatch, useSelector } from 'react-redux';
import SigninScreen from './screens/SigninScreen';
import { signout } from './actions/userActions';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAdressScreen from './screens/ShippingAdressScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import PrivateRoute from './components/PrivateRoute';
import LocationAdminListScreen from './screens/LocationAdminListScreen';
import AdminRoute from "./components/AdminRoute";
import LocationEditScreen from './screens/LocationEditScreen';
import OrderAdminListScreen from './screens/OrderAdminListScreen';
import UserAdminListScreen from './screens/UserAdminListScreen';
import UserAdminEditScreen from './screens/UserAdminEditScreen';
import OptionAdminListScreen from './screens/OptionAdminListScreen';
import img1 from './images/espaceInsolite1logo.png';




function App() {

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () =>{
    dispatch(signout());
  }
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="/"><img className="logo1" src={img1} alt="" /></Link>
          </div>
          <div>
            <Link to="/cart">Panier
            {cartItems.length > 0 && (
              <span className='badge'>{cartItems.length}</span>
            )}
            </Link>
            {
              userInfo ? (
                <div className="dropdown">
                  <Link to="#">{userInfo.firstname} <i className="fa fa-caret-down"></i></Link>
                  <ul className="dropdown-content">
                    <li><Link to='/orderhistory'>Historique des réservations</Link></li>
                    <li><Link to='/profile'>Profil utilisateur</Link></li>
                    <li><Link to="#signout" onClick={signoutHandler}>Se deconnecter</Link></li>
                    
                  </ul>
                </div>
              ) :
              (
                <Link to="/signin">Connexion</Link>
              )}
              {userInfo && userInfo.isAdmin && (
                <div className="dropdown">
                  <Link to="#admin">
                    Admin {' '} <i className="fa fa-caret-down"></i>
                  </Link>
                  <ul className="dropdown-content">
                    <li>
                      <Link to="/dashboard">Tableau de bord</Link>
                    </li>
                    <li>
                      <Link to="/locationlist">Locations</Link>
                    </li>
                    <li>
                      <Link to="/orderlist">Réservations</Link>
                    </li>
                    <li>
                      <Link to="/userlist">Utilisateurs</Link>
                    </li>
                    <li>
                      <Link to="/optionlist">Option location</Link>
                    </li>
                  </ul> 
                </div>
              )}
          </div>
        </header>
        <main>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/location/:id" component={LocationScreen} exact></Route>
          <Route path="/location/:id/edit" component={LocationEditScreen} exact></Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/shipping" component={ShippingAdressScreen}></Route>
          <Route path="/payment" component={PaymentMethodScreen}></Route>
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
          <Route path="/order/:id" component={OrderScreen}></Route>
          <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
          <PrivateRoute path="/profile" component={ProfileScreen}></PrivateRoute>
          <AdminRoute path="/locationlist" component={LocationAdminListScreen}></AdminRoute>
          <AdminRoute path="/orderlist" component={OrderAdminListScreen}></AdminRoute>
          <AdminRoute path="/userlist" component={UserAdminListScreen}></AdminRoute>
          <AdminRoute path="/user/:id/edit" component={UserAdminEditScreen}></AdminRoute>
          <AdminRoute path="/optionlist" component={OptionAdminListScreen}></AdminRoute>
          <Route path="/" component={HomeScreen} exact></Route>
        </main>
        <footer className="row center">
          <div className="socialnet">
          <Link to="#"><i className="fa fa-facebook"></i></Link>
          </div>
          <div className="socialnet">
          <Link to="#"><i className="fa fa-instagram"></i></Link>
          </div>
          <div className="socialnet">
          <Link to="#"><i className="fa fa-linkedin"></i></Link>
          </div>
          </footer>
          <div className="subfooter">All right Reserved</div>
      </div>
    </BrowserRouter>
  );
}

export default App;
