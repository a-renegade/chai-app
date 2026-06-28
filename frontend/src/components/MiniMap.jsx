import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  DirectionsRenderer,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useLocationStore } from "../store/useLocationStore";

const getShopPosition = (shop) => {
  const lat = Number(shop.latitude);
  const lng = Number(shop.longitude);

  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    return null;
  }

  return { lat, lng };
};

const formatRating = (rating) => {
  const numericRating = Number(rating);

  if (!Number.isFinite(numericRating) || numericRating <= 0) {
    return "No ratings";
  }

  return numericRating.toFixed(1);
};

const MiniMap = ({ shops = [] }) => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [selectedShop, setSelectedShop] = useState(null);
  const [directions, setDirections] = useState(null);
  const [newShopLocation, setNewShopLocation] = useState(null);
  const [showAddPopup, setShowAddPopup] = useState(false);

  const { location } = useLocationStore();
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey || "",
  });

  const validShops = useMemo(() => {
    return shops
      .map((shop) => ({ shop, position: getShopPosition(shop) }))
      .filter(({ position }) => Boolean(position));
  }, [shops]);

  const center = useMemo(() => {
    if (location) return location;
    if (validShops[0]?.position) return validShops[0].position;

    return {
      lat: 20.5937,
      lng: 78.9629,
    };
  }, [location, validShops]);

  const mapOptions = {
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
  };

  const getDirections = async () => {
    const destination = selectedShop ? getShopPosition(selectedShop) : null;

    if (!location || !destination || !window.google) return;

    const directionsService = new window.google.maps.DirectionsService();

    try {
      const result = await directionsService.route({
        origin: location,
        destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      });

      setDirections(result);
    } catch (err) {
      console.error(err);
    }
  };

  const renderMap = () => (
    <GoogleMap
      mapContainerStyle={{
        width: "100%",
        height: "100%",
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
      {location && window.google && (
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

      {validShops.map(({ shop, position }) => (
        <Marker
          key={shop._id}
          position={position}
          onClick={() => {
            setShowAddPopup(false);
            setNewShopLocation(null);
            setSelectedShop(shop);
          }}
        />
      ))}

      {newShopLocation && <Marker position={newShopLocation} />}

      {selectedShop && getShopPosition(selectedShop) && (
        <InfoWindow
          position={getShopPosition(selectedShop)}
          onCloseClick={() => setSelectedShop(null)}
        >
          <div className="w-36 p-1">
            <h3 className="truncate text-sm font-semibold">
              {selectedShop.name}
            </h3>

            <p className="text-xs text-yellow-600">
              Rating {formatRating(selectedShop.averageRating)}
            </p>

            <div className="mt-2 flex gap-1">
              <button
                onClick={getDirections}
                className="flex-1 rounded bg-blue-600 px-2 py-1 text-xs text-white hover:bg-blue-700"
              >
                Route
              </button>

              <button
                onClick={() => navigate(`/shop/${selectedShop._id}`)}
                className="flex-1 rounded bg-amber-500 px-2 py-1 text-xs text-white hover:bg-amber-600"
              >
                More
              </button>
            </div>
          </div>
        </InfoWindow>
      )}

      {showAddPopup && newShopLocation && (
        <InfoWindow
          position={newShopLocation}
          onCloseClick={() => {
            setShowAddPopup(false);
            setNewShopLocation(null);
          }}
        >
          <div className="w-44">
            <h3 className="mb-2 font-semibold">Add a shop here?</h3>

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
              Add Shop
            </button>
          </div>
        </InfoWindow>
      )}

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

  if (!apiKey) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-white p-4 text-center text-sm text-gray-600">
        Map unavailable: missing Google Maps API key.
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-white p-4 text-center text-sm text-red-600">
        Map failed to load.
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-white text-sm text-gray-600">
        Loading map...
      </div>
    );
  }

  return (
    <>
      <div className="relative h-full w-full overflow-hidden rounded-xl shadow-lg">
        {renderMap()}

        <button
          onClick={() => setExpanded(true)}
          className="absolute bottom-3 right-3 rounded-lg bg-white px-2 py-1 shadow-md hover:bg-gray-100"
        >
          Expand Map
        </button>
      </div>

      {expanded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="relative h-[90vh] w-[90vw] overflow-hidden rounded-xl bg-white shadow-2xl">
            {renderMap()}

            <button
              onClick={() => setExpanded(false)}
              className="absolute right-4 top-4 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MiniMap;
