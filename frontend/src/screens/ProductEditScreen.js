import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { detailsProduct, updateProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

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

    const productUpdate = useSelector(state => state.productUpdate);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate;

    const dispatch = useDispatch();
    useEffect(() =>{
        if(successUpdate) {
            props.history.push('/locationlist');
        }
        if(!product || (product._id !== productId || successUpdate) ) {
            dispatch({type: PRODUCT_UPDATE_RESET});
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
        product, dispatch, productId, successUpdate, props.history
    ]);
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateProduct({_id: productId, name, price, image, category, countInStock, description}));
    }
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Modification de la location : {productId}</h1>
                </div>
                { loadingUpdate && <LoadingBox></LoadingBox>}
                {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
                { loading? <LoadingBox></LoadingBox>
                :
                error? <MessageBox variant="danger">{error}</MessageBox>
            :
            <>
                <div>
                    <label htmlFor="name">Nom</label>
                    <input id="name" type="text" placeholder="Entrer le nom" value={name} onChange={(e) => setName(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="prix">Prix</label>
                    <input id="prix" type="text" placeholder="Entrer le prix" value={price} onChange={(e) => setPrice(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="image">Image</label>
                    <input id="image" type="text" placeholder="Entrer votre image" value={image} onChange={(e) => setImage(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="category">Categorie</label>
                    <input id="category" type="text" placeholder="Entrer votre categorie" value={category} onChange={(e) => setCategory(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="countInStock">Stock</label>
                    <input id="countInStock" type="text" placeholder="Entrer votre quantité" value={countInStock} onChange={(e) => setCountInStock(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea id="description" rows="3" type="text" placeholder="Entrer votre Description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>
                <div>
                    <label></label>
                    <button className="primary" type="submit">Modifier</button>
                </div>
            </>}
            </form>
        </div>
    );
}
 