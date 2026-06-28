import { useNavigate } from "react-router-dom";

const formatRating = (rating) => {
  const numericRating = Number(rating);

  if (!Number.isFinite(numericRating) || numericRating <= 0) {
    return "No ratings";
  }

  return numericRating.toFixed(1);
};

const ShopCard = ({ shop }) => {
  const navigate = useNavigate();

  return (
    <div className="w-72 overflow-hidden rounded-lg bg-white shadow-md transition duration-300 hover:shadow-xl">
      <div className="flex h-40 items-center justify-center bg-amber-100 text-4xl font-bold text-amber-700">
        Tea
      </div>

      <div className="p-4">
        <div className="mb-2 flex items-start justify-between gap-3">
          <h2 className="text-lg font-semibold">{shop.name}</h2>

          <span className="rounded bg-yellow-100 px-2 py-1 text-sm font-medium text-yellow-700">
            {formatRating(shop.averageRating)} ({shop.totalRatings || 0})
          </span>
        </div>

        <p className="mb-3 text-sm text-gray-600">{shop.address}</p>

        <button
          onClick={() => navigate(`/shop/${shop._id}`)}
          className="w-full rounded bg-amber-600 py-2 text-white transition hover:bg-amber-700"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ShopCard;
