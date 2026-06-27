import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { axiosInstance } from "../lib/axios";

const formatRating = (rating) => {
  const numericRating = Number(rating);

  if (!Number.isFinite(numericRating) || numericRating <= 0) {
    return "No ratings yet";
  }

  return numericRating.toFixed(1);
};

export default function ShopPage() {
  const { shopId } = useParams();
  const [shop, setShop] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchShopData = async () => {
      try {
        setLoading(true);
        setError("");

        const [shopResponse, reviewsResponse] = await Promise.all([
          axiosInstance.get(`/shop/${shopId}`),
          axiosInstance.get(`/review/${shopId}`),
        ]);

        setShop(shopResponse.data);
        setReviews(Array.isArray(reviewsResponse.data) ? reviewsResponse.data : []);
      } catch (err) {
        setError(
          err?.response?.data?.message ||
            "Unable to load this shop right now."
        );
      } finally {
        setLoading(false);
      }
    };

    if (shopId) {
      fetchShopData();
    }
  }, [shopId]);

  const averageRating = useMemo(
    () => formatRating(shop?.averageRating ?? shop?.rating),
    [shop]
  );

  if (loading) {
    return (
      <main className="min-h-[calc(100vh-64px)] bg-gray-100 p-6">
        <div className="mx-auto max-w-4xl rounded-lg bg-white p-8 shadow-sm">
          <p className="text-gray-600">Loading shop...</p>
        </div>
      </main>
    );
  }

  if (error || !shop) {
    return (
      <main className="min-h-[calc(100vh-64px)] bg-gray-100 p-6">
        <div className="mx-auto max-w-4xl rounded-lg bg-white p-8 shadow-sm">
          <p className="mb-4 text-red-600">{error || "Shop not found."}</p>
          <Link className="font-medium text-amber-700 hover:text-amber-800" to="/">
            Back to shops
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-64px)] bg-gray-100 p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        <section className="rounded-lg bg-white p-6 shadow-sm">
          <Link className="mb-5 inline-block text-sm font-medium text-amber-700 hover:text-amber-800" to="/">
            Back to shops
          </Link>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{shop.name}</h1>
              <p className="mt-2 text-gray-600">{shop.address}</p>
            </div>

            <div className="rounded-md bg-yellow-100 px-4 py-3 text-yellow-800">
              <p className="text-sm font-medium">Average rating</p>
              <p className="text-xl font-semibold">
                {averageRating} ({shop.totalRatings ?? 0})
              </p>
            </div>
          </div>

          <p className="mt-6 leading-7 text-gray-700">
            {shop.description || "No description available."}
          </p>
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-900">Reviews</h2>

          {reviews.length === 0 ? (
            <p className="mt-4 text-gray-600">No reviews yet.</p>
          ) : (
            <div className="mt-5 space-y-4">
              {reviews.map((review) => (
                <article
                  className="rounded-lg border border-gray-200 p-4"
                  key={review._id}
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {review.name}
                      </h3>
                      <p className="text-sm text-gray-500">{review.email}</p>
                    </div>

                    <span className="w-fit rounded bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-800">
                      {formatRating(review.rating)}
                    </span>
                  </div>

                  <p className="mt-3 leading-6 text-gray-700">
                    {review.description || "No review text added."}
                  </p>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
