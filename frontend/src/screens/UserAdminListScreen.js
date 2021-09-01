import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, listUsers } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_DETAILS_RESET } from '../constants/userConstants';

export default function UserAdminListScreen(props) {
    const userList = useSelector(state => state.userList);
    const { loading, error, users } = userList;

    const userDelete = useSelector(state => state.userDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = userDelete;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listUsers());
        dispatch({ type: USER_DETAILS_RESET});
    }, [dispatch, successDelete]);
    const deleteHandler = (user) => {
        if (window.confirm('Êtes-vous sur de vouloir supprimer cet utilisateur?')) {
            dispatch(deleteUser(user._id));
        }
    };
    return (
        <div>
            <h1>Users</h1>
            {loadingDelete && (<LoadingBox></LoadingBox>)}
            {errorDelete && (<MessageBox variant="danger">{errorDelete}</MessageBox>)}
            {successDelete && (<MessageBox variant="success">Utilisateur supprimé avec succès</MessageBox>)}
            {
                loading ? (
                    <LoadingBox></LoadingBox>
                ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NOM</th>
                                <th>EMAIL</th>
                                <th>EST ADMIN</th>
                                <th>ACTIONS</th>
                            </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map((user) => (
                                        <tr key={user._id}>
                                            <td>{user._id}</td>
                                            <td>{user.lastname} {user.firstname}</td>
                                            <td>{user.email}</td>
                                            <td>{user.isAdmin ? 'OUI' : 'NON'}</td>
                                            <td>
                                                <button type="button" className="small" onClick={() => props.history.push(`/user/${user._id}/edit`)}>Modifier</button>
                                                <button type="button" className="small" onClick={() => deleteHandler(user)}>Supprimer</button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                    </table>
                )
            }
        </div>
    )
}
