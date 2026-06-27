import React from "react";
import { useNavigate } from "react-router-dom";

const ShopCard = ({ shop }) => {
  const navigate = useNavigate();

  return (
    <div className="w-72 bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition duration-300">
      <div className="h-40 bg-amber-100 flex items-center justify-center text-6xl">
        ☕
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-semibold">{shop.name}</h2>

          <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-sm font-medium">
            ⭐ {shop.averageRating} ({shop.totalRatings})
          </span>
        </div>

        <p className="text-sm text-gray-600 mb-3">
          {shop.address}
        </p>

        <button
          onClick={() => navigate(`/shop/${shop._id}`)}
          className="w-full bg-amber-600 text-white py-2 rounded hover:bg-amber-700 transition"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ShopCard;