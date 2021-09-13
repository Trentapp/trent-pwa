import React, {useState, useEffect} from "react";
import qs from "qs";
import dotenv from "dotenv";
import { useTranslation } from 'react-i18next';

import ProductDataService from "../services/product-data";
import { ProductCard2 } from "./ProductCard";
import Map from "../components/map.js";
import { Box, VStack, StackDivider, Text, Stack } from "@chakra-ui/react";

dotenv.config();

const locationHD = {
  lat: 49.3988,
  lng: 8.6724,
};

const ProductsList = props => {
  const {t} = useTranslation();

  const calcMaxDist = (zoom) => window.innerHeight*0.001*2**(16-zoom);

    const [products, setProducts] = useState([]);
    const initialZoom = 14
    const searchString = props.location.search ? qs.parse(props.location.search, {ignoreQueryPrefix: true, delimiter: "&"}).search : "";
    const [filters, setFilters] = useState({name: searchString, dayPriceMax: "", hourPriceMax: "", lat: locationHD.lat, lng: locationHD.lng, maxDistance: calcMaxDist(initialZoom)});
    const [enhanced, setEnhanced] = useState();
    const [mapCenter, setMapCenter] = useState(locationHD);
    const [zoom, setZoom] = useState(initialZoom);

    useEffect(() => {
      if (props.inventory){
        setFilters(filters => ({...filters, inventoryUserId: props.user._id}));
      }
    }, [props.user, props.inventory]);

    useEffect(() => {
      setFilters(filters => ({...filters, lat: mapCenter.lat, lng: mapCenter.lng, maxDistance: calcMaxDist(zoom)}));
    }, [zoom, mapCenter]);

    useEffect(() => {
        const find = async () => {
            try {
                const response = await ProductDataService.find(filters);
                let newProducts = response.data;
                for (let i = 0; i < newProducts.length; i++){
                  newProducts[i].prices.perHour /= 100.0;
                  newProducts[i].prices.perDay /= 100.0;
                }                
                setProducts(newProducts);
            } catch(e) {
                console.log("Error in products-list find: ", e);
            }
        }
        find();
    }, [filters]);

    useEffect(() => {
      setFilters(filters => ({...filters, name: props.location.search ? qs.parse(props.location.search, {ignoreQueryPrefix: true, delimiter: "&"}).search : ""}));
    }, [props.location.search]);

    useEffect(() => { //works at my parents, but not in HD //attention: possible "error" (actually correct functioning except in the beginning, though it should work)
      if (process.env.REACT_APP_DEV_ENV !== "hd"){
        navigator.geolocation.getCurrentPosition((position) => {
            //problem: that way of getting the location is super imprecise.
            setFilters(filters => ({...filters, lat: position.coords.latitude, lng: position.coords.longitude}));
            setMapCenter({lat: position.coords.latitude, lng: position.coords.longitude});
        }, (err) => console.log("Could not get Geoposition: ", err), {enableHighAccuracy: true, timeout: 3000});
      }
    }, []);

    //maybe add later that the results are automatically updated when you change a filter property and you don't need to click on apply
    return(
        <Box w="100%">
            <Stack w="100%" direction={{base: "column", md: "row"}}>
              <Box w={{base: "100%", md: "50%"}} h="100%">
                <Map {...props} products={products.filter(product => product.location)} enhanced={enhanced} setMapCenter={setMapCenter} mapCenter={mapCenter} zoom={zoom} setZoom={setZoom} calcMaxDist={calcMaxDist}/>
              </Box>
              <Box  w={{base: "100%", md: "50%"}}>
                <VStack divider={<StackDivider borderColor="gray.200" />}>
                  {products?.length ? products.map((product) => <ProductCard2 product={product} setEnhanced={setEnhanced}/>) : <Text marginTop={3} fontSize="lg">{t("products-list.No items found")}</Text>} {/* try similar products or increase search area (?) */}
                </VStack>
              </Box>
            </Stack>
        </Box>
    );
};

export default ProductsList;

// todo: add filters

