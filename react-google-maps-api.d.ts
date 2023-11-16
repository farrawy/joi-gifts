import "@react-google-maps/api";

declare module "@react-google-maps/api" {
  interface StandaloneSearchBox {
    getPlaces?: () => google.maps.places.PlaceResult[];
  }
}
