import React, {useState, useEffect} from "react";
import ProductDataService from "../services/product-data";


const Product = props => {
    const [product, setProduct] = useState({}); //maybe add better initial state

    const getProduct = async id => {
        try {
            const response = await ProductDataService.get(id);
            setProduct(response.data);
        } catch(e) {
            console.log("Error in product.js - getProduct: ", e);
        }
    }

    useEffect(() => {
        getProduct(props.match.params.id);
    }, [props.match.params.id]);

    return(
        <div>
            <h2>{product.name}</h2>
            <p>Price: {product.pricePerHour}€/hour, {product.pricePerDay}€/day</p>
            <p><span>Desc: </span>{product.desc}</p>
            <p>more features and better style to be added.</p>
        </div>
    )
}

export default Product;
