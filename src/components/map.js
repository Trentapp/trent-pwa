import React, {useState} from "react";
import {GoogleMap, useLoadScript, Marker} from "@react-google-maps/api";
import dotenv from "dotenv";
import { Box } from "@chakra-ui/react";

import mapIcon2 from "../assets/marker2.png";
import mapIcon1 from "../assets/marker1.png";
import { ProductCardFixed } from "./ProductCard";

dotenv.config();

const libraries = ["places"];
const mapContainerStyle = {
    width: "50%",
    height: `${window.innerHeight - 75}px`,
    position: "fixed",
    display: "block",
    top: "75px",
};
const options = {
    disableDefaultUI: false, // I actually want to set it to true, but it does not work
}

const Map = props => {
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: libraries,
    });

    const [selected, setSelected] = useState({});

    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);

    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading Maps";

    return(
        <Box style={mapContainerStyle}>
            <GoogleMap mapContainerStyle={{width: "100%", height: "100%"}}
                zoom={13} center={props.center} option={options}
                onLoad={onMapLoad} onClick={() => setSelected({})}>
                {props.products.map((product) => (
                    <Marker key={product._id}
                        position={{lat: product.location.coordinates[1], lng: product.location.coordinates[0]}}
                        onClick={() => {
                            setSelected(product);
                        }}
                        icon={(props.enhanced === product || selected === product) ? mapIcon2 : mapIcon1}
                        />
                ))} {/* maybe set another icon later */ }

                {selected.location ? (
                    <ProductCardFixed product={selected} />
                ) : null}
            </GoogleMap>
        </Box>
    )
};

export default Map;


                // <InfoWindow position={{lat: selected.location.coordinates[1], lng: selected.location.coordinates[0]}}
                //     onCloseClick={() => setSelected({})}>
                //     {/*<ProductCardSmall product={selected} />*/}
                // </InfoWindow>
