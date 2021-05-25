import React, {useState, useEffect} from "react";
import ProductDataService from "../services/product-data";
import {Link, useHistory} from "react-router-dom";

const Product = props => {
    const [product, setProduct] = useState({}); //maybe add better initial state
    let history = useHistory();

    const getProduct = async id => {
        try {
            const response = await ProductDataService.get(id);
            setProduct(response.data);
        } catch(e) {
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
            <h2>{product.name}</h2>
            <p>Price: {product.pricePerHour}€/hour, {product.pricePerDay}€/day</p>
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
            <p><Link to={`/products/update/${product._id}`}>Edit product</Link></p>
            <button type="button" className="btn btn-danger" onClick={deleteProduct}>Delete</button>
        </div>
    )
}

export default Product;
