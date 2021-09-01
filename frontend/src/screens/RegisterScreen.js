import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function RegisterScreen(props){

    const [lastname, setLastname] = useState('');
    const [firstname, setFirstname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [age, setAge] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [gender, setGender] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');

    const redirect = props.location.search? props.location.search.split('=')[1]: '/';
    const userRegister = useSelector((state) => state.userRegister);
    const { userInfo, loading, error } = userRegister; 

    const dispatch = useDispatch();
    const submitHandler = (e) =>{
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Les mots de passes ne correspondent pas');
        } else {
            dispatch(register(lastname, firstname, email, password, age, phoneNumber, gender, city, address, postalCode, country));
        }
    };
    useEffect(() =>{
        if(userInfo) {
            props.history.push(redirect);
        }
    }, [props.history, redirect, userInfo]);
    return(
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Inscription</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div>
                    <label htmlFor="lastname">Nom</label>
                    <input type="text" id="lastname" placeholder="Entrer votre nom" required onChange={ e => setLastname(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="firstname">Prénom</label>
                    <input type="text" id="firstname" placeholder="Entrer votre prénom" value={firstname} required onChange={ e => setFirstname(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="email">Adresse mail</label>
                    <input type="email" id="email" placeholder="Entrer votre adresse mail" required onChange={ e => setEmail(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="password">Mot de passe</label>
                    <input type="password" id="password" placeholder="Entrer votre mot de passe" required onChange={ e => setPassword(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="password">Confirmez votre mot de passe</label>
                    <input type="password" id="confirmPassword" placeholder="Confirmez votre mot de passe" required onChange={ e => setConfirmPassword(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="age">Age</label>
                    <input id="age" type="text" placeholder="Entrez votre age" value={age} onChange={(e) => setAge(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="phoneNumber">Numéro de téléphone</label>
                    <input id="phoneNumber" type="text" placeholder="Entrez votre numéro de téléphone" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="gender">Sexe</label>
                    <input id="gender" type="text" placeholder="Entrez votre sexe" value={gender} onChange={(e) => setGender(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="city">Ville</label>
                    <input id="city" type="text" placeholder="Entrez votre ville" value={city} onChange={(e) => setCity(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="address">Adresse</label>
                    <input id="address" type="text" placeholder="Entrez votre adresse" value={address} onChange={(e) => setAddress(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="postalCode">Code postal</label>
                    <input id="postalCode" type="text" placeholder="Entrez votre code postal" value={postalCode} onChange={(e) => setPostalCode(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="country">Pays</label>
                    <input id="country" type="text" placeholder="Entrez votre pays" value={country} onChange={(e) => setCountry(e.target.value)}></input>
                </div>
                <div>
                    <label />
                    <button className="primary" type="submit">S'inscrire</button>
                </div>
                <div>
                    <label />
                    <div>
                        Déjà un compte ? <Link to={`/signin?redirect=${redirect}`}>Connectez-vous</Link>
                    </div>
                </div>
                
            </form>
        </div>
    )
}
