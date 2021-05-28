import React, {useState} from "react";
import {GoogleMap, useLoadScript, Marker, InfoWindow} from "@react-google-maps/api";
import dotenv from "dotenv";

dotenv.config();

const libraries = ["places"];
const mapContainerStyle = {
    width: "100%",
    height: "100vh",
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
        <div>
            <GoogleMap mapContainerStyle={mapContainerStyle}
                zoom={13} center={center} option={options}
                onLoad={onMapLoad}>
                {props.products.map((product) => (
                    <Marker key={product._id}
                        position={{lat: product.location.lat, lng: product.location.lng}}
                        onClick={() => {
                            setSelected(product);
                        }} />
                ))} {/* maybe set another icon later */ }

                {selected.location ? (
                <InfoWindow position={{lat: selected.location.lat, lng: selected.location.lng}}
                    onCloseClick={() => setSelected({})}>
                    <div>
                        <h4>{selected.name}</h4>
                        <p>{selected.desc}</p>
                    </div>
                </InfoWindow>) : null}
            </GoogleMap>
        </div>
    )
};

export default Map;
