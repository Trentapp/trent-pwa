import React, {useState} from "react";
import {GoogleMap, useLoadScript, Marker, InfoWindow} from "@react-google-maps/api";
import dotenv from "dotenv";
import { AspectRatio, Box } from "@chakra-ui/react";

import mapIcon2 from "../assets/marker2.png";
import mapIcon1 from "../assets/marker1.png";

dotenv.config();

const libraries = ["places"];
const mapContainerStyle = {
    width: "50%",
    height: `${window.innerHeight - 75}px`,
    position: "fixed",
    display: "block",
    top: "75px",
};
const center = {
    lat: 49.3988,
    lng: 8.6724,
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
                zoom={13} center={center} option={options}
                onLoad={onMapLoad}>
                {props.products.map((product) => (
                    <Marker key={product._id}
                        position={{lat: product.location.coordinates[1], lng: product.location.coordinates[0]}}
                        onClick={() => {
                            setSelected(product);
                        }}
                        icon={props.enhanced == product ? mapIcon2 : mapIcon1}
                        />
                ))} {/* maybe set another icon later */ }

                {selected.location ? (
                <InfoWindow position={{lat: selected.location.coordinates[1], lng: selected.location.coordinates[0]}}
                    onCloseClick={() => setSelected({})}>
                    <Box>
                        <h4>{selected.name}</h4>
                        <p>{selected.desc}</p>
                    </Box>
                </InfoWindow>) : null}
            </GoogleMap>
        </Box>
    )
};

export default Map;
