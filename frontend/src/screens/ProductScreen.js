import React from 'react';
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';
import data from '../data';


export default function ProductScreen(props){
    const product = data.products.find( (x) => x._id === props.match.params.id);
    if(!product){
        return <div>Le produit n'existe pas.</div>
    }
    return (
        <div>
            <Link to="/">Retour</Link>
            <div className='row top'>
                <div className='col-2'>
                    <img className="large" src={product.image} alt={product.name}></img>
                </div>
                <div className='col-1'>
                    <ul>
                        <li>
                            <h1>{product.name}</h1>
                        </li>
                        <li>
                            <Rating rating={product.rating} numReviews={product.numReviews}></Rating>
                        </li> 
                        <li>
                            Prix : {product.price} €
                        </li> 
                        <li>
                            <p>{product.description}</p>
                        </li>
                    </ul>
                </div>
                <div className='col-1'>
                    <div className="card card-body">
                        <ul>
                            <li>
                                <div className="row">
                                    <div>Prix</div>
                                    <div className="price">{product.price} €</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Statut</div>
                                    <div>
                                        {product.countInStock > 0 ? (
                                            <span className="success">Libre</span>
                                        ) : (
                                            <span className="danger">Réserver</span>
                                        )}
                                    </div>
                                </div>
                            </li>
                            <li>
                                <button className="primary block">Réserver</button>
                            </li>
                        </ul>
                    </div>
                </div>  
            </div>
        </div>
    )
}