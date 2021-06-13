import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";

import ProductDataService from "../services/product-data";
import UserDataService from "../services/user-data";
import {useAuth} from "../context/AuthContext";

//TODO: change redirect to history.push()

//later: make location of product the location of the user by default
const AddProduct = props => { //when props.match.params.id exists (meaning the function must be called over the route /products/update/:id), it does not create a new Product but update an existing one
    const initialProductState = {
        name: "",
        desc: "",
        prices: {
            perHour: "",
            perDay: "",
        },
        address: {
            street: "",
            houseNumber: "",
            zipcode: "",
            city: "",
            country: "",
        }
    };
    const [product, setProduct] = useState(initialProductState);
    const [user, setUser] = useState({name: "", address: {street: "", houseNumber: "", zipcode: "", city: "", country: ""}});//actually not currently used
    const {currentUser} = useAuth();
    const history = useHistory();
    
    useEffect(() => {
        async function getOldProduct() {
            try {
                if (props.match.params.id){
                    const response = await ProductDataService.get(props.match.params.id); //I get a warning here that I don't understand very well. Maybe change it later.
                    setProduct(response.data);
                    if (currentUser.uid !== response.data.uid){
                        history.push("/404");//"Not found" if a wrong user wants to update the product // maybe replace 404 with forbidden route or so later
                    }
                }
            } catch(e) {
                //this catch normally should only be triggered when the productID does not exist
                console.log("Error trying to retrieve old product state: ", e);
                history.push("/404");//not perfect, because it still shows content for a short second (maybe add sth like loading until the first useEffect is completed)
            }
        }
        async function getUser() {
            try {
                const response = await UserDataService.get(currentUser.uid);
                setUser(response.data);
                if (response.data.address) {//attention: if the product has a different address than the user, the address will be set to the address of the user!
                    setProduct(product => ({...product, address: response.data.address, uid: response.data.uid}));
                } else {
                    setProduct(product => ({...product, uid: response.data.uid}));
                }
            } catch (err) {
                console.log("error trying to get user: ", err);
            }
        }
        getOldProduct();
        getUser();
    }, [props.match.params.id, currentUser.uid, history]);

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
        setProduct(product => ({...product, prices: {...product.prices, perHour: e.target.value}}));
    };

    const onChangeDayPrice = e => {
        e.persist();
        setProduct(product => ({...product, prices: {...product.prices, perDay: e.target.value}}));
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
            if (props.match.params.id){
                await ProductDataService.updateProduct(props.match.params.id, product);
                history.push(`/products/product/${props.match.params.id}`);
            } else {
                const response = await ProductDataService.createProduct({product: product, uid: currentUser.uid});//probably change again later
                history.push(`/products/product/${response.data.productId}`);
            }
        } catch(e) {
            console.log(`Error in saving new product: ${e}`);
        }
    };

    return(
        <div>
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
                            placeholder="per Hour"
                            value={product.prices.perHour}
                            onChange={onChangeHourPrice}
                        />
                        <input
                            type="number"
                            className="form-control"
                            required
                            placeholder="per Day"
                            value={product.prices.perDay}
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
                            value={product.address.street}
                            onChange={onChangeStreet}
                        />
                        <input
                            type="text"
                            className="form-control"
                            required
                            placeholder="House Number"
                            value={product.address.houseNumber}
                            onChange={onChangeHouseNumber}
                        />
                    </div>
                    <div className="row input-group col-lg-4">
                        <input
                            type="text"
                            className="form-control"
                            required
                            placeholder="Zipcode"
                            value={product.address.zipcode}
                            onChange={onChangeZipcode}
                        />
                        <input
                            type="text"
                            className="form-control"
                            required
                            placeholder="City"
                            value={product.address.city}
                            onChange={onChangeCity}
                        />
                    </div>
                    <div className="row input-group col-lg-4">
                        <input
                            type="text"
                            className="form-control"
                            required
                            placeholder="Country"
                            value={product.address.country}
                            onChange={onChangeCountry}
                        />
                    </div>
                </div>
                <button onClick={saveProduct} className="btn btn-success">
                Submit
                </button>
            </div>
        </div>
    );
}

export default AddProduct;
