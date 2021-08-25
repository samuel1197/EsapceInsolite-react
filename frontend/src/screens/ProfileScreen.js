import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function ProfileScreen() {
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    const userDetails = useSelector(state => state.userDetails);
    const { loading, error, user } = userDetails;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(detailsUser(userInfo._id));
    }, [dispatch, userInfo._id]);
    const submitHandler = (e) => {
        e.preventDefault();
        // dispatch update profile
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
                        <div>
                            <label htmlFor="name">Nom</label>
                            <input id="name" type="text" placeholder="Entrez votre nom" value={user.name}></input>
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input id="email" type="text" placeholder="Entrez votre adresse mail" value={user.email}></input>
                        </div>
                        <div>
                            <label htmlFor="password">Mot de passe</label>
                            <input id="password" type="password" placeholder="Entrez votre mot de passe"></input>
                        </div>
                        <div>
                            <label htmlFor="confirmPassword">Confirmez mot de passe</label>
                            <input id="confirmPassword" type="password" placeholder="Confirmez votre mot de passe"></input>
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
