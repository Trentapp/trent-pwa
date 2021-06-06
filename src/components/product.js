import React, {useState, useEffect} from "react";
import ProductDataService from "../services/product-data";
import {Link, useHistory} from "react-router-dom";
import Map from "../components/map.js";

const Product = props => {
    const [product, setProduct] = useState({}); //maybe add better initial state
    const [error, setError] = useState(""); //Later: replace error to redirect to 404 page
    let history = useHistory();

    const getProduct = async id => {
        try {
            const response = await ProductDataService.get(id);
            setProduct(response.data);
        } catch(e) {
            setError("Could not find that product.");
            console.log("Error in product.js - getProduct: ", e);
        }
    };

    const deleteProduct = async () => {
        try {
            await ProductDataService.deleteProduct(product._id);
            history.push("/products");
        } catch(e) {
            console.log("Failed to delete product: ", e);
        }
    };

    useEffect(() => {
        getProduct(props.match.params.id);
    }, [props.match.params.id]);

    return(
        <div>
            {error ? <h5>{error}</h5> : (
            <>
                <div className="mb-4">
                    <h2>{product.name}</h2>
                    <p>Price: {product.prices.perHour}€/hour, {product.prices.perDay}€/day</p>
                    <p><span>Description: </span>{product.desc}</p>
                    <p>more features and better style to be added.</p>
                    {product.address ? (
                        <>
                        <span>Location</span>
                        <p>{product.address.street} {product.address.houseNumber}</p>
                        <p>...</p>
                        <p>{product.address.country}</p>
                        </>
                    ) : (<></>)}
                    {product.location ? (
                        <>
                        <p>Lat, lng: {product.location.lat} {product.location.lng}</p>
                        </>
                    ) : (<></>)}
                    <p><Link to={`/products/update/${product._id}`}>Edit product</Link></p>
                    <button type="button" className="btn btn-danger" onClick={deleteProduct}>Delete</button>
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
