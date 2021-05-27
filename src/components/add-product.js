import React, {useState, useMemo} from "react";
import ProductDataService from "../services/product-data";
import {Redirect} from "react-router-dom";
import Geocode from "react-geocode";
import dotenv from "dotenv";

dotenv.config();
Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);


//later: make location of product the location of the user by default
const AddProduct = props => { //when props.productIdToUpdate is passed, it does not create a new Product but update an existing one
        
    const [product, setProduct] = useState({});
    const [submittedID, setSubmittedID] = useState(null);

    const getOldProduct = async () => {
        try {
            if (props.productIdToUpdate){
                const initialProductState = await ProductDataService.get(props.productIdToUpdate); //I get a warning here that I don't understand very well. Maybe change it later.
                setProduct(initialProductState.data);
            } else {
                setProduct({
                    name: "",
                    desc: "",
                    pricePerHour: "",
                    pricePerDay: "",
                    address: {
                        street: "",
                        houseNumber: "",
                        zipcode: "",
                        city: "",
                        country: "",
                    }
                });
            }
            
        } catch(e) {
            console.log("Error trying to retrieve old product state: ", e);
        }
    }
    
    useMemo(getOldProduct, [props.productIdToUpdate]);

    //should those onChange functions be async?

    const onChangeName = e => {
        e.persist();
        setProduct(product => ({...product, name: e.target.value}));
    };

    const onChangeDesc = e => {
        e.persist();
        setProduct(product => ({...product, desc: e.target.value}));
    };

    const onChangeHourPrice = e => {
        e.persist();
        setProduct(product => ({...product, pricePerHour: e.target.value}));
    };

    const onChangeDayPrice = e => {
        e.persist();
        setProduct(product => ({...product, pricePerDay: e.target.value}));
    };

    const onChangeStreet = e => {
        e.persist();
        setProduct(product => ({...product, address: {...product.address, street: e.target.value}}));
    };

    const onChangeHouseNumber = e => {
        e.persist();
        setProduct(product => ({...product, address: {...product.address, houseNumber: e.target.value}}));
    };

    const onChangeZipcode = e => {
        e.persist();
        setProduct(product => ({...product, address: {...product.address, zipcode: e.target.value}}));
    };

    const onChangeCity = e => {
        e.persist();
        setProduct(product => ({...product, address: {...product.address, city: e.target.value}}));
    };

    const onChangeCountry = e => {
        e.persist();
        setProduct(product => ({...product, address: {...product.address, country: e.target.value}}));
    }; //later modify the country form so we get a dropdown choice

    const saveProduct = async () => {
        try {
            //extract the geocoordinates from address and add it to product
            const responseLoc = await Geocode.fromAddress(`${product.address.street} ${product.address.houseNumber}, ${product.address.zipcode} ${product.address.city}, ${product.address.country}`); //may not need to be that detailed
            const {lat,lng} = responseLoc.results[0].geomentry.location;
            console.log(lat,lng);
            setProduct(product => ({...product, location: {lat: lat, lng: lng}})); //should I add await here so the request is send after that, or does it work like that? (Or can you only add await for promise-like functions?)
            if (props.productIdToUpdate){
                const response = await ProductDataService.updateProduct(props.productIdToUpdate, product);
                console.log(response);
                setSubmittedID(props.productIdToUpdate);
            } else {
                const response = await ProductDataService.createProduct(product);
                console.log(response);
                setSubmittedID(response.data._id);
            }
        } catch(e) {
            console.log(`Error in saving new product: ${e}`);
        }
    };

    return(
        <div>
            { submittedID ? (
                <Redirect to={`/products/product/${submittedID}`} />
            ) : (
            <div>
                <div className="form-group mb-4">
                    <div className="row input-group col-lg-4">
                    <label>Name of Product</label>
                    <input
                        type="text"
                        className="form-control"
                        required
                        placeholder="e.g. portable camping table"
                        value={product.name}
                        onChange={onChangeName}
                    />
                    </div>
                    <div className="row input-group col-lg-4">
                    <label>Description of Product</label>
                    <input
                        type="text"
                        className="form-control"
                        required
                        placeholder="e.g.: Very practical for camping tours. Up to six persons fit around the table. Very quickly put up."
                        value={product.desc}
                        onChange={onChangeDesc}
                    />
                    </div>
                    <label>Prices</label>
                    <div className="row input-group col-lg-4 mb-2">
                        <input
                            type="number"
                            className="form-control"
                            required
                            placeholder="3"
                            value={product.pricePerHour}
                            onChange={onChangeHourPrice}
                        />
                        <input
                            type="number"
                            className="form-control"
                            required
                            placeholder="12"
                            value={product.pricePerDay}
                            onChange={onChangeDayPrice}
                        />
                    </div>
                    <label>Address</label>
                    <div className="row input-group col-lg-4">
                        <input
                            type="text"
                            className="form-control"
                            required
                            placeholder="Streetname"
                            value={product.address ? product.address.street : ""}
                            onChange={onChangeStreet}
                        />
                        <input
                            type="text"
                            className="form-control"
                            required
                            placeholder="House Number"
                            value={product.address ? product.address.houseNumber : ""}
                            onChange={onChangeHouseNumber}
                        />
                    </div>
                    <div className="row input-group col-lg-4">
                        <input
                            type="text"
                            className="form-control"
                            required
                            placeholder="Zipcode"
                            value={product.address ? product.address.zipcode : ""}
                            onChange={onChangeZipcode}
                        />
                        <input
                            type="text"
                            className="form-control"
                            required
                            placeholder="City"
                            value={product.address ? product.address.city : ""}
                            onChange={onChangeCity}
                        />
                    </div>
                    <div className="row input-group col-lg-4">
                        <input
                            type="text"
                            className="form-control"
                            required
                            placeholder="Country"
                            value={product.address ? product.address.country : ""}
                            onChange={onChangeCountry}
                        />
                    </div>
                </div>
                <button onClick={saveProduct} className="btn btn-success">
                Submit
                </button>
            </div>
            )}
        </div>
    );
}

export default AddProduct;
