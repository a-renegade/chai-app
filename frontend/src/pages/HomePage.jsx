import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import ShopCard from "../components/ShopCard";
import MiniMap from "../components/MiniMap";
import { useLocationStore } from "../store/useLocationStore";

export default function HomePage() {
  const { getCurrentLocation } = useLocationStore();

  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentLocation();

    const fetchShops = async () => {
      try {
        const res = await axiosInstance.get("/shop");
        setShops(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchShops();
  }, [getCurrentLocation]);

  return (
    <div className="relative min-h-[calc(100vh-64px)] bg-gray-100 p-6">
      <h2 className="mb-6 text-2xl font-semibold">Chai Shops</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-wrap gap-6">
          {shops.map((shop) => (
            <ShopCard key={shop._id} shop={shop} />
          ))}
        </div>
      )}

      <div className="fixed bottom-6 right-6 z-50 h-56 w-72 overflow-hidden rounded-xl bg-white shadow-xl">
        <MiniMap shops={shops} />
      </div>
    </div>
  );
}
