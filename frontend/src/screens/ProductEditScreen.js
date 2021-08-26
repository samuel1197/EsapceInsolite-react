import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { detailsProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function ProductEditScreen(props) {
    const productId = props.match.params.id;
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [description, setDescription] = useState('');

    const productDetails = useSelector(state => state.productDetails);
    const { loading, error, product } = productDetails;
    const dispatch = useDispatch();
    useEffect(() =>{
        if(!product || (product._id !== productId) ) {
            dispatch(detailsProduct(productId));
        } else {
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setCategory(product.category);
            setCountInStock(product.countInStock);
            setDescription(product.description);
        }
    }, [
        product, dispatch, productId,
    ]);
    const submitHandler = (e) => {
        e.preventDefault();
    }
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Modification de la location : {productId}</h1>
                </div>
                { loading? <LoadingBox></LoadingBox>
                :
                error? <MessageBox varaiant="danger">{error}</MessageBox>
            :
            <>
                <div>
                    <label htmlFor="name">Nom</label>
                    <input id="name" type="text" placeholder="Entrer le nom" value={name} onChange={(e) => setName(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="name">Prix</label>
                    <input id="prix" type="text" placeholder="Entrer le prix" value={price} onChange={(e) => setPrice(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="name">Image</label>
                    <input id="image" type="text" placeholder="Entrer votre image" value={image} onChange={(e) => setImage(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="name">Categorie</label>
                    <input id="category" type="text" placeholder="Entrer votre categorie" value={category} onChange={(e) => setCategory(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="name">Stock</label>
                    <input id="countInStock" type="text" placeholder="Entrer votre quantité" value={countInStock} onChange={(e) => setCountInStock(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="name">Description</label>
                    <textearea id="description" rows="3" type="text" placeholder="Entrer votre Description" value={description} onChange={(e) => setDescription(e.target.value)}></textearea>
                </div>
                <div>
                    <label></label>
                    <button className="primary" type="submit">Modifier</button>
                </div>
            </>}
            </form>
        </div>
    );
};
 