import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listOptions } from '../actions/optionAction';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function OptionAdminListScreen(props) {
    const optionList = useSelector(state => state.optionList);
    const { loading, error, options } = optionList;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listOptions());
    }, [dispatch]);
    const deleteHandler = () => {
        
    }
    return (
        <div>
            <h1>Options de location</h1>
            {
                loading ? <LoadingBox></LoadingBox>
                :
                error ? <MessageBox variant="danger">{error}</MessageBox>
                :
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NOM</th>
                        </tr>
                    </thead>
                    <tbody>
                        {options.map((option) => (
                        <tr key={option._id}>
                            <td>{option._id}</td>
                            <td>{option.name}</td>
                            <td>{option.price}</td>
                            <td>{option.category}</td>
                            <td>
                                <button type ="button" className="small" onClick={() => props.history.push(`/option/${option._id}/edit`)}>Modifier</button>
                                <button type ="button" className="small" onClick={() => deleteHandler(option) }>Supprimer</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            }
        </div>
    )
}
