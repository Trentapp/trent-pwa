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

export default function Map() {
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: libraries,
    });

    const [markers, setMarkers] = useState([]);

    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading Maps";

    return(
        <div>
            <GoogleMap mapContainerStyle={mapContainerStyle}
                zoom={13} center={center} option={options}
                onClick={(event) => {
                    setMarkers((current) => [
                        ...current,
                        {lat: event.latLng.lat(), lng: event.latLng.lng(), time: new Date()}
                    ]);
                }}>
                {markers.map((marker) => (
                    <Marker key={marker.time.toISOString()} position={{lat: marker.lat, lng: marker.lng}} />
                ))}
            </GoogleMap>
        </div>
    )
};