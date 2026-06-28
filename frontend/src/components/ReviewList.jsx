const formatRating = (rating) => {
  const numericRating = Number(rating);

  if (!Number.isFinite(numericRating) || numericRating <= 0) {
    return "No ratings";
  }

  return numericRating.toFixed(1);
};

const ReviewList = ({ reviews }) => {
  if (reviews.length === 0) {
    return (
      <p className="text-gray-600">
        No reviews yet. Be the first to review this shop!
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <article
          key={review._id}
          className="rounded-lg border border-gray-200 p-4"
        >
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-semibold">{review.name}</h3>

            <span className="rounded bg-amber-100 px-3 py-1 font-semibold text-amber-800">
              Rating {formatRating(review.rating)}
            </span>
          </div>

          <p className="mt-3 text-gray-700">{review.description}</p>
        </article>
      ))}
    </div>
  );
};

export default ReviewList;
