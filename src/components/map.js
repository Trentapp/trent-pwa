import React, {useState} from "react";
import {GoogleMap, useLoadScript, Marker} from "@react-google-maps/api";
import dotenv from "dotenv";
import { Box, useBreakpointValue } from "@chakra-ui/react";

import mapIcon2 from "../assets/marker2.png";
import mapIcon1 from "../assets/marker1.png";
import { ProductCardFixed } from "./ProductCard";

dotenv.config();

const libraries = ["places"];
const mapContainerStyleBig = {
    width: "50%",
    height: `${window.innerHeight - 75}px`,
    position: "fixed",
    display: "block",
    top: "75px",
};
const mapContainerStyleSmall = {
    width: "100%",
    height: `${window.innerHeight - 75}px`,
    display: "block",
    top: "75px",
};
const options = {
    disableDefaultUI: false, // I actually want to set it to true, but it does not work
}

const Map = props => {
    const mapContainerStyle = useBreakpointValue({base: mapContainerStyleSmall, md: mapContainerStyleBig});

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: libraries,
    });

    const [selected, setSelected] = useState({});

    let mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);

    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading Maps";

    // as the following is a function that is called often, maybe rather use a faster approximation later
    function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2-lat1);  // deg2rad below
        var dLon = deg2rad(lon2-lon1); 
        var a = 
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
          Math.sin(dLon/2) * Math.sin(dLon/2)
          ; 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c; // Distance in km
        return d;
      }
      
      function deg2rad(deg) {
        return deg * (Math.PI/180)
      }

    const onChangeMap = async () => {
        try {
            let [lat, lng, zoom] = [mapRef?.state?.map?.center?.lat(), mapRef?.state?.map?.center?.lng(), mapRef?.state?.map?.zoom];
            const distCenters = getDistanceFromLatLonInKm(lat, lng, props.mapCenter.lat, props.mapCenter.lng);
            if (Math.abs(zoom - props.zoom) >= 2 || distCenters > props.calcMaxDist(zoom) || distCenters > props.calcMaxDist(props.zoom)){
                props.setZoom(zoom);
                props.setMapCenter({lat: lat, lng: lng});
            }
        } catch(e) {
            console.log("Error in map->onChangeMap: ", e);
        }
    }

    return(
        <Box style={mapContainerStyle}>
            <GoogleMap mapContainerStyle={{width: "100%", height: "100%"}}
                ref={(ref) => mapRef = ref} onCenterChanged={onChangeMap} onZoomChanged={onChangeMap}
                zoom={props.zoom} center={props.mapCenter} option={options}
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

// export const MapSmall = props => {
//     const {isLoaded, loadError} = useLoadScript({
//         googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
//         libraries: libraries,
//     });

//     const [selected, setSelected] = useState({});

//     const mapRef = React.useRef();
//     const onMapLoad = React.useCallback((map) => {
//         mapRef.current = map;
//     }, []);

//     if (loadError) return "Error loading maps";
//     if (!isLoaded) return "Loading Maps";

//     return(
//         <Box style={mapContainerStyleSmall}>
//             <GoogleMap mapContainerStyle={{width: "100%", height: "100%"}}
//                 zoom={13} center={props.mapCenter} option={options}
//                 onLoad={onMapLoad} onClick={() => setSelected({})}>
//                 {props.products.map((product) => (
//                     <Marker key={product._id}
//                         position={{lat: product.location.coordinates[1], lng: product.location.coordinates[0]}}
//                         onClick={() => {
//                             setSelected(product);
//                         }}
//                         icon={(props.enhanced === product || selected === product) ? mapIcon2 : mapIcon1}
//                         />
//                 ))} {/* maybe set another icon later */ }

//                 {selected.location ? (
//                     <ProductCardFixed product={selected} />
//                 ) : null}
//             </GoogleMap>
//         </Box>
//     )
// };

export default Map;


                // <InfoWindow position={{lat: selected.location.coordinates[1], lng: selected.location.coordinates[0]}}
                //     onCloseClick={() => setSelected({})}>
                //     {/*<ProductCardSmall product={selected} />*/}
                // </InfoWindow>
