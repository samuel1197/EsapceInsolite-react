import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { listUsers } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function UserAdminListScreen() {
    const userList = useSelector(state => state.userList);
    const { loading, error, users } = userList;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listUsers());
    }, [dispatch])
    return (
        <div>
            <h1>Users</h1>
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
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>IS ADMIN</th>
                                <th>ACTIONS</th>
                            </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map((user) => (
                                        <tr key={user._id}>
                                            <td>{user._id}</td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.isAdmin ? 'OUI' : 'NON'}</td>
                                            <td>
                                                <button>Modifier</button>
                                                <button>Supprimer</button>
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
