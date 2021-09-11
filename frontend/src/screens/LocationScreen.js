import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsLocation } from '../actions/locationActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';
import Calendar from '../components/Calendar';



export default function LocationScreen(props){
    const dispatch = useDispatch();
    const locationId = props.match.params.id;
    const [qty, setQty] = useState(1);
    const locationDetails = useSelector((state) => state.locationDetails);
    const { loading, error, location} = locationDetails;
    
    const [nbn, setNbn] = useState();
    const [nbnf, setNbnf] = useState();
    const debut = Date.parse(nbn);
    const fin = Date.parse(nbnf);
    const nuit = (fin - debut) / 86400000;

    useEffect(() =>{
        dispatch(detailsLocation(locationId));
    }, [dispatch, locationId]);
    const addToCartHandler = () => {
        props.history.push(`/cart/${locationId}?qty=${qty}?debut=${nbn}?fin=${nbnf}?nbnuit=${nuit}`);
    };
    return (
        <div>
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
            <div>
                <Link to="/">Retour</Link>
                <div className='row top'>
                    <div className='col-2'>
                        <img className="large" src={location.image} alt={location.name}></img>
                    </div>
                    <div className='col-1'>
                        <ul>
                            <li>
                                <h1>{location.name}</h1>
                            </li>
                            <li>
                                <Rating rating={location.rating} numReviews={location.numReviews}></Rating>
                            </li> 
                            <li>
                                Prix : {location.price} €
                            </li> 
                            <li>
                                <p>{location.description}</p>
                            </li>
                        </ul>
                    </div>
                    <div className='col-1'>
                        <div className="card card-body left">
                            <ul>
                                <li>
                                    <div className="row">
                                        <div>Prix</div>
                                        <div className="price">{location.price} €</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="row">
                                        <div>Statut</div>
                                        <div>
                                            {location.countInStock > 0 ? (
                                                <span className="success">Libre</span>
                                            ) : (
                                                <span className="danger">Réserver</span>
                                            )}
                                        </div>
                                    </div>
                                </li>
                                {
                                    location.countInStock > 0 && (
                                    <>   
                                    <li>
                                        <div className="row">
                                            <div>Qty</div>
                                            <div>
                                                <select value={qty} onChange={e => setQty(e.target.value)}>
                                                {[...Array(location.countInStock).keys()].map((x) =>(
                                                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                        )
                                                )}
                                                
                                                </select>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div>Réservation</div>
                                            
                                               Début : <input className="debut" type="date" value={nbn} onChange={e => setNbn(e.target.value)}></input>
                                               Fin : <input className="fin" type="date" value={nbnf} onChange={e => setNbnf(e.target.value)}></input>
                                            
                                        </div>
                                    </li>
                                    <li>
                                        <button onClick={addToCartHandler} className="primary block">Réserver</button>
                                    </li>
                                    </>
                                    )
                                }
                            </ul>
                        </div>
                    </div>  
                </div>
            </div>
      )}
    </div>
        
    );
}
