import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useLocationStore } from "../store/useLocationStore";

const MiniMap = ({ shops }) => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const [selectedShop, setSelectedShop] = useState(null);
  const [directions, setDirections] = useState(null);

  const [newShopLocation, setNewShopLocation] = useState(null);
  const [showAddPopup, setShowAddPopup] = useState(false);

  const { location } = useLocationStore();

  const center = useMemo(() => {
    if (location) return location;

    if (shops.length > 0) {
      return {
        lat: shops[0].latitude,
        lng: shops[0].longitude,
      };
    }

    return {
      lat: 20.5937,
      lng: 78.9629,
    };
  }, [location, shops]);

  const mapOptions = {
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
  };

  const getDirections = async () => {
    if (!location || !selectedShop) return;

    const directionsService = new window.google.maps.DirectionsService();

    try {
      const result = await directionsService.route({
        origin: location,
        destination: {
          lat: selectedShop.latitude,
          lng: selectedShop.longitude,
        },
        travelMode: window.google.maps.TravelMode.DRIVING,
      });

      setDirections(result);
    } catch (err) {
      console.error(err);
    }
  };

  const renderMap = (height) => (
    <GoogleMap
      mapContainerStyle={{
        width: "100%",
        height,
      }}
      center={center}
      zoom={13}
      options={mapOptions}
      onClick={(e) => {
        setSelectedShop(null);
        setDirections(null);

        setNewShopLocation({
          lat: e.latLng.lat(),
          lng: e.latLng.lng(),
        });

        setShowAddPopup(true);
      }}
    >
      {/* User Location */}
      {location && (
        <Marker
          position={location}
          icon={{
            path: window.google.maps.SymbolPath.CIRCLE,
            fillColor: "#4285F4",
            fillOpacity: 1,
            strokeColor: "#FFFFFF",
            strokeWeight: 3,
            scale: 8,
          }}
        />
      )}

      {/* Existing Shop Markers */}
      {shops.map((shop) => (
        <Marker
          key={shop._id}
          position={{
            lat: shop.latitude,
            lng: shop.longitude,
          }}
          onClick={() => {
            setShowAddPopup(false);
            setNewShopLocation(null);
            setSelectedShop(shop);
          }}
        />
      ))}

      {/* Temporary Marker */}
      {newShopLocation && <Marker position={newShopLocation} />}

      {/* Existing Shop Popup */}
      {selectedShop && (
        <InfoWindow
          position={{
            lat: selectedShop.latitude,
            lng: selectedShop.longitude,
          }}
          onCloseClick={() => setSelectedShop(null)}
        >
          <div className="w-36 p-1">
            <h3 className="text-sm font-semibold truncate">
              {selectedShop.name}
            </h3>

            <p className="text-xs text-yellow-600">
              ⭐ {selectedShop.rating}
            </p>

            <div className="flex gap-1 mt-2">
              <button
                onClick={getDirections}
                className="flex-1 text-xs bg-blue-600 text-white rounded px-2 py-1 hover:bg-blue-700"
              >
                Route
              </button>

              <button
                onClick={() => navigate(`/shop/${selectedShop._id}`)}
                className="flex-1 text-xs bg-amber-500 text-white rounded px-2 py-1 hover:bg-amber-600"
              >
                More
              </button>
            </div>
          </div>
        </InfoWindow>
      )}

      {/* Add Shop Popup */}
      {showAddPopup && newShopLocation && (
        <InfoWindow
          position={newShopLocation}
          onCloseClick={() => {
            setShowAddPopup(false);
            setNewShopLocation(null);
          }}
        >
          <div className="w-44">
            <h3 className="font-semibold mb-2">Add a shop here?</h3>

            <button
              className="w-full rounded bg-amber-600 px-3 py-2 text-white hover:bg-amber-700"
              onClick={() => {
                navigate("/add-shop", {
                  state: {
                    latitude: newShopLocation.lat,
                    longitude: newShopLocation.lng,
                  },
                });
              }}
            >
              + Add Shop
            </button>
          </div>
        </InfoWindow>
      )}

      {/* Directions */}
      {directions && (
        <DirectionsRenderer
          directions={directions}
          options={{
            suppressMarkers: false,
            polylineOptions: {
              strokeColor: "#2563eb",
              strokeWeight: 5,
            },
          }}
        />
      )}
    </GoogleMap>
  );

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <div className="relative h-56 w-80 overflow-hidden rounded-xl shadow-lg">
        {renderMap("100%")}

        <button
          onClick={() => setExpanded(true)}
          className="absolute bottom-3 right-10 rounded-lg bg-white px-2 py-1 shadow-md hover:bg-gray-100"
        >
          Expand Map
        </button>
      </div>

      {expanded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="relative h-[90vh] w-[90vw] overflow-hidden rounded-xl bg-white shadow-2xl">
            {renderMap("100%")}

            <button
              onClick={() => setExpanded(false)}
              className="absolute top-4 right-4 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </LoadScript>
  );
};

export default MiniMap;