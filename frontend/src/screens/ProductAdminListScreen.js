import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function ProductAdminListScreen(props) {
    const productList = useSelector(state => state.productList);
    const { loading, error, products} = productList;
    const dispatch = useDispatch();
    useEffect(() =>{
        dispatch(listProducts());
    }, [dispatch]);
    const deleteHandler = () =>{
        //dispatch action de suppression
    };
    return (
        <div>
            <h1>Locations</h1>
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
                                <button type ="button" className="small" onClick={() => props.history.push(`/products/${product._id}/edit`)}>Modifier</button>
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
