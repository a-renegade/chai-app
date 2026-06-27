import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { axiosInstance } from "../lib/axios";

const getCoordinatesFromAddress = async (address) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    throw new Error("Google Maps API key is missing.");
  }

  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${apiKey}`
  );
  const data = await response.json();

  if (data.status !== "OK" || !data.results?.length) {
    throw new Error("Could not find latitude and longitude for this address.");
  }

  const { lat, lng } = data.results[0].geometry.location;
  return { latitude: lat, longitude: lng };
};

export default function AddShopPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const navigationLatitude = state?.latitude;
  const navigationLongitude = state?.longitude;
  const hasNavigationCoordinates =
    Number.isFinite(Number(navigationLatitude)) &&
    Number.isFinite(Number(navigationLongitude));

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    description: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      setError("");

      const coordinates = hasNavigationCoordinates
        ? {
            latitude: Number(navigationLatitude),
            longitude: Number(navigationLongitude),
          }
        : await getCoordinatesFromAddress(formData.address);

      const response = await axiosInstance.post("/shop", {
        ...formData,
        ...coordinates,
      });

      navigate(`/shop/${response.data._id}`);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to add this shop right now."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-64px)] bg-gray-100 p-6">
      <div className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-sm">
        <Link
          className="mb-5 inline-block text-sm font-medium text-amber-700 hover:text-amber-800"
          to="/"
        >
          Back to shops
        </Link>

        <h1 className="text-3xl font-bold text-gray-900">Add Shop</h1>
        <p className="mt-2 text-gray-600">
          {hasNavigationCoordinates
            ? "Using the map location selected on the previous page."
            : "Latitude and longitude will be found from the address."}
        </p>

        <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label
              className="mb-2 block text-sm font-medium text-gray-700"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-100"
              id="name"
              name="name"
              onChange={handleChange}
              required
              type="text"
              value={formData.name}
            />
          </div>

          <div>
            <label
              className="mb-2 block text-sm font-medium text-gray-700"
              htmlFor="address"
            >
              Address
            </label>
            <input
              className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-100"
              id="address"
              name="address"
              onChange={handleChange}
              required
              type="text"
              value={formData.address}
            />
          </div>

          <div>
            <label
              className="mb-2 block text-sm font-medium text-gray-700"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              className="min-h-32 w-full resize-y rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-100"
              id="description"
              name="description"
              onChange={handleChange}
              value={formData.description}
            />
          </div>

          {hasNavigationCoordinates && (
            <div className="rounded-md bg-amber-50 p-3 text-sm text-amber-800">
              Coordinates: {Number(navigationLatitude).toFixed(6)},{" "}
              {Number(navigationLongitude).toFixed(6)}
            </div>
          )}

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            className="rounded-md bg-amber-600 px-5 py-2 font-medium text-white transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:bg-amber-300"
            disabled={submitting}
            type="submit"
          >
            {submitting ? "Adding..." : "Add Shop"}
          </button>
        </form>
      </div>
    </main>
  );
}
