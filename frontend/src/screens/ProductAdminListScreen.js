import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createProduct, listProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';

export default function ProductAdminListScreen(props) {
    const productList = useSelector(state => state.productList);
    const { loading, error, products} = productList;
    const productCreate = useSelector((state) => state.productCreate);
    const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct} = productCreate;
    const dispatch = useDispatch();
    useEffect(() =>{
        if(successCreate) {
            dispatch({type: PRODUCT_CREATE_RESET});
            props.history.push(`/product/${createdProduct._id}/edit`);
        }
        dispatch(listProducts());
    }, [createdProduct, dispatch, props.history, successCreate]);
    const deleteHandler = () =>{
        //dispatch action de suppression
    };
    const createHandler = () =>{
        //dispatch action de creation
        dispatch(createProduct());
    };
    return (
        <div>
            <div className="row">
                <h1>Locations</h1>
                <button type="button" className="primary" onClick={createHandler}>Ajouter une location
                </button>
            </div>
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
                    {products.map((product) => (
                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.category}</td>
                            <td>
                                <button type ="button" className="small" onClick={() => props.history.push(`/product/${product._id}/edit`)}>Modifier</button>
                                <button type ="button" className="small" onClick={() => deleteHandler(product) }>Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            }
        </div>
    )
}
