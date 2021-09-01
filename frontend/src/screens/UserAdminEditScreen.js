import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUser } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { USER_UPDATE_RESET } from '../constants/userConstants';

export default function UserAdminEditScreen(props) {
    const userId = props.match.params.id;
    const [lastname, setLastname] = useState('');
    const [firstname, setFirstname] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [age, setAge] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [gender, setGender] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.userDetails);
    const { loading, error, user } = userDetails;

    const userUpdate = useSelector(state => state.userUpdate);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate;

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET });
            props.history.push('/userlist');
        }
        if (!user) {
            dispatch(detailsUser(userId));
        } else {
            setLastname(user.lastname);
            setFirstname(user.firstname);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
            setAge(user.age);
            setPhoneNumber(user.phoneNumber);
            setGender(user.gender);
            setCity(user.city);
            setAddress(user.address);
            setPostalCode(user.postalCode);
            setCountry(user.country);
        }
    }, [dispatch, props.history, successUpdate, user, userId]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateUser({ _id: userId, lastname, firstname, email, isAdmin, age, phoneNumber, gender, city, address, postalCode, country }));
    };
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Modification utilisateur {lastname} {firstname}</h1>
                    {loadingUpdate && <LoadingBox></LoadingBox>}
                    {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
                </div>
                {
                    loading ? (
                        <LoadingBox />
                    ) : error ? (
                        <MessageBox variant="danger">{error}</MessageBox>)
                    : (
                    <>
                        <div>
                            <label htmlFor="lastname">Nom</label>
                            <input id="lastname" type="text" placeholder="Entrer nom" value={lastname} onChange={(e) => setLastname(e.target.value)}></input>
                        </div>
                        <div>
                            <label htmlFor="firstname">Prénom</label>
                            <input id="firstname" type="text" placeholder="Entrer nom" value={firstname} onChange={(e) => setFirstname(e.target.value)}></input>
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input id="email" type="text" placeholder="Entrer email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                        </div>
                        <div>
                            <label htmlFor="isAdmin">Est admin</label>
                            <input id="isAdmin" type="checkbox" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)}></input>
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
                            <button type="submit" className="primary">Modifier</button>
                        </div>
                    </>
                )}
            </form>
        </div>
    )
}
