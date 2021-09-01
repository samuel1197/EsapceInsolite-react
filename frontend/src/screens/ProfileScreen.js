import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUserProfile } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

export default function ProfileScreen() {
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

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    const userDetails = useSelector(state => state.userDetails);
    const { loading, error, user } = userDetails;
    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const { success: successUpdate, error: errorUpdate, loading: loadingUpdate } = userUpdateProfile;

    const dispatch = useDispatch();
    useEffect(() => {
        if (!user) {
            dispatch({ type: USER_UPDATE_PROFILE_RESET });
            dispatch(detailsUser(userInfo._id));
        } else {
            setLastname(user.lastname);
            setFirstname(user.firstname);
            setEmail(user.email);
            setAge(user.age);
            setPhoneNumber(user.phoneNumber);
            setGender(user.gender);
            setCity(user.city);
            setAddress(user.address);
            setPostalCode(user.postalCode);
            setCountry(user.country);
        }
    }, [dispatch, userInfo._id, user]);
    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Les mots de passes ne correspondent pas');
        } else {
            dispatch(updateUserProfile({ userId: user._id, lastname, firstname, email, password, age, phoneNumber, gender, city, address, postalCode, country }));
        }
    };
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Profile Utilisateur</h1>
                </div>
                {loading ? (
                    <LoadingBox></LoadingBox>
                ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                    <>
                        {loadingUpdate && <LoadingBox></LoadingBox>}
                        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
                        {successUpdate && <MessageBox variant="success">Le profil a bien été mis à jour</MessageBox>}
                        <div>
                            <label htmlFor="lastname">Nom</label>
                            <input id="lastname" type="text" placeholder="Entrez votre nom" value={lastname} onChange={(e) => setLastname(e.target.value)}></input>
                        </div>
                        <div>
                            <label htmlFor="firstname">Prénom</label>
                            <input id="firstname" type="text" placeholder="Entrez votre prénom" value={firstname} onChange={(e) => setFirstname(e.target.value)}></input>
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input id="email" type="text" placeholder="Entrez votre adresse mail" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                        </div>
                        <div>
                            <label htmlFor="password">Mot de passe</label>
                            <input id="password" type="password" placeholder="Entrez votre mot de passe" onChange={(e) => setPassword(e.target.value)}></input>
                        </div>
                        <div>
                            <label htmlFor="confirmPassword">Confirmez mot de passe</label>
                            <input id="confirmPassword" type="password" placeholder="Confirmez votre mot de passe" onChange={(e) => setConfirmPassword(e.target.value)}></input>
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
                            <label/>
                            <button className="primary" type="submit">Modifier</button>
                        </div>
                    </>
                )}
            </form>
        </div>
    )
}
