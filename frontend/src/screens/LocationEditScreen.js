import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import { detailsLocation, updateLocation } from '../actions/locationActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { LOCATION_UPDATE_RESET } from '../constants/locationConstants';

export default function LocationEditScreen(props) {
    const locationId = props.match.params.id;
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [description, setDescription] = useState('');
    const [nbBedroom, setNbBedroom] = useState('');
    const [capReception, setCapReception] = useState('');
    const [disponibility, setDisponibility] = useState('');
    const [superficy, setSuperficy] = useState('');
    const [address, setAddress] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');

    const locationDetails = useSelector(state => state.locationDetails);
    const { loading, error, location } = locationDetails;

    const locationUpdate = useSelector(state => state.locationUpdate);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = locationUpdate;

    const dispatch = useDispatch();
    useEffect(() =>{
        if(successUpdate) {
            props.history.push('/locationlist');
        }
        if(!location || (location._id !== locationId || successUpdate) ) {
            dispatch({type: LOCATION_UPDATE_RESET});
            dispatch(detailsLocation(locationId));
        } else {
            setName(location.name);
            setPrice(location.price);
            setImage(location.image);
            setCategory(location.category);
            setCountInStock(location.countInStock);
            setDescription(location.description);
            setNbBedroom(location.nbBedroom);
            setCapReception(location.capReception);
            setDisponibility(location.disponibility);
            setSuperficy(location.superficy);
            setAddress(location.address);
            setPostalCode(location.postalCode);
            setCity(location.city);
            setCountry(location.country);
        }
    }, [
        location, dispatch, locationId, successUpdate, props.history
    ]);
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateLocation({_id: locationId, name, price, image, category, countInStock, description, nbBedroom, capReception, disponibility, superficy, address, postalCode, city, country}));
    };

    const [loadingUpload, setLoadingUpload] = useState(false);
    const [errorUpload, setErrorUpload] = useState('');

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('image', file);
        setLoadingUpload(true);
        try {
        const { data } = await Axios.post('/api/uploads', bodyFormData, {
            headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${userInfo.token}`,
            },
        });
        setImage(data);
        setLoadingUpload(false);
        } catch (error) {
        setErrorUpload(error.message);
        setLoadingUpload(false);
        }
    };

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Modification de la location : {locationId}</h1>
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
                        <label htmlFor="imageFile">Fichier image : </label>
                        <input id="imageFile" type="file"  label="Choisir une image" onChange={uploadFileHandler}></input>
                        {loadingUpload && <LoadingBox></LoadingBox> }
                        {errorUpload && <MessageBox variant="danger">{errorUpload}</MessageBox>}
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
                        <label htmlFor="nbBedroom">Nombre chambres</label>
                        <input id="nbBedroom" type="text" placeholder="Entrer le nombre de chambres" value={nbBedroom} onChange={(e) => setNbBedroom(e.target.value)}></input>
                    </div>
                    <div>
                        <label htmlFor="capReception">Capacité de réception</label>
                        <input id="capReception" type="text" placeholder="Entrer votre capacité de réception" value={capReception} onChange={(e) => setCapReception(e.target.value)}></input>
                    </div>
                    <div>
                        <label htmlFor="disponibility">Est disponible</label>
                        <input id="disponibility" type="checkbox" checked={disponibility} onChange={(e) => setDisponibility(e.target.checked)}></input>
                    </div>
                    <div>
                        <label htmlFor="superficy">Superficie</label>
                        <input id="superficy" type="text" placeholder="Entrer la superficie" value={superficy} onChange={(e) => setSuperficy(e.target.value)}></input>
                    </div>
                    <div>
                        <label htmlFor="address">Adresse</label>
                        <input id="address" type="text" placeholder="Entrer votre adresse" value={address} onChange={(e) => setAddress(e.target.value)}></input>
                    </div>
                    <div>
                        <label htmlFor="postalCode">Code postal</label>
                        <input id="postalCode" type="text" placeholder="Entrer votre code postal" value={postalCode} onChange={(e) => setPostalCode(e.target.value)}></input>
                    </div>
                    <div>
                        <label htmlFor="city">Ville</label>
                        <input id="city" type="text" placeholder="Entrer votre ville" value={city} onChange={(e) => setCity(e.target.value)}></input>
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
 