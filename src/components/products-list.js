import React, {useState, useEffect} from "react";
import ProductDataService from "../services/product-data";
import {Link} from "react-router-dom";

// TODO: connect to backend to return products (setup axios, create service folder and file to connect to backend, update this component)
// later add filtering

const ProductsList = props => {

    const [products, setProducts] = useState([]);

    const getAllProducts = async () => {
        try {
            const response = await ProductDataService.getAll();
            setProducts(response.data);
        } catch(e) {
            console.log("Error in products-list getAllProducts: ", e);
        }
    };
    useEffect(() => {
        getAllProducts();
    }, []);

    return(
        <div>
            <p>Search and filter options will be provided soon.</p>
            <div className="row">
            {products.map((product) => {
              return (
                <div className="col-lg-4 pb-1" key={product._id}>
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text">
                        <strong>Description: </strong>{product.desc}<br/>
                        <strong>Price per Hour: </strong>{product.price.perHour}€<br/>
                        <strong>Price per Day: </strong>{product.price.perDay}€
                      </p>
                      <div>
                        <Link to={`/products/product/${product._id}`} className="btn btn-primary col-lg-5 mx-1 mb-1">
                          View details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            </div>
        </div>
    );
};

export default ProductsList;
