import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function RegisterScreen(props){

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const redirect = props.location.search? props.location.search.split('=')[1]: '/';
    const userRegister = useSelector((state) => state.userRegister);
    const { userInfo, loading, error } = userRegister; 

    const dispatch = useDispatch();
    const submitHandler = (e) =>{
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Les mots de passes ne correspondent pas');
        } else {
            dispatch(register(name, email, password));
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
                    <label htmlFor="name">Nom</label>
                    <input type="text" id="name" placeholder="Entrer votre nom" required onChange={ e => setName(e.target.value)}></input>
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
