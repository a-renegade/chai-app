import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "../store/useAuthStore";
import ReviewList from "../components/ReviewList";
import ReviewForm from "../components/ReviewForm";

const formatRating = (rating) => {
  const numericRating = Number(rating);

  if (!Number.isFinite(numericRating) || numericRating <= 0) {
    return "No ratings yet";
  }

  return numericRating.toFixed(1);
};

export default function ShopPage() {
  const { shopId } = useParams();
  const { authUser } = useAuthStore();

  const [shop, setShop] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showReviewForm, setShowReviewForm] = useState(false);

  const fetchReviews = useCallback(async () => {
    try {
      const res = await axiosInstance.get(`/review/${shopId}`);
      setReviews(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.log(err);
    }
  }, [shopId]);

  const fetchShop = useCallback(async () => {
    const res = await axiosInstance.get(`/shop/${shopId}`);
    setShop(res.data);
  }, [shopId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        await Promise.all([fetchShop(), fetchReviews()]);
      } catch (err) {
        setError(
          err.response?.data?.message || "Unable to load this shop right now."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchShop, fetchReviews]);

  const userReview = useMemo(() => {
    return reviews.find((review) => review.email === authUser);
  }, [reviews, authUser]);

  const averageRating = useMemo(() => {
    return formatRating(shop?.averageRating);
  }, [shop]);

  if (loading) {
    return (
      <main className="min-h-[calc(100vh-64px)] bg-gray-100 p-6">
        <div className="mx-auto max-w-4xl rounded-lg bg-white p-8 shadow-sm">
          Loading...
        </div>
      </main>
    );
  }

  if (error || !shop) {
    return (
      <main className="min-h-[calc(100vh-64px)] bg-gray-100 p-6">
        <div className="mx-auto max-w-4xl rounded-lg bg-white p-8 shadow-sm">
          <p className="mb-4 text-red-500">{error || "Shop not found"}</p>

          <Link to="/" className="text-amber-700">
            Back
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-64px)] bg-gray-100 p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        <section className="rounded-lg bg-white p-6 shadow-sm">
          <Link to="/" className="mb-4 inline-block font-medium text-amber-700">
            Back
          </Link>

          <div className="flex items-start justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold">{shop.name}</h1>

              <p className="mt-2 text-gray-600">{shop.address}</p>
            </div>

            <div className="rounded-lg bg-yellow-100 px-4 py-3">
              <p className="text-sm">Average Rating</p>

              <p className="text-xl font-semibold">
                {averageRating} ({shop.totalRatings || 0})
              </p>
            </div>
          </div>

          {shop.description && (
            <p className="mt-6 text-gray-700">{shop.description}</p>
          )}
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Reviews</h2>

            {!showReviewForm && (
              <button
                onClick={() => setShowReviewForm(true)}
                className="rounded bg-amber-600 px-4 py-2 text-white hover:bg-amber-700"
              >
                {userReview ? "Edit Review" : "Add Review"}
              </button>
            )}
          </div>

          {showReviewForm && (
            <ReviewForm
              shopId={shopId}
              review={userReview}
              onClose={() => setShowReviewForm(false)}
              onSuccess={async () => {
                setShowReviewForm(false);
                await fetchShop();
                await fetchReviews();
              }}
            />
          )}

          <ReviewList reviews={reviews} />
        </section>
      </div>
    </main>
  );
}
