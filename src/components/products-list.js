import React, {useState, useEffect} from "react";
import qs from "qs";

import ProductDataService from "../services/product-data";
import { ProductCard2 } from "./product-list-item";
import Map from "../components/map.js";
import { Box, HStack, VStack, StackDivider } from "@chakra-ui/react";

const locationHD = {
  lat: 49.3988,
  lng: 8.6724,
};

const ProductsList = props => {
    const [products, setProducts] = useState([]);
    const searchString = props.location.search ? qs.parse(props.location.search, {ignoreQueryPrefix: true, delimiter: "&"}).search : "";
    const [filters, setFilters] = useState(props.inventory ? {name: searchString, dayPriceMax: "", hourPriceMax: "", lat: locationHD.lat, lng: locationHD.lng, inventoryUserId: props.user._id} : {name: searchString, dayPriceMax: "", hourPriceMax: "", lat: locationHD.lat, lng: locationHD.lng});
    const [enhanced, setEnhanced] = useState();
    //add possibilities for pagination later

    useEffect(() => {
      if (props.inventory){
        setFilters(filters => ({...filters, inventoryUserId: props.user._id}));
      }
    }, [props.user, props.inventory]);

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

    useEffect(() => {
      setFilters(filters => ({...filters, name: props.location.search ? qs.parse(props.location.search, {ignoreQueryPrefix: true, delimiter: "&"}).search : ""}));
    }, [props.location.search]);

    useEffect(() => { //works at my parents, but not in HD
        navigator.geolocation.getCurrentPosition((position) => {
            //problem: that way of getting the location is super imprecise.
            setFilters(filters => ({...filters, lat: position.coords.latitude, lng: position.coords.longitude}));
            console.log("My position: ", position.coords.latitude, " ", position.coords.longitude);
        }, (err) => console.log("Could not get Geoposition: ", err), {enableHighAccuracy: true, timeout: 3000});
    }, []);

    //maybe add later that the results are automatically updated when you change a filter property and you don't need to click on apply
    return(
        <Box w="100%">
            <HStack w="100%">
              <Box w="50%" h="100%">
                <Map {...props} products={products.filter(product => product.location)} enhanced={enhanced}/>
              </Box>
              <Box w="50%">
                <VStack divider={<StackDivider borderColor="gray.200" />}>
                  {products.map((product) => <ProductCard2 product={product} setEnhanced={setEnhanced}/>)}
                </VStack>
              </Box>
            </HStack>
        </Box>
    );
};

export default ProductsList;


/* <div className="col-lg-4 pb-3" key={product._id}>
  <div className="card">
    <div className="card-body">
      <h5 className="card-title">{product.name}</h5>
      {product.thumbnail && <img alt="ups" src={`data:${product.thumbnail.contentType};base64,${Buffer.from(product.thumbnail.data.data).toString('base64')}`}/>}
      <p className="card-text">
        <strong>Description: </strong>{product.desc}<br/>
        <strong>Price per Hour: </strong>{product.prices.perHour}€<br/>
        <strong>Price per Day: </strong>{product.prices.perDay}€
      </p>
      <div>
        <Link to={`/products/product/${product._id}`} className="btn btn-primary col-lg-5 mx-1 mb-1">
          View details
        </Link>
      </div>
    </div>
  </div>
</div> */


/* <div className="row pb-2">
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
                  value={filters.dayPriceMax}
                  onChange={onChangeDayPriceFilter}
                />
                <input
                  type="number"
                  className="form-control"
                  placeholder="Maximum hour price (in €)"
                  value={filters.hourPriceMax}
                  onChange={onChangeHourPriceFilter}
                />
              </div>
            </div> */

//const onChangeSearchName = e => {
    //   e.persist();
    //   setFilters(filters => ({...filters, name: e.target.value}));
    // }

    // const onChangeDayPriceFilter = e => {
    //   e.persist();
    //   setFilters(filters => ({...filters, dayPriceMax: e.target.value}));
    // }

    // const onChangeHourPriceFilter = e => {
    //   e.persist();
    //   setFilters(filters => ({...filters, hourPriceMax: e.target.value}));
    // }
