import React, {useState, useEffect} from "react";
import {Link, useHistory} from "react-router-dom";

import ProductDataService from "../services/product-data";
import Map from "../components/map.js";
import {useAuth} from "../context/AuthContext";

const Product = props => {
    const [product, setProduct] = useState({prices: {}}); //maybe add better initial state, though currently the information is shown conditionally
    const [error, setError] = useState(""); //can get rid of that if redirect works
    let history = useHistory();
    const {currentUser} = useAuth();

    const deleteProduct = async () => {
        try {
            await ProductDataService.deleteProduct(product._id);
            history.push("/products");
        } catch(e) {
            console.log("Failed to delete product: ", e);
        }
    };

    useEffect(() => {
        const getProduct = async id => {
            try {
                const response = await ProductDataService.get(id);
                setProduct(response.data);
            } catch(e) {
                setError("Could not find that product.");
                console.log("Error in product.js - getProduct: ", e);
                history.push("/404");
            }
        };
        getProduct(props.match.params.id);
    }, [props.match.params.id, history]);

    return(
        <div>
            {error ? <h5>{error}</h5> : (
            <>
                <div className="mb-4">
                    <h2>{product.name}</h2>
                    <p>Price: {product.prices.perHour}€/hour, {product.prices.perDay}€/day</p>
                    <p><span>Description: </span>{product.desc}</p>
                    {product.pictures && product.pictures[0] && <img src={`data:image/png;base64,${product.pictures[0]}`}/>}
                    <br/><br/>
                    {product.address && (
                        <>
                        <span>Address</span>
                        <p>{product.address.street} {product.address.houseNumber}</p>
                        <p>...</p>
                        <p>{product.address.country}</p>
                        </>
                    )}
                    {product.location && (
                        <p>Lat, lng: {product.location.lat} {product.location.lng}</p>
                    )}
                    {currentUser.uid === product.uid && (<>
                        <p><Link to={`/products/update/${product._id}`}>Edit product</Link></p>
                        <button type="button" className="btn btn-danger" onClick={deleteProduct}>Delete</button>
                    </>)}
                    </div>
                <div>
                    {product.location && <Map {...props} products={[product]}/>}
                </div>
            </>
            )}
        </div>
    )
}

export default Product;
