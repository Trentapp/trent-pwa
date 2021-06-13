import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";

import ProductDataService from "../services/product-data";
import Map from "../components/map.js";
import {useAuth} from "../context/AuthContext";

// TODO: connect to backend to return products (setup axios, create service folder and file to connect to backend, update this component)
// later add filtering

const ProductsList = props => {
    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState({name: "", day_price_max: "", hour_price_max: ""});//not sure if this is the best way because we often only need to update one filter and not reset the entire filter object
    const {currentUser} = useAuth();
    //add possibilities for pagination later

    const onChangeSearchName = e => {
      e.persist();
      setFilters(filters => ({...filters, name: e.target.value}));
    }

    const onChangeDayPriceFilter = e => {
      e.persist();
      setFilters(filters => ({...filters, day_price_max: e.target.value}));
    }

    const onChangeHourPriceFilter = e => {
      e.persist();
      setFilters(filters => ({...filters, hour_price_max: e.target.value}));
    }

    useEffect(() => {
      if (props.inventory){
        setFilters(filters => ({...filters, inventory_uid: currentUser.uid})); //I hope that this strictly triggers after useAuth() (to get current user)
      }
    }, [props.inventory, currentUser.uid])

    useEffect(() => {
        const find = async () => {
            try {
                const response = await ProductDataService.find(filters);
                setProducts(response.data);
            } catch(e) {
                console.log("Error in products-list find: ", e);
            }
        }
        find();
    }, [filters]);

    //maybe add later that the results are automatically updated when you change a filter property and you don't need to click on apply
    return(
        <div>
            <div className="row pb-2">
              <div className="input-group col-lg-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by name"
                  value={filters.name}
                  onChange={onChangeSearchName}
                />
              </div>
              <div className="input-group col-lg-4">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Maximum day price (in €)"
                  value={filters.day_price_max}
                  onChange={onChangeDayPriceFilter}
                />
                <input
                  type="number"
                  className="form-control"
                  placeholder="Maximum hour price (in €)"
                  value={filters.hour_price_max}
                  onChange={onChangeHourPriceFilter}
                />
              </div>
            </div>
            <div className="row">
            {products.map((product) => {
              //TODO: add address here and include view map
              return (
                <div className="col-lg-4 pb-3" key={product._id}>
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
                      {product.thumbnail && <img src={`${product.thumbnail}`}/>}{/*attention! for fynns pictures I would need that prefix: data:image/png;base64, // Can I use png for jpeg images when I converted them to base64?*/}
                      <p className="card-text">
                        <strong>Description: </strong>{product.desc}<br/>
                        <strong>Price per Hour: </strong>{product.prices.perHour}€<br/>
                        <strong>Price per Day: </strong>{product.prices.perDay}€
                      </p>
                      <div>
                        <Link to={`/products/product/${product._id}`} className="btn btn-primary col-lg-5 mx-1 mb-1">
                          View details
                        </Link>
                        { product.address && (
                        <a className="btn btn-primary col-lg-5 mx-1 mb-1" href={"https://www.google.com/maps/place/" + 
                          `${product.address.street} ${product.address.houseNumber}, ${product.address.city}`}>
                          View Map
                        </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            </div>
            <div>
              <Map {...props} products={products.filter(product => product.location)}/>
            </div>
        </div>
    );
};

export default ProductsList;
