import { useState } from "react";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";

const ReviewForm = ({ shopId, review, onClose, onSuccess }) => {
  const { authUser, fullName } = useAuthStore();

  const [description, setDescription] = useState(review?.description || "");
  const [rating, setRating] = useState(review?.rating || 5);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (review) {
        await axiosInstance.put("/review", {
          email: authUser,
          shop: shopId,
          description,
          rating: Number(rating),
        });

        toast.success("Review updated successfully!");
      } else {
        await axiosInstance.post("/review", {
          email: authUser,
          name: fullName || authUser,
          description,
          rating: Number(rating),
          shop: shopId,
        });

        toast.success("Review added successfully!");
      }

      await onSuccess();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-5">
      <h3 className="mb-4 text-xl font-semibold">
        {review ? "Edit Review" : "Add Review"}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-2 block font-medium">Rating</label>

          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full rounded-lg border p-3"
          >
            <option value={5}>5 stars</option>
            <option value={4}>4 stars</option>
            <option value={3}>3 stars</option>
            <option value={2}>2 stars</option>
            <option value={1}>1 star</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block font-medium">Review</label>

          <textarea
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full resize-none rounded-lg border p-3"
            placeholder="Write your experience..."
            required
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-amber-600 px-5 py-2 text-white hover:bg-amber-700 disabled:opacity-50"
          >
            {loading ? "Saving..." : review ? "Update Review" : "Add Review"}
          </button>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-lg bg-gray-300 px-5 py-2 hover:bg-gray-400 disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
