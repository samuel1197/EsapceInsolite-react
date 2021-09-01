import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createLocation, deleteLocation, listLocations } from '../actions/locationActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { LOCATION_CREATE_RESET, LOCATION_DELETE_RESET } from '../constants/locationConstants';

export default function LocationAdminListScreen(props) {
    const locationList = useSelector(state => state.locationList);
    const { loading, error, locations} = locationList;

    const locationCreate = useSelector((state) => state.locationCreate);
    const { loading: loadingCreate, error: errorCreate, success: successCreate, location: createdLocation} = locationCreate;
    
    const locationDelete = useSelector(state => state.locationDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete} = locationDelete;
    
    const dispatch = useDispatch();
    useEffect(() =>{
        if(successCreate) {
            dispatch({type: LOCATION_CREATE_RESET});
            props.history.push(`/location/${createdLocation._id}/edit`);
        }
        if(successDelete) {
            dispatch({type: LOCATION_DELETE_RESET});
        }
        dispatch(listLocations());
    }, [createdLocation, dispatch, props.history, successCreate, successDelete]);
    
    const deleteHandler = (location) =>{
        //dispatch action de suppression
        if(window.confirm('Êtes-vous sur de vouloir supprimer cette location ?')) {
            dispatch(deleteLocation(location._id));
        }
    };
    const createHandler = () =>{
        //dispatch action de creation
        dispatch(createLocation());
    };
    return (
        <div>
            <div className="row">
                <h1>Locations</h1>
                <button type="button" className="primary" onClick={createHandler}>Ajouter une location
                </button>
            </div>
            {loadingDelete && <LoadingBox></LoadingBox>}
            {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}  
            {loadingCreate && <LoadingBox></LoadingBox>}
            {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}      
            { loading? <LoadingBox></LoadingBox>
            :
            error? <MessageBox variant="danger">{error}</MessageBox>
            :
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NOM</th>
                        <th>PRIX</th>
                        <th>CATEGORIE</th>
                        <th>ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {locations.map((location) => (
                        <tr key={location._id}>
                            <td>{location._id}</td>
                            <td>{location.name}</td>
                            <td>{location.price}</td>
                            <td>{location.category}</td>
                            <td>
                                <button type ="button" className="small" onClick={() => props.history.push(`/location/${location._id}/edit`)}>Modifier</button>
                                <button type ="button" className="small" onClick={() => deleteHandler(location) }>Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            }
        </div>
    )
}
