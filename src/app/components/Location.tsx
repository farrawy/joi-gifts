"use client";
import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  Circle,
  GoogleMap,
  LoadScript,
  Marker,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import Image from "next/image";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";

import Whatsapp from "./Whatsapp";

interface MyLocationButtonProps {
  map: google.maps.Map | null; // Reference to the map instance
}

const MyLocationButton: React.FC<MyLocationButtonProps> = ({ map }) => {
  const moveToCurrentLocation = () => {
    if (!map) return;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          map.setCenter(newPos);
        },
        (error) => {
          console.error("Error fetching location: ", error);
          // Handle location errors (user denied, etc)
        },
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      // Handle browser not supporting Geolocation
    }
  };

  return (
    <button
      style={{
        backgroundColor: "#fff",
        border: "none",
        outline: "none",
        borderRadius: "2px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
        cursor: "pointer",
        padding: "10px",
        position: "absolute",
        right: "10px",
        bottom: "110px",
      }}
      onClick={moveToCurrentLocation}
      title="Click to set the map to your current location">
      <Image
        src="/locate-me-outline.png"
        alt="My Location"
        width={20}
        height={20}
        className=""
      />
    </button>
  );
};

type LatLng = {
  lat: number;
  lng: number;
};

const defaultPosition: LatLng = {
  lat: 24.712729064514974,
  lng: 46.67615242701416,
};

const MapComponent: React.FC = () => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markerPosition, setMarkerPosition] = useState<LatLng | null>(null);
  const [address, setAddress] = useState<string>("");
  const [state, setState] = useState("");
  const [currentPosition, setCurrentPosition] =
    useState<LatLng>(defaultPosition);
  const [userPosition, setUserPosition] = useState<LatLng | null>(null);
  const searchBoxRef = useRef<StandaloneSearchBox>();

  const [instructions, setInstructions] = useState<string>("");
  const [showInstructions, setShowInstructions] = useState<boolean>(false);

  const [isMapLoaded, setIsMapLoaded] = useState<boolean>(true);
  const [isLocationFetched, setIsLocationFetched] = useState<boolean>(true);

  const isLoading = !isMapLoaded || !isLocationFetched;

  const fetchAddress = useCallback((lat: number, lng: number) => {
    if (typeof google === "undefined") {
      console.log("Google Maps API not loaded.");
      return;
    }

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
            console.log(results[0]);
          } else {
            setAddress("No address found");
          }
        } else {
          console.log("Geocoder failed due to: " + status);
          setAddress("Error Fetching Location Details");
        }
      },
    );
  }, []);

  // const fetchUserLocation = useCallback(() => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position: GeolocationPosition) => {
  //         const userLoc: LatLng = {
  //           lat: position.coords.latitude,
  //           lng: position.coords.longitude,
  //         };

  //         setUserPosition(userLoc);
  //         setMarkerPosition(userLoc);
  //         setCurrentPosition(userLoc);

  //         fetchAddress(userLoc.lat, userLoc.lng);

  //         setIsLocationFetched(false);
  //       },
  //       (error: GeolocationPositionError) => {
  //         console.log(error);
  //       },
  //     );
  //   } else {
  //     console.log("Geolocation is not supported by this browser.");
  //     setAddress("Geolocation is not supported by this browser.");
  //     setIsLocationFetched(false);
  //   }
  // }, []);

  const handleRelocate = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const userLoc: LatLng = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          setUserPosition(userLoc);
          setMarkerPosition(userLoc);
          setCurrentPosition(userLoc);

          fetchAddress(userLoc.lat, userLoc.lng);
        },
        (error: GeolocationPositionError) => {
          console.log(error);
        },
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
      setAddress("Geolocation is not supported by this browser.");
    }
  }, []);

  const fetchUserLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const userLoc: LatLng = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          setUserPosition(userLoc);
          setMarkerPosition(userLoc);
          setCurrentPosition(userLoc);

          // Fetch address if the Google Maps API has loaded
          if (isMapLoaded) {
            fetchAddress(userLoc.lat, userLoc.lng);
          }

          setIsLocationFetched(true);
        },
        (error: GeolocationPositionError) => {
          console.error("Error fetching user location: ", error.message);
          setAddress("Error fetching user location");
          setIsLocationFetched(true);
        },
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setAddress("Geolocation is not supported by this browser.");
      setIsLocationFetched(true);
    }
  }, [isMapLoaded]);

  useEffect(() => {
    fetchUserLocation();
  }, [fetchUserLocation]);

  const onMarkerDragEnd = useCallback(
    (e: google.maps.MapMouseEvent) => {
      if (e.latLng) {
        const newLat = e.latLng.lat();
        const newLng = e.latLng.lng();
        setMarkerPosition({ lat: newLat, lng: newLng });
        fetchAddress(newLat, newLng);
      }
    },
    [fetchAddress],
  );

  const onMapLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
    setIsMapLoaded(true);
  }, []);

  const onPlacesChanged = useCallback(() => {
    const places = searchBoxRef.current?.getPlaces?.();
    if (places && places.length) {
      const location = places[0].geometry?.location;
      if (location) {
        const newLat = location.lat();
        const newLng = location.lng();
        const newLocation: LatLng = { lat: newLat, lng: newLng };

        setMarkerPosition(newLocation);
        setCurrentPosition(newLocation);
        fetchAddress(newLat, newLng);
      }
    }
  }, [fetchAddress]);

  return (
    <Box className="max-w-lg relative">
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <LoadScript
            googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
            libraries={["places"]}>
            <GoogleMap
              mapContainerStyle={{
                height: "300px",
                width: "100%",
                borderRadius: "10px 10px 0 0",
              }}
              center={currentPosition}
              zoom={17}
              onLoad={onMapLoad}
              clickableIcons={false}
              options={{
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
                zoomControl: true,
              }}>
              {markerPosition && (
                <Marker
                  position={currentPosition}
                  draggable={true}
                  onDragEnd={onMarkerDragEnd}
                />
              )}

              {userPosition && (
                <>
                  <Circle
                    center={userPosition}
                    radius={15} // Outer circle radius
                    options={{
                      strokeColor: "#4285F4",
                      strokeOpacity: 0.8,
                      strokeWeight: 2,
                      fillColor: "#4285F4",
                      fillOpacity: 0.35,
                    }}
                  />
                  <Circle
                    center={userPosition}
                    radius={5} // Inner circle radius, smaller than the outer circle
                    options={{
                      strokeColor: "#FFFFFF",
                      strokeOpacity: 1,
                      strokeWeight: 2,
                      fillColor: "#4285F4",
                      fillOpacity: 1,
                    }}
                  />
                </>
              )}

              <StandaloneSearchBox
                onLoad={(ref) => {
                  // @ts-ignore
                  searchBoxRef.current = ref;
                }}
                onPlacesChanged={onPlacesChanged}>
                <TextField
                  inputMode="text"
                  variant="outlined"
                  label="Please select your address"
                  placeholder=""
                  className="max-w-[95%] w-full left-1/2 transform -translate-x-1/2 top-5 text-field"
                />
              </StandaloneSearchBox>
              <MyLocationButton map={map} />
            </GoogleMap>
            {address.length > 0 && (
              <Paper
                sx={{
                  borderRadius: "0 0 10px 10px",
                }}
                className="
            flex
            justify-center
            items-center
            w-full
            h-auto
            shadow-md
            text-gray-500
            font-medium
            p-5
        ">
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
                      {address}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            )}
          </LoadScript>

          {/* <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="text-[#444444] font-medium hover:bg-transparent my-3 underline">
            {showInstructions ? "Hide" : "Show"} Delivery Address Instructions
            <Image
              src={"/chevron-arrow-down.png"}
              width={20}
              height={20}
              alt="chevron arrow down"
              className={`${
                showInstructions ? "rotate-180" : ""
              } inline-block ml-2 `}
            />
          </button>
          <Box
            className={` mt-5 mb-2 space-x-2 max-w-lg  ${
              showInstructions ? "flex" : "hidden"
            }`}>
            <TextField
              multiline
              rows={3}
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              label="Delivery Address Instructions"
              className="w-full text-field"
              variant="outlined"
            />
          </Box> */}

          <button className="mt-0 w-full uppercase font-medium text-lg btn">
            Submit My Address
          </button>
        </>
      )}
    </Box>
  );
};

export default MapComponent;
