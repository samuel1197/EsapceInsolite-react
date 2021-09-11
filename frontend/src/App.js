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
import img1 from './images/espaceInsolite1logo.png';
import MentionLegalScreen from './screens/MentionLegalScreen';
import AboutScreen from './screens/AboutScreen';
import AppScreen from './screens/AppScreen';
import { useState } from 'react';

function App() {

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () =>{
    dispatch(signout());
  }

  const [showLinks, SetShowLinks] = useState(false);
  const handleShowlinks = () => {
    SetShowLinks(!showLinks)
  }
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <nav className={`navbar ${showLinks ? "show-nav" : "hide-nav"}`}>
            <div className="navbar__logo">
              <Link className="brand" to="/"><img className="logo1" src={img1} alt="" /></Link>
            </div>
            <ul className="navbar__links">
              <li className="navbar__item">
                <Link className="navbar__link" to="/qui_sommes_nous">Qui Sommes-nous ?</Link>
              </li>
              <li className="navbar__item">
              <Link className="navbar__link" to="/application">Application</Link>
              </li>
              <li className="navbar__item">
                <Link className="navbar__link" to="/cart">Panier
                  {cartItems.length > 0 && (
                    <span className='badge'>{cartItems.length}</span>
                  )}
                </Link>
              </li>
              <li className="navbar__item">
                <div>
                  {
                    userInfo ? (
                      <div className="dropdown">
                        <Link to="#">{userInfo.firstname} <i className="fa fa-caret-down"></i></Link>
                        <ul className="dropdown-content">
                          <li className="dropburger"><Link to='/orderhistory'>Historique des réservations</Link></li>
                          <li className="dropburger"><Link to='/profile'>Profil utilisateur</Link></li>
                          <li className="dropburger"><Link to="#signout" onClick={signoutHandler}>Se deconnecter</Link></li>
                        </ul>
                      </div>
                    ) :
                    (
                      <Link className="navbar__link" to="/signin">Connexion</Link>
                    )}
                    {userInfo && userInfo.isAdmin && (
                      <div className="dropdown">
                        <Link  to="#admin">
                          Admin {' '} <i className="fa fa-caret-down"></i>
                        </Link>
                        <ul className="dropdown-content">
                          <li className="dropburger">
                            <Link to="/dashboard">Tableau de bord</Link>
                          </li>
                          <li className="dropburger">
                            <Link to="/locationlist">Locations</Link>
                          </li>
                          <li className="dropburger">
                            <Link to="/orderlist">Réservations</Link>
                          </li>
                          <li className="dropburger">
                            <Link to="/userlist">Utilisateurs</Link>
                          </li>
                        </ul> 
                      </div>
                    )}
                </div>
              </li>
            </ul>
            <button className="navbar__burger" onClick={handleShowlinks}><span className="burger-bar"></span></button>
          </nav>
          
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
          <Route path="/" component={HomeScreen} exact></Route>
          <Route path="/mention_Legal" component={MentionLegalScreen} exact></Route>
          <Route path="/qui_sommes_nous" component={AboutScreen} exact></Route>
          <Route path="/application" component={AppScreen} exact></Route>
        </main>
        <footer className="row center">
          <div className="socialnet">
            <a href="https://www.facebook.com/espace.insolite.7"><i className="fa fa-facebook"></i></a>
          </div>
          <div className="socialnet">
            <a href="https://www.instagram.com/espace_insolite21/"><i className="fa fa-instagram"></i></a>
          </div>
          </footer>
          <div className="subfooter"><a href="/mention_Legal">Mention légal</a><br></br><p>All right Reserved by NDSL Agency</p></div>
      </div>
    </BrowserRouter>
  );
}

export default App;
