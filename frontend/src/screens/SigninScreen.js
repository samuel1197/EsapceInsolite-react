import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import { signin } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';



export default function SigninScreen(props){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const redirect = props.location.search? props.location.search.split('=')[1]: '/';
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo, loading, error } = userSignin; 

    const dispatch = useDispatch();
    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(signin(email, password))
    };
    useEffect(() =>{
        if(userInfo) {
            props.history.push(redirect);
        }
    }, [props.history, redirect, userInfo]);
    return(
        <div>
            <form className="form sign" onSubmit={submitHandler}>
                <div>
                    <h1 className="titlesign">Connexion</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div>
                    <label htmlFor="email">Adresse mail</label>
                    <input type="email" id="email" placeholder="Entrer votre adresse mail" required onChange={ e => setEmail(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="password">Mot de passe</label>
                    <input type="password" id="password" placeholder="Entrer votre mot de passe" required onChange={ e => setPassword(e.target.value)}></input>
                </div>
                <div>
                    <label />
                    <button className="primary" type="submit">Se connecter</button>
                </div>
                <div>
                    <label />
                    <div>
                        Pas encore de compte ? <Link to={`/register?redirect=${redirect}`}>Créer votre compte</Link>
                    </div>
                </div>
                
            </form>
        </div>
    )
}
