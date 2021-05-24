import React, {useState} from "react";
import ProductDataService from "../services/product-data";
import {Redirect} from "react-router-dom";
//TODO: add an editing mode

const AddProduct = props => {
    const initialProductState = { //maybe not use empty strings here. I'm not sure if they pass the required argument. 
        name: "",
        desc: "",
        pricePerHour: "",
        pricePerDay: "",
    };
    const [product, setProduct] = useState(initialProductState);
    const [submittedID, setSubmittedID] = useState(null);

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

    const saveProduct = async () => {
        try {
            const response = await ProductDataService.createProduct(product);
            setSubmittedID(response.data._id);
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
                <div className="row input-group col-lg-4">
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
