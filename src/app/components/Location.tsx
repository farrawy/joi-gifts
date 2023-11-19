"use client";
import React, { useState, useCallback, useRef } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import Image from "next/image";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Input,
  InputBase,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Whatsapp from "./Whatsapp";

type LatLng = {
  lat: number;
  lng: number;
};

const defaultPosition: LatLng = {
  lat: 24.712729064514974,
  lng: 46.67615242701416,
};

const MapComponent: React.FC = () => {
  const [map, setMap] = useState<google.maps.Map>();
  const [markerPosition, setMarkerPosition] = useState<LatLng>(defaultPosition);
  const [address, setAddress] = useState<string>("");
  const [state, setState] = useState("");
  const searchBoxRef = useRef<StandaloneSearchBox>();

  const [buildingNo, setBuildingNo] = useState<string>("");
  const [floorNo, setFloorNo] = useState<string>("");
  const [doorNo, setDoorNo] = useState<string>("");
  const [instructions, setInstructions] = useState<string>("");

  const onMapLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onPlacesChanged = useCallback(() => {
    const places = searchBoxRef.current?.getPlaces?.();
    if (places && places.length) {
      const location = places[0].geometry?.location;
      if (location) {
        const newLat = location.lat();
        const newLng = location.lng();
        setMarkerPosition({ lat: newLat, lng: newLng });
        map?.panTo(location);
        fetchAddress(newLat, newLng);
      }
    }
  }, [map]);

  const fetchAddress = async (lat: number, lng: number) => {
    const geocoder = new google.maps.Geocoder();

    geocoder.geocode(
      {
        location: { lat, lng },
      },
      (results, status) => {
        if (status === "OK") {
          if (results && results[0]) {
            setAddress(results[0].formatted_address);
            setState(results[0].address_components[2].long_name);
          } else {
            setAddress("No address found");
          }
        } else {
          console.log("Geocoder failed due to: " + status);
          setAddress("Error Fetching Location Details");
        }
      },
    );
  };

  return (
    <Box className="max-w-lg relative">
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
        libraries={["places"]}>
        <Typography className="font-medium select-address-text mb-3">
          Please select the address from the map
        </Typography>
        <GoogleMap
          mapContainerStyle={{
            height: "500px",
            width: "100%",
            borderRadius: "10px 10px 0 0",
          }}
          center={markerPosition}
          zoom={15}
          onLoad={onMapLoad}
          clickableIcons={false}
          options={{
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
            zoomControl: true,
          }}>
          <Marker
            position={markerPosition}
            draggable={true}
            onDragEnd={(e) => {
              if (e.latLng) {
                const newLat = e.latLng.lat();
                const newLng = e.latLng.lng();
                setMarkerPosition({ lat: newLat, lng: newLng });
                fetchAddress(newLat, newLng);
              }
            }}
          />

          <StandaloneSearchBox
            onLoad={(ref) => {
              // @ts-ignore
              searchBoxRef.current = ref;
            }}
            onPlacesChanged={onPlacesChanged}>
            <TextField
              inputMode="text"
              variant="outlined"
              label="Search"
              placeholder=""
              className="max-w-[95%] w-full left-1/2 transform -translate-x-1/2 top-5 text-field"
            />
          </StandaloneSearchBox>
        </GoogleMap>
        <Paper
          sx={{
            borderRadius: "0 0 10px 10px",
          }}
          className="
            flex
            justify-center
            items-center
            w-full
            h-28
            shadow-md
            text-gray-500
            font-medium
            p-5
        ">
          {address.length > 0 ? (
            <Box className="flex items-center">
              <Image
                src={"/pin.png"}
                alt="map drop pin"
                width={40}
                height={40}
                className=""
              />
              <Box className="ml-4">
                <Typography
                  className="text-gray-700 
              font-semibold text-lg 
                ">
                  {state}
                </Typography>
                <Typography
                  className="
              text-gray-500
              font-medium
              text-sm
              ">
                  PM7G+426, Al Olaya, Riyadh 12214, Saudi Arabia PM7G+426, Al
                  Olaya, Riyadh 12214, Saudi Arabia PM7G+426,
                </Typography>
              </Box>
            </Box>
          ) : (
            <Typography>Please Select an Address</Typography>
          )}
        </Paper>
      </LoadScript>

      <Box className="flex mt-5 space-x-2 max-w-lg">
        <TextField
          value={buildingNo}
          onChange={(e) => setBuildingNo(e.target.value)}
          label="Building No"
          inputMode="text"
          variant="outlined"
          className=" text-field"
        />
        <TextField
          value={floorNo}
          onChange={(e) => setFloorNo(e.target.value)}
          label="Floor No"
          variant="outlined"
          className=" text-field"
        />
        <TextField
          type="text"
          value={doorNo}
          onChange={(e) => setDoorNo(e.target.value)}
          label="Door No"
          variant="outlined"
          className=" text-field"
        />
      </Box>
      <Box className="flex mt-5 space-x-2 max-w-lg">
        <TextField
          multiline
          rows={3}
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          label="Delivery Address Instructions"
          className="w-full text-field"
          variant="outlined"
        />
      </Box>

      <Whatsapp phoneNumber="+966596007020" message="Interested!" />

      <Button
        className="mt-5 w-full uppercase font-medium text-lg btn"
        variant="contained">
        Submit My Address
      </Button>
    </Box>
  );
};

export default MapComponent;
