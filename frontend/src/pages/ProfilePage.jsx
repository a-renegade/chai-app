import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const { authUser } = useAuthStore();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRedeeming, setIsRedeeming] = useState(false);

  const fetchProfile = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.post("/auth/profile", {
        email: authUser,
      });

      setProfile(res.data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authUser) {
      fetchProfile();
    }
  }, [authUser]);

  const handleRedeem = async () => {
    try {
      setIsRedeeming(true);

      const res = await axiosInstance.post("/other/redeem", {
        email: authUser,
      });

      toast.success(res.data.message || "Coupon redeemed successfully!");

      // Refresh profile instead of reloading the page
      await fetchProfile();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to redeem coupon");
    } finally {
      setIsRedeeming(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <h1 className="text-xl font-semibold">Loading...</h1>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-amber-700 mb-6">
          My Profile
        </h1>

        <div className="space-y-6">
          <div>
            <p className="text-gray-500">Name</p>
            <p className="text-xl font-semibold">{profile.fullName}</p>
          </div>

          <div>
            <p className="text-gray-500">Email</p>
            <p className="text-xl font-semibold">{profile.email}</p>
          </div>

          <div>
            <p className="text-gray-500">Reward Points</p>
            <p className="text-2xl font-bold text-green-600">
              {profile.points}
            </p>

            <button
              onClick={handleRedeem}
              disabled={isRedeeming || profile.points < 50}
              className="mt-4 bg-amber-600 hover:bg-amber-700 text-white px-5 py-2 rounded-lg transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isRedeeming
                ? "Redeeming..."
                : "Redeem Coupon (50 Points)"}
            </button>

            {profile.points < 50 && (
              <p className="text-sm text-gray-500 mt-2">
                You need at least 50 points to redeem a coupon.
              </p>
            )}
          </div>

          <div>
            <p className="text-gray-500 mb-2">Coupons</p>

            {profile.coupons.length === 0 ? (
              <p className="text-gray-400">
                No coupons redeemed yet.
              </p>
            ) : (
              <div className="space-y-2">
                {profile.coupons.map((coupon, index) => (
                  <div
                    key={index}
                    className="bg-amber-100 border border-amber-300 rounded-lg px-4 py-2 font-mono text-lg"
                  >
                    {coupon}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;